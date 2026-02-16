'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from './ToastContext';

interface PlayerState {
    xp: number;
    level: number;
    achievements: string[];
    completedCourses: string[];
}

interface PlayerContextType {
    player: PlayerState;
    addXp: (amount: number) => void;
    completeCourse: (courseId: string, xpReward: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const { connected } = useWallet();
    const { toast } = useToast();

    const [player, setPlayer] = useState<PlayerState>({
        xp: 0,
        level: 1,
        achievements: [],
        completedCourses: [],
    });

    // Calculate level based on XP (Level = floor(sqrt(XP / 100)) + 1)
    useEffect(() => {
        const newLevel = Math.floor(Math.sqrt(player.xp / 100)) + 1;
        if (newLevel > player.level) {
            setPlayer(prev => ({ ...prev, level: newLevel }));
            toast(`LEVEL UP! Você agora é nível ${newLevel}! 🚀`, 'success');
        }
    }, [player.xp, player.level, toast]);

    const addXp = (amount: number) => {
        setPlayer(prev => ({ ...prev, xp: prev.xp + amount }));
    };

    const completeCourse = (courseId: string, xpReward: number) => {
        if (player.completedCourses.includes(courseId)) return;

        setPlayer(prev => ({
            ...prev,
            xp: prev.xp + xpReward,
            completedCourses: [...prev.completedCourses, courseId],
        }));
        toast(`Parabéns! Você concluiu o curso e ganhou ${xpReward} XP!`, 'success');
    };

    return (
        <PlayerContext.Provider value={{ player, addXp, completeCourse }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) throw new Error('usePlayer must be used within PlayerProvider');
    return context;
};
