'use client';

import React, { useState } from 'react';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { Button } from '@/components/ui/button';
import { Play, Zap, Info, Share2, Save } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import { motion } from 'framer-motion';

const DEFAULT_CODE = `use anchor_lang::prelude::*;

// Bem-vindo ao Superteam Academy Playground! 🚀
// Aqui você pode testar seus programas Anchor e Rust.

declare_id!("11111111111111111111111111111111");

#[program]
pub mod academy_playground {
    use super::*;

    pub fn test_instruction(ctx: Context<Test>) -> Result<()> {
        msg!("Executando no Playground!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Test {}
`;

export default function PlaygroundPage() {
    const { toast } = useToast();
    const [code, setCode] = useState(DEFAULT_CODE);
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = () => {
        setIsRunning(true);
        setTimeout(() => {
            setIsRunning(false);
            toast("Build concluído com sucesso na Sandbox!", "success");
        }, 2000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-[#050505]">
            {/* ToolBar */}
            <div className="flex items-center justify-between px-6 py-2 border-b border-white/5 bg-black/40">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-solana-cyan">
                        <Zap size={18} fill="currentColor" />
                        <span className="text-sm font-bold tracking-wider uppercase">Solana Sandbox</span>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <span className="text-xs text-white/40 font-mono">main.rs</span>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="h-8 border-white/5 text-white/60">
                        <Save size={14} className="mr-2" /> Salvar
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-white/5 text-white/60">
                        <Share2 size={14} className="mr-2" /> Compartilhar
                    </Button>
                    <Button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="h-8 bg-solana-cyan hover:bg-solana-cyan/80 text-black font-bold"
                    >
                        {isRunning ? "Compilando..." : <><Play size={14} className="mr-2 fill-current" /> Rodar</>}
                    </Button>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Mini */}
                <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 space-y-6 text-white/20 bg-black/20">
                    <Info size={20} className="cursor-pointer hover:text-white transition-colors" />
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                        <CodeEditor code={code} onChange={(v) => setCode(v || '')} language="rust" />
                    </div>

                    {/* Output console */}
                    <div className="h-40 bg-black/60 border-t border-white/5 p-4 font-mono text-xs">
                        <div className="text-white/20 mb-2 uppercase font-bold tracking-widest text-[10px]">Output Log</div>
                        <div className="text-white/60">
                            {isRunning && <p className="animate-pulse">Building target/deploy/playground.so...</p>}
                            {!isRunning && <p className="text-white/30 italic">Pronto. Digite seu código Anchor acima e clique em Rodar.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
