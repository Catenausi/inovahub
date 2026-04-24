import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Map as MapIcon, 
  Users, 
  TrendingUp, 
  Globe, 
  ChevronRight,
  Info,
  Maximize2
} from 'lucide-react';
import { DiviMap } from './components/DiviMap.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { STARTUPS, Startup } from './lib/data.ts';
import { cn } from './lib/utils.ts';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<'startup' | 'investor'>('startup');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedStartup = STARTUPS.find(s => s.id === selectedId);

  const filteredStartups = STARTUPS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAuth = (type: 'startup' | 'investor') => {
    setAuthType(type);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#e2e8f0] font-sans selection:bg-blue-500/30">
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        type={authType} 
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-t-0 border-x-0 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
            D
          </div>
          <span className="logo-text text-xl">DiviConnect</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-blue-400 transition-colors">Explorar</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Estatísticas</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Eventos</a>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleOpenAuth('startup')}
            className="hidden sm:block px-4 py-2 text-xs font-bold glass rounded-full hover:bg-white/10 transition-all border-none"
          >
            SOU STARTUP
          </button>
          <button 
            onClick={() => handleOpenAuth('investor')}
            className="px-5 py-2 text-xs font-bold bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40"
          >
            LOGIN INVESTIDOR
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20 h-screen flex flex-col md:flex-row relative">
                {/* Left Sidebar: List & Search */}
        <aside className="w-full md:w-80 glass border-y-0 border-l-0 flex flex-col z-[1002] overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar startups..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-2 space-y-1">
              {filteredStartups.map(startup => (
                <button
                  key={startup.id}
                  onClick={() => setSelectedId(startup.id === selectedId ? null : startup.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl transition-all group relative",
                    selectedId === startup.id ? "bg-white/10 border border-white/10" : "hover:bg-white/5 border border-transparent"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm mb-1 text-slate-200">{startup.name}</h3>
                      <span className={cn(
                        "text-[9px] uppercase font-black px-2 py-0.5 rounded tracking-tighter",
                        startup.category === 'Fintech' && "bg-emerald-500/20 text-emerald-400",
                        startup.category === 'Agtech' && "bg-yellow-500/20 text-yellow-400",
                        startup.category === 'Edtech' && "bg-blue-500/20 text-blue-400",
                        startup.category === 'Healthtech' && "bg-red-500/20 text-red-400",
                        startup.category === 'Retail' && "bg-purple-500/20 text-purple-400",
                        startup.category === 'Deeptech' && "bg-orange-500/20 text-orange-400"
                      )}>
                        {startup.category}
                      </span>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform",
                      selectedId === startup.id && "rotate-90 text-blue-400"
                    )} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-black/20 border-t border-white/5 text-[10px] text-slate-600 flex items-center justify-between font-bold uppercase tracking-widest">
            <span>Divinópolis Tech</span>
            <span>API v2.4.0</span>
          </div>
        </aside>

        {/* Center: Real Map */}
        <section className="flex-1 relative order-first md:order-none h-[50vh] md:h-full overflow-hidden bg-[#050508]">
          <DiviMap 
            selectedId={selectedId} 
            onSelect={setSelectedId} 
          />
          
          <div className="absolute bottom-8 left-8 z-[1001] pointer-events-none">
            <div className="glass px-6 py-4 rounded-2xl flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">{STARTUPS.length} Ativas</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-slate-500" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">12 Investidores</span>
              </div>
            </div>
          </div>

          <div className="absolute top-8 right-8 z-[1001] flex flex-col gap-2">
            <button className="p-3 glass rounded-xl hover:bg-white/10 transition-all border-none">
              <Maximize2 className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-3 glass rounded-xl hover:bg-white/10 transition-all border-none">
              <Info className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </section>

        {/* Startup Detail Panel */}
        <AnimatePresence>
          {selectedStartup && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-24 right-8 bottom-8 w-96 glass rounded-3xl z-[1003] flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <div className="h-32 bg-gradient-to-br from-blue-600/20 to-transparent relative p-8 flex items-end">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 glass rounded-full hover:bg-white/10 transition-all border-none"
                >
                  <X className="w-4 h-4 text-slate-400 font-bold" />
                </button>
                <div>
                   <h2 className="text-3xl font-light tracking-tight mb-1 text-white">{selectedStartup.name}</h2>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{selectedStartup.category}</span>
                   </div>
                </div>
              </div>

              <div className="flex-1 p-8 space-y-8 overflow-y-auto custom-scrollbar">
                <div>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {selectedStartup.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Indicadores de Ecossistema</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-2xl font-light text-white mb-1">{selectedStartup.connections.length}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter font-bold">Parcerias</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-2xl font-light text-emerald-400 mb-1">R$ 2.4M</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter font-bold">Valuation</div>
                    </div>
                  </div>
                </div>

                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Empresas Conectadas</h4>
                   <div className="flex flex-wrap gap-2">
                     {selectedStartup.connections.map(connId => {
                       const conn = STARTUPS.find(s => s.id === connId);
                       return conn ? (
                         <button 
                           key={connId}
                           onClick={() => setSelectedId(connId)}
                           className="px-3 py-1.5 glass bg-white/5 hover:bg-white/10 rounded-full text-[10px] font-bold transition-all border-white/5"
                         >
                           {conn.name}
                         </button>
                       ) : null;
                     })}
                   </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border-t border-white/5 flex gap-3">
                <a 
                  href={selectedStartup.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 glass bg-white/5 hover:bg-white/10 text-white text-center py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border-none"
                >
                  <Globe className="w-4 h-4" />
                  SITE
                </a>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-xs hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40">
                  CONECTAR
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="fixed bottom-0 w-full p-4 flex justify-center z-50 pointer-events-none">
        <div className="glass px-6 py-2 rounded-full pointer-events-auto flex items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold border-b-0 border-x-0 shadow-none">
          <span>Seguro SSL</span>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <span>Servidores em Divinópolis</span>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <span>Dados Criptografados</span>
        </div>
      </footer>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}

