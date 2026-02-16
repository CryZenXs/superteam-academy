'use client';

import { useTranslation } from 'react-i18next';
import { Search, Filter } from 'lucide-react';
import { CourseCard } from '@/components/course/CourseCard';

const COURSES = [
    { title: 'Solana Fundamentals', level: 'Beginner', xp: 500, time: '3h', category: 'General' },
    { title: 'Anchor Framework', level: 'Intermediate', xp: 1200, time: '6h', category: 'Development' },
    { title: 'Solana Program Security', level: 'Advanced', xp: 2500, time: '8h', category: 'Security' },
    { title: 'DeFi on Solana', level: 'Intermediate', xp: 1500, time: '5h', category: 'Finance' },
    { title: 'NFT Minting Guide', level: 'Beginner', xp: 600, time: '2h', category: 'Assets' },
    { title: 'Advanced Rust for Solana', level: 'Advanced', xp: 3000, time: '10h', category: 'Development' },
] as const;

export default function CoursesPage() {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Learning Library</h1>
                    <p className="text-white/40">Choose your path and start earning on-chain credentials.</p>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="w-full pl-10 pr-4 py-2 glass rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-solana-purple transition-all"
                        />
                    </div>
                    <button className="p-2 glass rounded-xl hover:bg-white/10 transition-all">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {COURSES.map((course, i) => (
                    <CourseCard
                        key={i}
                        title={course.title}
                        level={course.level}
                        xp={course.xp}
                        time={course.time}
                        category={course.category}
                    />
                ))}
            </div>
        </div>
    );
}
