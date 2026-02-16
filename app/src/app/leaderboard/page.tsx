'use client';

import { Trophy, Medal, Zap, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const LEADERBOARD_DATA = [
    { rank: 1, name: 'solanadev.sol', xp: 12500, completed: 15, avatar: 'S' },
    { rank: 2, name: 'cryptoking.base', xp: 10200, completed: 12, avatar: 'C' },
    { rank: 3, name: 'rust_ninja', xp: 9800, completed: 11, avatar: 'R' },
    { rank: 4, name: 'vitor_brazil', xp: 8500, completed: 9, avatar: 'V' },
    { rank: 5, name: 'ana_web3', xp: 7200, completed: 8, avatar: 'A' },
    { rank: 6, name: 'lucas_sol', xp: 6800, completed: 7, avatar: 'L' },
    { rank: 7, name: 'super_agent', xp: 5500, completed: 6, avatar: 'S' },
];

export default function LeaderboardPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Leaderboard</h1>
                <p className="text-white/40">Competing with the best builders in the ecosystem.</p>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-16 items-end">
                {/* Silver */}
                <div className="relative">
                    <div className="glass p-6 rounded-t-[32px] text-center pb-12 border-b-0">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                            {LEADERBOARD_DATA[1].avatar}
                        </div>
                        <div className="font-bold text-sm truncate">{LEADERBOARD_DATA[1].name}</div>
                        <div className="text-solana-cyan font-bold text-xs mt-1">{LEADERBOARD_DATA[1].xp} XP</div>
                    </div>
                    <div className="bg-white/5 h-20 rounded-b-2xl flex items-center justify-center">
                        <Medal size={32} className="text-slate-400" />
                    </div>
                </div>

                {/* Gold */}
                <div className="relative scale-110 z-10">
                    <div className="glass p-8 rounded-t-[40px] text-center pb-16 border border-solana-purple/30 bg-solana-purple/5">
                        <div className="w-20 h-20 bg-linear-to-br from-solana-purple to-solana-cyan rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                            {LEADERBOARD_DATA[0].avatar}
                        </div>
                        <div className="font-bold text-lg truncate">{LEADERBOARD_DATA[0].name}</div>
                        <div className="text-solana-purple font-bold mt-1">{LEADERBOARD_DATA[0].xp} XP</div>
                    </div>
                    <div className="bg-solana-purple/20 h-28 rounded-b-[32px] flex items-center justify-center border border-solana-purple/20 border-t-0">
                        <Trophy size={48} className="text-yellow-500 animate-bounce" />
                    </div>
                </div>

                {/* Bronze */}
                <div className="relative">
                    <div className="glass p-6 rounded-t-[32px] text-center pb-12 border-b-0">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                            {LEADERBOARD_DATA[2].avatar}
                        </div>
                        <div className="font-bold text-sm truncate">{LEADERBOARD_DATA[2].name}</div>
                        <div className="text-solana-green font-bold text-xs mt-1">{LEADERBOARD_DATA[2].xp} XP</div>
                    </div>
                    <div className="bg-white/5 h-16 rounded-b-2xl flex items-center justify-center">
                        <Medal size={32} className="text-orange-700" />
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="glass rounded-[32px] overflow-hidden border border-white/5">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-bold">Top Builders</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input type="text" placeholder="Find builder..." className="pl-9 pr-4 py-2 bg-white/5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-solana-purple transition-all" />
                    </div>
                </div>

                <div className="divide-y divide-white/5">
                    {LEADERBOARD_DATA.slice(3).map((user) => (
                        <div key={user.rank} className="p-6 flex items-center justify-between hover:bg-white/2 transition-colors">
                            <div className="flex items-center space-x-4">
                                <span className="text-white/20 font-mono w-6 text-center">{user.rank}</span>
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold">
                                    {user.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{user.name}</div>
                                    <div className="text-[10px] text-white/40">{user.completed} courses completed</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Zap size={14} className="text-solana-green" />
                                <span className="font-bold">{user.xp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 text-center p-8 glass rounded-[32px] border border-dashed border-white/10">
                <p className="text-white/40 text-sm mb-4">You are currently ranked #45 among all builders.</p>
                <button className="text-solana-cyan font-bold text-sm hover:underline">How to climb the ranks?</button>
            </div>
        </div>
    );
}
