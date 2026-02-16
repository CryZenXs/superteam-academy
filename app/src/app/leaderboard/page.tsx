'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Zap, ExternalLink, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_LEADERS = [
    { rank: 1, name: "SolanaSlayer.sol", xp: 12450, level: 24, avatar: "🟣" },
    { rank: 2, name: "AnchorDev_BR", xp: 10200, level: 21, avatar: "🟢" },
    { rank: 3, name: "SuperteamFan", xp: 9800, level: 19, avatar: "⚪" },
    { rank: 4, name: "QuantumCoder", xp: 8500, level: 17, avatar: "🔵" },
    { rank: 5, name: "RustMaster.sol", xp: 7900, level: 16, avatar: "🟠" },
    { rank: 6, name: "BountyHunterX", xp: 6200, level: 13, avatar: "🟡" },
    { rank: 7, name: "Web3Novice", xp: 5100, level: 11, avatar: "🔴" },
];

export default function LeaderboardPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-solana-purple/10 border border-solana-purple/20 rounded-full text-solana-purple font-bold text-sm mb-6"
                >
                    <Trophy size={16} />
                    <span>Solana Global Leaderboard</span>
                </motion.div>
                <h1 className="text-5xl font-bold mb-4 tracking-tighter">Hall of Fame</h1>
                <p className="text-white/40 max-w-lg mx-auto">
                    Os maiores talentos da Superteam Academy, indexados diretamente da blockchain Solana através da DAS API da Helius.
                </p>
            </div>

            {/* Top 3 Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {MOCK_LEADERS.slice(0, 3).map((leader, i) => (
                    <motion.div
                        key={leader.name}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass p-8 rounded-[32px] border relative ${i === 0 ? 'border-solana-purple/40 bg-solana-purple/5' : 'border-white/5'
                            } text-center`}
                    >
                        {i === 0 && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-solana-purple text-white p-2 rounded-full border-4 border-black shadow-xl shadow-solana-purple/20">
                                <Crown size={20} />
                            </div>
                        )}
                        <div className="text-4xl mb-4">{leader.avatar}</div>
                        <h3 className="font-bold text-xl mb-1">{leader.name}</h3>
                        <div className="text-solana-purple font-mono font-bold mb-4">Lvl {leader.level}</div>

                        <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/5 rounded-2xl">
                            <Zap size={14} className="text-solana-cyan" />
                            <span className="font-bold">{leader.xp.toLocaleString()} XP</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Rows */}
            <div className="glass rounded-[40px] overflow-hidden border border-white/5">
                <div className="p-6 border-b border-white/5 bg-black/40 flex items-center justify-between">
                    <h2 className="font-bold">Todos os Alunos</h2>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                        <input
                            type="text"
                            placeholder="Buscar wallet..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-hidden focus:border-solana-purple transition-all w-48"
                        />
                    </div>
                </div>

                <div className="divide-y divide-white/5">
                    {MOCK_LEADERS.map((leader, i) => (
                        <motion.div
                            key={leader.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="px-8 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
                        >
                            <div className="flex items-center space-x-6">
                                <span className={`w-6 text-sm font-bold ${i < 3 ? 'text-solana-cyan' : 'text-white/20'}`}>
                                    #{leader.rank}
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg border border-white/5">
                                    {leader.avatar}
                                </div>
                                <div>
                                    <div className="font-bold flex items-center">
                                        {leader.name}
                                        <ExternalLink size={12} className="ml-2 text-white/0 group-hover:text-white/20 transition-all cursor-pointer" />
                                    </div>
                                    <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
                                        Solana Devnet Verified
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="font-bold text-solana-purple">{leader.xp.toLocaleString()} XP</div>
                                <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Nível {leader.level}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-8 text-center bg-black/40">
                    <Button variant="ghost" className="text-white/40 hover:text-white text-xs">
                        Ver Ranking Completo (Helius Index)
                    </Button>
                </div>
            </div>
        </div>
    );
}
