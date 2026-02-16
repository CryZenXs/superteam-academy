'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { usePlayer } from '@/contexts/PlayerContext';
import dynamic from 'next/dynamic';
import { Languages, LayoutDashboard, Library, Trophy, Zap } from 'lucide-react';
import { useState } from 'react';

// Optimized dynamic import for Wallet button
const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { player } = usePlayer();
    const [langMenu, setLangMenu] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLangMenu(false);
    };

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-solana-purple to-solana-cyan" />
                    <span className="text-xl font-bold tracking-tighter uppercase">SUPERTEAM <span className="text-solana-green">ACADEMY</span></span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <Link href="/dashboard" className="flex items-center space-x-1 hover:text-solana-purple transition-colors">
                        <LayoutDashboard size={18} />
                        <span>{t('nav.dashboard')}</span>
                    </Link>
                    <Link href="/courses" className="flex items-center space-x-1 hover:text-solana-purple transition-colors">
                        <Library size={18} />
                        <span>{t('nav.courses')}</span>
                    </Link>
                    <Link href="/leaderboard" className="flex items-center space-x-1 hover:text-solana-purple transition-colors">
                        <Trophy size={18} />
                        <span>{t('nav.leaderboard')}</span>
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button
                            onClick={() => setLangMenu(!langMenu)}
                            className="p-2 hover:bg-white/5 rounded-full transition-colors"
                        >
                            <Languages size={20} />
                        </button>
                        {langMenu && (
                            <div className="absolute right-0 mt-2 w-32 glass rounded-xl overflow-hidden">
                                <button onClick={() => changeLanguage('pt')} className="w-full px-4 py-2 text-left hover:bg-white/10 text-sm">Português</button>
                                <button onClick={() => changeLanguage('en')} className="w-full px-4 py-2 text-left hover:bg-white/10 text-sm">English</button>
                                <button onClick={() => changeLanguage('es')} className="w-full px-4 py-2 text-left hover:bg-white/10 text-sm">Español</button>
                            </div>
                        )}
                    </div>

                    {player.xp > 0 && (
                        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-solana-purple/10 border border-solana-purple/20 rounded-xl">
                            <Zap size={14} className="text-solana-purple shadow-sm" />
                            <span className="text-xs font-bold text-solana-purple uppercase">Lvl {player.level}</span>
                            <div className="w-[1px] h-3 bg-solana-purple/20" />
                            <span className="text-[10px] font-medium text-white/60">{player.xp} XP</span>
                        </div>
                    )}

                    <WalletMultiButtonDynamic />
                </div>
            </div>
        </nav>
    );
};
