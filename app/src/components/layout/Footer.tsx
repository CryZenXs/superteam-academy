'use client';

import Link from 'next/link';
import { Github, Twitter, MessageSquare, ExternalLink } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-solana-black/50 border-t border-white/5 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-solana-purple to-solana-cyan" />
                            <span className="text-xl font-bold tracking-tighter uppercase">Superteam <span className="text-solana-green">Academy</span></span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            Empoderando a próxima geração de desenvolvedores Solana no Brasil e na América Latina através de aprendizado prático e orientado a recompensas.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="p-2 glass rounded-full hover:text-solana-purple transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="p-2 glass rounded-full hover:text-solana-purple transition-colors"><Github size={18} /></a>
                            <a href="#" className="p-2 glass rounded-full hover:text-solana-purple transition-colors"><MessageSquare size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Plataforma</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><Link href="/courses" className="hover:text-solana-cyan transition-colors">Cursos</Link></li>
                            <li><Link href="/leaderboard" className="hover:text-solana-cyan transition-colors">Ranking</Link></li>
                            <li><Link href="/dashboard" className="hover:text-solana-cyan transition-colors">Progresso</Link></li>
                            <li><Link href="/rewards" className="hover:text-solana-cyan transition-colors">Recompensas</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Comunidade</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><a href="https://superteam.fun" target="_blank" className="hover:text-solana-cyan flex items-center">Superteam Global <ExternalLink size={12} className="ml-1" /></a></li>
                            <li><a href="#" className="hover:text-solana-cyan">Discord Brasil</a></li>
                            <li><a href="#" className="hover:text-solana-cyan">Eventos</a></li>
                            <li><a href="#" className="hover:text-solana-cyan">Bounties</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Suporte</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><a href="#" className="hover:text-solana-cyan">Documentação</a></li>
                            <li><a href="#" className="hover:text-solana-cyan">FAQ</a></li>
                            <li><a href="#" className="hover:text-solana-cyan">Termos de Uso</a></li>
                            <li><a href="#" className="hover:text-solana-cyan">Privacidade</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20">
                    <p>© 2026 Superteam Academy. Built with 💜 for Solana Brazil.</p>
                    <div className="flex items-center space-x-6">
                        <span>Powered by Solana</span>
                        <span>Metaplex Core Credentials</span>
                        <span>Anchor Framework</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
