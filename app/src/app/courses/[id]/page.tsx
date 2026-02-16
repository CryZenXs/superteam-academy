'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMetaplex } from '@/lib/metaplex';
import { useToast } from '@/contexts/ToastContext';
import { usePlayer } from '@/contexts/PlayerContext';
import { CheckCircle2, PlayCircle, ShieldCheck, Trophy, Zap, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const COURSE_DATA = {
    'anchor-framework': {
        title: 'Anchor Framework Masterclass',
        description: 'Aprenda a construir programas Solana seguros e escaláveis usando o framework Anchor.',
        lessons: [
            { id: 1, title: 'Introdução ao Anchor', duration: '15:20', completed: true },
            { id: 2, title: 'Estrutura de Contas (Accounts)', duration: '25:45', completed: true },
            { id: 3, title: 'Instruções e Handlers', duration: '32:10', completed: false },
            { id: 4, title: 'Cross-Program Invocations (CPI)', duration: '40:00', completed: false },
        ],
        xp: 1200,
        tags: ['Development', 'Rust', 'Anchor'],
    }
};

export default function CourseDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const wallet = useWallet();
    const { mintCertificate } = useMetaplex(wallet);
    const { toast } = useToast();
    const { completeCourse } = usePlayer();

    const [isMinting, setIsMinting] = useState(false);
    const [minted, setMinted] = useState<{ signature: string, assetId: string } | null>(null);

    const course = COURSE_DATA[id as keyof typeof COURSE_DATA] || COURSE_DATA['anchor-framework'];

    const handleCompleteCourse = async () => {
        if (!wallet.connected) {
            toast('Por favor, conecte sua carteira primeiro!', 'error');
            return;
        }

        setIsMinting(true);
        toast('Iniciando o mint do seu certificado...', 'info');

        try {
            const result = await mintCertificate(course.title, 'Developer');
            setMinted(result);
            completeCourse(id as string, course.xp);
            toast('Sucesso! Seu certificado on-chain foi emitido.', 'success');
        } catch (e) {
            console.error(e);
            toast('Erro ao emitir certificado. Verifique seu saldo na Devnet.', 'error');
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <Link href="/courses" className="flex items-center text-white/40 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Voltar para Cursos
            </Link>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass rounded-[40px] p-8 md:p-12 relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-solana-purple/10 blur-[100px] -z-10" />

                        <div className="flex flex-wrap gap-2 mb-6">
                            {course.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-solana-cyan">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{course.title}</h1>
                        <p className="text-white/60 text-lg leading-relaxed mb-8">
                            {course.description}
                        </p>

                        <div className="flex items-center space-x-8">
                            <div className="flex items-center">
                                <Zap size={20} className="text-solana-green mr-2" />
                                <span className="font-bold">{course.xp} XP</span>
                            </div>
                            <div className="flex items-center text-white/40">
                                <Trophy size={20} className="mr-2" />
                                <span>On-chain Certificate</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <PlayCircle className="mr-3 text-solana-purple" />
                            Conteúdo do Curso
                        </h2>
                        {course.lessons.map((lesson, i) => (
                            <div key={lesson.id} className="glass p-5 rounded-3xl flex items-center justify-between group hover:bg-white/5 transition-all border border-white/5">
                                <div className="flex items-center space-x-4">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
                                        lesson.completed ? "bg-solana-green/20 text-solana-green" : "bg-white/5 text-white/20"
                                    )}>
                                        {lesson.completed ? <CheckCircle2 size={18} /> : i + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-medium group-hover:text-solana-purple transition-colors">{lesson.title}</h3>
                                        <span className="text-xs text-white/40">{lesson.duration}</span>
                                    </div>
                                </div>
                                <button className="text-white/20 hover:text-white transition-colors">
                                    <PlayCircle size={24} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="glass rounded-[32px] p-8 border border-white/5 bg-linear-to-br from-solana-purple/5 to-transparent">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-solana-purple/20 rounded-lg text-solana-purple">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="text-xl font-bold">Coding Challenge: Anchor Structs</h3>
                        </div>
                        <p className="text-sm text-white/60 mb-6 leading-relaxed">
                            Complete the instruction below to define a state struct in Anchor. Your code will be validated on-chain once you submit.
                        </p>
                        <div className="bg-solana-black/80 rounded-2xl p-6 font-mono text-sm border border-white/10 mb-6 group relative">
                            <div className="absolute top-4 right-4 text-[10px] text-white/20 uppercase font-bold">Rust / Anchor</div>
                            <div className="space-y-1">
                                <div className="text-solana-purple">#[account]</div>
                                <div><span className="text-solana-cyan">pub struct</span> <span className="text-solana-green">UserProfile</span> {'{'}</div>
                                <div className="pl-6 text-white/40">// Defina os campos aqui</div>
                                <div className="pl-6"><span className="text-solana-cyan">pub</span> xp: u64,</div>
                                <div className="pl-6"><span className="text-solana-cyan">pub</span> name: <span className="text-solana-cyan">String</span>,</div>
                                <div>{'}'}</div>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all border border-white/10">
                            Run Validation
                        </button>
                    </div>
                </div>

                {/* Action Sidebar */}
                <div className="space-y-8">
                    <div className="glass rounded-[40px] p-8 border border-white/10 sticky top-28">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-linear-to-br from-solana-purple to-solana-cyan rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-solana-purple/20">
                                <ShieldCheck size={40} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold">Certificação On-chain</h3>
                            <p className="text-sm text-white/40 mt-2">Conclua todos os módulos para emitir seu Metaplex Core NFT.</p>
                        </div>

                        {minted ? (
                            <div className="bg-solana-green/10 border border-solana-green/20 p-6 rounded-3xl text-center space-y-4 animate-in fade-in zoom-in">
                                <CheckCircle2 size={32} className="text-solana-green mx-auto" />
                                <div className="font-bold">Certificado Emitido!</div>
                                <p className="text-[10px] text-white/40 font-mono break-all">{minted.assetId}</p>
                                <a
                                    href={`https://explorer.solana.com/address/${minted.assetId}?cluster=devnet`}
                                    target="_blank"
                                    className="block w-full py-3 bg-solana-green/20 text-solana-green rounded-2xl text-xs font-bold hover:bg-solana-green/30 transition-all"
                                >
                                    Ver no Explorer
                                </a>
                            </div>
                        ) : (
                            <button
                                onClick={handleCompleteCourse}
                                disabled={isMinting}
                                className="w-full py-4 bg-solana-purple text-white rounded-2xl font-bold flex items-center justify-center space-x-3 hover:opacity-90 transition-all shadow-xl shadow-solana-purple/20 disabled:opacity-50"
                            >
                                {isMinting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Processando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trophy size={20} />
                                        <span>Concluir e Mintar Certificado</span>
                                    </>
                                )}
                            </button>
                        )}

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center text-xs text-white/40 space-x-2">
                                <CheckCircle2 size={12} className="text-solana-green" />
                                <span>Verificável publicamente</span>
                            </div>
                            <div className="flex items-center text-xs text-white/40 space-x-2">
                                <CheckCircle2 size={12} className="text-solana-green" />
                                <span>Metaplex Core Standard (Low gas)</span>
                            </div>
                            <div className="flex items-center text-xs text-white/40 space-x-2">
                                <CheckCircle2 size={12} className="text-solana-green" />
                                <span>Válido para Bounties da Superteam</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
