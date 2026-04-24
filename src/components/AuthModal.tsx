import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'startup' | 'investor';
}

export const AuthModal = ({ isOpen, onClose, type }: AuthModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md glass rounded-3xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-light text-white mb-1">
                    {type === 'startup' ? 'Portal Startup' : 'Portal Investidor'}
                  </h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Ecossistema Divinópolis</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 glass rounded-full hover:bg-white/10 transition-colors border-none shadow-none"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[2px] text-slate-600 mb-2 ml-1">Identificação</label>
                  <input
                    type="email"
                    placeholder="voce@exemplo.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[2px] text-slate-600 mb-2 ml-1">Chave de Acesso</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20">
                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    ENTRAR
                  </button>
                  <button className="w-full glass bg-white/5 text-slate-300 font-bold py-4 rounded-xl hover:bg-white/10 transition-all border-none flex items-center justify-center gap-2 shadow-none">
                    <UserPlus className="w-4 h-4" />
                    CRIAR CONTA
                  </button>
                </div>
              </form>
            </div>
            
            <div className="bg-white/5 p-4 text-center border-t border-white/5">
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                Acesso Seguro • 256-bit AES
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
