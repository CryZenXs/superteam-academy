'use client';

import { useTranslation } from 'react-i18next';
import { ArrowRight, Code2, Globe, GraduationCap, Library, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden">
      {/* Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-solana-purple/20 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-solana-green/10 blur-[100px] rounded-full"
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-solana-cyan mb-8"
        >
          <Zap size={14} />
          <span>Superteam Brazil + LATAM Hub</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          {t('hero.title')} <br />
          <span className="gradient-text">Deploy Your Future.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/courses"
            className="px-8 py-4 bg-solana-purple rounded-2xl font-bold flex items-center space-x-2 hover:opacity-90 transition-all shadow-lg shadow-solana-purple/20"
          >
            <span>{t('hero.cta')}</span>
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-all"
          >
            {t('common.connect_wallet')}
          </Link>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24"
        >
          {[
            { label: 'Active Learners', value: '1,200+', icon: GraduationCap },
            { label: 'Courses', value: '12+', icon: Library },
            { label: 'XP Awarded', value: '450k+', icon: Zap },
            { label: 'Regions', value: 'LATAM', icon: Globe },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass p-6 rounded-2xl text-left border border-white/5"
            >
              <stat.icon className="text-solana-cyan mb-4" size={24} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Courses Section */}
      <section className="bg-white/2 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Learning Paths</h2>
              <p className="text-white/40">Earn on-chain credentials as you progress.</p>
            </div>
            <Link href="/courses" className="text-solana-cyan hover:underline font-medium text-sm flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Solana Fundamentals', level: 'Beginner', xp: 500, time: '3h', color: 'from-blue-500/20 to-solana-cyan/20' },
              { title: 'Anchor Framework', level: 'Intermediate', xp: 1200, time: '6h', color: 'from-solana-purple/20 to-pink-500/20' },
              { title: 'Smart Contract Security', level: 'Advanced', xp: 2500, time: '8h', color: 'from-yellow-500/20 to-solana-green/20' },
            ].map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative glass p-1 rounded-[24px] hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${course.color} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative bg-solana-black/80 rounded-[23px] p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/60">{course.level}</span>
                    <span className="text-solana-green text-xs font-bold leading-none">{course.xp} XP</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                  <div className="mt-auto flex items-center justify-between text-xs text-white/40">
                    <span>{course.time} to complete</span>
                    <button className="text-solana-purple font-bold flex items-center">
                      Join <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
