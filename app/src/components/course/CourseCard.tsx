'use client';

import { ArrowRight, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CourseCardProps {
    title: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    xp: number;
    time: string;
    image?: string;
    category: string;
}

export const CourseCard = ({ title, level, xp, time, category }: CourseCardProps) => {
    const levelColor = {
        Beginner: 'text-solana-green bg-solana-green/10',
        Intermediate: 'text-solana-cyan bg-solana-cyan/10',
        Advanced: 'text-solana-purple bg-solana-purple/10',
    };

    return (
        <Link
            href={`/courses/${title.toLowerCase().replace(/ /g, '-')}`}
            className="glass group p-4 rounded-3xl hover:bg-white/5 transition-all border border-white/5 block"
        >
            <div className="h-40 rounded-2xl bg-linear-to-br from-solana-dark to-solana-black mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform">
                    <Star size={64} className="text-solana-purple" />
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 glass rounded-lg text-[10px] font-bold uppercase tracking-wider text-white/60">
                    {category}
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold uppercase", levelColor[level])}>
                        {level}
                    </span>
                    <span className="text-solana-green font-bold text-sm leading-none">{xp} XP</span>
                </div>

                <h3 className="font-bold text-lg leading-tight group-hover:text-solana-purple transition-colors">{title}</h3>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-white/40 text-xs">
                        <Clock size={14} className="mr-1" />
                        <span>{time}</span>
                    </div>
                    <button className="p-2 bg-solana-purple/20 text-solana-purple rounded-xl group-hover:bg-solana-purple group-hover:text-white transition-all">
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
};
