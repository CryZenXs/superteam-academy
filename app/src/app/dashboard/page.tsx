'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { usePlayer } from '@/contexts/PlayerContext';
import { Trophy, Zap, Clock, Star, ArrowRight, Shield, Award, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
    const { connected, publicKey } = useWallet();
    const { player } = usePlayer();

    if (!connected) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-32 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Shield size={64} className="mx-auto text-white/10 mb-6" />
                    <h1 className="text-4xl font-bold mb-6 text-white/40">Secure Your Learning Path.</h1>
                    <p className="text-white/20 mb-12 max-w-md mx-auto">Conecte sua carteira Solana para sincronizar seu progresso on-chain e visualizar suas certificações NFTs.</p>

                    <div className="flex justify-center">
                        <div className="p-1 rounded-2xl bg-linear-to-r from-solana-purple to-solana-cyan">
                            <button className="px-12 py-4 bg-solana-black rounded-[15px] font-bold hover:bg-transparent transition-all">
                                Conectar Carteira
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
            >
                <div className="flex items-center space-x-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-solana-purple to-solana-cyan rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-20 h-20 rounded-2xl bg-solana-black flex items-center justify-center text-white font-bold text-3xl border border-white/10">
                            {publicKey?.toString().slice(0, 1)}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, Learner</h1>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className="px-2 py-0.5 bg-solana-purple/20 text-solana-purple rounded-md text-[10px] font-bold uppercase tracking-wider">Level {player.level} Builder</span>
                            <p className="text-white/40 text-sm font-mono">{publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}</p>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-3">
                    <div className="glass px-4 py-2 rounded-2xl flex items-center space-x-2 border border-white/5">
                        <Flame size={16} className="text-orange-500" />
                        <span className="font-bold text-sm">7 Day Streak</span>
                    </div>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Total XP', value: player.xp.toLocaleString(), icon: Zap, color: 'text-solana-purple' },
                    { label: 'Credentials', value: player.completedCourses.length, icon: Trophy, color: 'text-solana-green' },
                    { label: 'Global Rank', value: '#42', icon: Star, color: 'text-solana-cyan' },
                    { label: 'Courses Done', value: player.completedCourses.length, icon: Award, color: 'text-white' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-3xl border border-white/5 group hover:bg-white/5 transition-all"
                    >
                        <stat.icon className={cn(stat.color, "mb-4")} size={24} />
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <div className="text-xs text-white/40 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <div className="glass rounded-[32px] p-8 border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">Continuar Aprendendo</h2>
                            <Link href="/courses" className="text-xs text-solana-cyan font-bold hover:underline">Ver todos</Link>
                        </div>

                        <div className="space-y-8">
                            {[
                                { id: 'anchor-framework', title: 'Anchor Framework Masterclass', progress: 65, lessons: '8/12', color: 'bg-solana-purple' },
                                { id: 'solana-security', title: 'Solana Program Security', progress: 20, lessons: '2/10', color: 'bg-solana-cyan' },
                            ].map((item, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:text-solana-purple transition-colors">
                                                <PlayCircle size={20} />
                                            </div>
                                            <span className="font-bold">{item.title}</span>
                                        </div>
                                        <span className="text-xs text-white/40">{item.lessons} aulas</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.progress}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className={cn("h-full rounded-full", item.color)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="glass rounded-[32px] p-8 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-solana-cyan/10 blur-[50px] -z-10" />
                        <h2 className="text-xl font-bold mb-6">Suas Credenciais</h2>
                        <div className="space-y-4">
                            {player.completedCourses.length > 0 ? (
                                player.completedCourses.map((courseId, i) => (
                                    <div key={i} className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-solana-purple/50 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-solana-purple/20 to-solana-cyan/20 flex items-center justify-center">
                                            <Award size={20} className="text-solana-purple" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold truncate">{courseId.replace(/-/g, ' ')}</div>
                                            <div className="text-[10px] text-solana-green font-bold">NFT MINTED</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <Award size={40} className="mx-auto text-white/5 mb-4" />
                                    <p className="text-sm text-white/20">Nenhuma credencial ainda.</p>
                                </div>
                            )}

                            <button className="w-full py-4 mt-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">
                                Sincronizar Metaplex Cloud
                            </button>
                        </div>
                    </div>

                    <div className="glass rounded-[32px] p-6 text-center border border-solana-purple/20">
                        <Zap size={24} className="mx-auto text-solana-purple mb-4" />
                        <h4 className="font-bold text-sm">Convide um Amigo</h4>
                        <p className="text-[10px] text-white/40 mt-2">Ganhe 500 XP por cada indicação que concluir um curso.</p>
                        <button className="mt-4 px-6 py-2 bg-solana-purple/20 text-solana-purple rounded-xl text-xs font-bold hover:bg-solana-purple/30 transition-all">
                            Copy Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Flame(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
    );
}
