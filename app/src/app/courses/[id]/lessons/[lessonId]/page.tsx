'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Play, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';
import { useToast } from '@/contexts/ToastContext';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

const MOCK_LESSON = {
    title: "Fundamentos do Anchor",
    content: `
# Bem-vindo ao Rust na Solana! 🦀
Nesta lição, vamos aprender como declarar uma instrução básica usando o framework Anchor.

O Anchor utiliza macros para facilitar a vida do desenvolvedor. A macro \`#[program]\` é onde toda a mágica acontece.

### Seu desafio:
Complete o código ao lado para criar um programa chamado \`superteam_academy\` com uma função \`initialize\`.
  `,
    starterCode: `use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod superteam_academy {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Bem-vindo à Superteam Academy!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}`,
    xpReward: 50
};

export default function LessonPage() {
    const { id, lessonId } = useParams();
    const router = useRouter();
    const { addXp, player } = usePlayer();
    const { toast } = useToast();
    const [code, setCode] = useState(MOCK_LESSON.starterCode);
    const [isRunning, setIsRunning] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRunCode = () => {
        setIsRunning(true);
        // Simulating a code check
        setTimeout(() => {
            setIsRunning(false);
            setIsSuccess(true);
            toast("Código compilado com sucesso! Ganhou 50 XP.", "success");
            addXp(MOCK_LESSON.xpReward);

            trackEvent('lesson_completed', {
                course_id: id,
                lesson_id: lessonId,
                xp_gained: MOCK_LESSON.xpReward
            });
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-black">
            {/* Header da Lição */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/50">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white/60 hover:text-white">
                        <ChevronLeft size={18} className="mr-2" /> Voltar
                    </Button>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <h1 className="text-sm font-semibold text-white/90">{MOCK_LESSON.title}</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center px-3 py-1.5 bg-solana-purple/20 rounded-full border border-solana-purple/30">
                        <Zap size={14} className="text-solana-purple mr-2" />
                        <span className="text-xs font-bold text-solana-purple">{player.xp} XP</span>
                    </div>
                    <Button size="sm" className="bg-solana-purple hover:bg-solana-purple/80 text-white font-bold px-6 shadow-lg shadow-solana-purple/20">
                        Próxima <ChevronRight size={18} className="ml-2" />
                    </Button>
                </div>
            </div>

            {/* Main Content: Split Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Content */}
                <div className="w-1/2 p-8 overflow-y-auto border-right border-white/10 bg-[#0a0a0a]">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="prose prose-invert max-w-none"
                    >
                        <div dangerouslySetInnerHTML={{ __html: MOCK_LESSON.content.replace(/\n/g, '<br/>') }} />

                        <div className="mt-12 p-6 bg-solana-cyan/5 border border-solana-cyan/20 rounded-xl">
                            <h3 className="text-solana-cyan font-bold flex items-center mb-4">
                                <CheckCircle2 size={18} className="mr-2" /> Objetivos:
                            </h3>
                            <ul className="text-sm text-white/70 space-y-2">
                                <li>• Declare a macro #[program]</li>
                                <li>• Crie o módulo superteam_academy</li>
                                <li>• Implemente a instrução initialize</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Code Editor */}
                <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
                    <div className="flex-1 p-4">
                        <CodeEditor
                            code={code}
                            onChange={(val) => setCode(val || '')}
                            language="rust"
                        />
                    </div>

                    {/* Editor Footer / Console */}
                    <div className="h-48 border-t border-white/10 bg-black/40 p-4 font-mono text-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs uppercase font-bold text-white/40 tracking-wider">Console de Saída</span>
                            <Button
                                onClick={handleRunCode}
                                disabled={isRunning}
                                className="bg-solana-cyan hover:bg-solana-cyan/80 text-black font-bold h-8 px-4"
                            >
                                {isRunning ? (
                                    "Compilando..."
                                ) : (
                                    <> <Play size={14} className="mr-2 fill-current" /> Rodar Código </>
                                )}
                            </Button>
                        </div>
                        <div className="text-white/60">
                            {isRunning && <p className="animate-pulse">Building target/deploy/superteam_academy.so...</p>}
                            {isSuccess && (
                                <div className="text-solana-cyan">
                                    <p>✔ Build Successful!</p>
                                    <p className="mt-2 text-white/80">Running tests...</p>
                                    <p>✔ test_initialize passed. (0.45s)</p>
                                </div>
                            )}
                            {!isRunning && !isSuccess && <p className="text-white/30 italic">Pressione "Rodar Código" para testar sua solução no Devnet simulado...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
