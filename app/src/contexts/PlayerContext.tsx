'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from './ToastContext';

import { learningService } from '@/lib/services/LearningProgressService';

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
    const { connected, publicKey } = useWallet();
    const { toast } = useToast();

    const [player, setPlayer] = useState<PlayerState>({
        xp: 0,
        level: 1,
        achievements: [],
        completedCourses: [],
    });

    // Load initial data from service
    useEffect(() => {
        const loadPlayerData = async () => {
            if (connected && publicKey) {
                const xp = await learningService.getXP(publicKey.toBase58());
                const streak = await learningService.getStreak(publicKey.toBase58());
                // Level formula from Bounty spec: floor(sqrt(xp/100))
                // Note: Bounty spec says Level = floor(sqrt(xp/100)). 
                // We'll use this exact formula.
                const level = Math.floor(Math.sqrt(xp / 100)) || 1;

                setPlayer(prev => ({
                    ...prev,
                    xp,
                    level
                }));
            }
        };
        loadPlayerData();
    }, [connected, publicKey]);

    // Calculate level based on XP from Bounty Spec Formula
    useEffect(() => {
        const formulaLevel = Math.floor(Math.sqrt(player.xp / 100)) || 1;
        if (formulaLevel > player.level) {
            setPlayer(prev => ({ ...prev, level: formulaLevel }));
            toast(`LEVEL UP! Você atingiu o Nível ${formulaLevel}! 🚀`, 'success');
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
