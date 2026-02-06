import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import { Card } from '../components/ui/Card';
import { BLOCOS_DATA, BARS_DATA, INITIAL_CHECKLIST } from '../constants';
import { Tab, ChecklistItem, SearchResult } from '../types';
import { searchCarnivalInfo } from '../services/geminiService';
import { ChatModal } from '../components/ChatModal';
import { SOSModal } from '../components/SOSModal';

// --- Icons ---
const IconMap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const IconMoon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

const IconSun = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const IconSearch = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

const IconSparkles = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5Z" clipRule="evenodd" />
    </svg>
);

const IconSOS = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
);


// Navigation Icons
const IconMusic = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163z" />
  </svg>
);

const IconBeer = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
  </svg>
);

const IconBulb = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-1.5m0 0a6.01 6.01 0 0 1-5.63-8.832 6.002 6.002 0 0 1 11.26 0A6.01 6.01 0 0 1 12 16.5m0 0v-1.5m-3 0h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25h6" />
    </svg>
);

const IconList = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
    </svg>
);

// Helper to render bold text from **text** markdown
const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={index} className="text-violet-600 dark:text-violet-400 font-bold bg-violet-50 dark:bg-violet-900/20 px-1 rounded mx-0.5">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
};

const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.BLOCOS);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Modal States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  // Load checklist from local storage
  useEffect(() => {
    const saved = localStorage.getItem('carnaguide-checklist');
    if (saved) {
      setChecklist(JSON.parse(saved));
    } else {
      setChecklist(INITIAL_CHECKLIST);
    }
  }, []);

  const toggleChecklistItem = (id: string) => {
    const updated = checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setChecklist(updated);
    localStorage.setItem('carnaguide-checklist', JSON.stringify(updated));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Do not clear searchResult immediately to prevent flickering if replacing content
    // setSearchResult(null); 
    
    const result = await searchCarnivalInfo(searchQuery);
    setSearchResult(result);
    setIsSearching(false);
  };

  const openMap = (name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  const navItems = [
    { id: Tab.BLOCOS, icon: IconMusic, label: 'Blocos' },
    { id: Tab.BARES, icon: IconBeer, label: 'Bares' },
    { id: Tab.DICAS, icon: IconBulb, label: 'Dicas' },
    { id: Tab.CHECKLIST, icon: IconList, label: 'Checklist' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case Tab.BLOCOS:
        return (
          <div className="space-y-4 pb-24 animate-fade-in">
             <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold tracking-tight">Blocos</h2>
                 <span className="text-xs font-medium px-2 py-1 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 rounded-full">Hoje</span>
             </div>
            
            {/* Search Integration */}
            <Card className="mb-6 !p-4 border-violet-500/30 ring-1 ring-violet-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold mb-2 text-violet-600 dark:text-violet-400">Não achou seu bloco?</h3>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Ex: Blocos em Copacabana amanhã"
                    className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-700 text-sm py-2 focus:outline-none focus:border-violet-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                    type="submit" 
                    disabled={isSearching}
                    className="p-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg disabled:opacity-50"
                >
                    {isSearching ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <IconSearch className="w-5 h-5" />}
                </button>
              </form>
              {searchResult && (
                  <div 
                    key={searchResult.text} // Forces re-render for animation when result changes
                    className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 animate-pop-in"
                  >
                      <div className="bg-gradient-to-r from-violet-50/50 to-transparent dark:from-violet-900/10 p-3 rounded-lg border-l-2 border-violet-500 mb-2">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {renderBoldText(searchResult.text)}
                        </p>
                      </div>
                      
                      {searchResult.sources && searchResult.sources.length > 0 && (
                          <div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-2">
                              <span>Fontes:</span>
                              {searchResult.sources.map((s, i) => (
                                  <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="underline hover:text-violet-500 truncate max-w-[150px]">
                                      {s.title}
                                  </a>
                              ))}
                          </div>
                      )}
                  </div>
              )}
            </Card>

            {BLOCOS_DATA.map(bloco => (
              <Card key={bloco.id} className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${bloco.crowdLevel === 'high' ? 'bg-red-500' : bloco.crowdLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                    <span className="text-xs uppercase tracking-wider opacity-60 font-semibold">{bloco.region}</span>
                  </div>
                  <h3 className="text-lg font-bold">{bloco.name}</h3>
                  <p className="text-sm opacity-70">{bloco.time} • {bloco.type}</p>
                </div>
                <button className="p-2 text-primary-light dark:text-primary-dark opacity-50 hover:opacity-100">
                    <IconMap className="w-6 h-6" />
                </button>
              </Card>
            ))}
          </div>
        );
      case Tab.BARES:
        return (
          <div className="space-y-4 pb-24 animate-fade-in">
             <h2 className="text-2xl font-bold tracking-tight mb-6">Pontos de Apoio</h2>
            {BARS_DATA.map(bar => (
              <Card key={bar.id}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`
                    text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide
                    ${bar.category === 'Esquenta' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 
                      bar.category === 'After' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}
                  `}>
                    {bar.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">{bar.name}</h3>
                <p className="text-sm opacity-60 mb-4">{bar.address}</p>
                <button 
                  onClick={() => openMap(bar.name + " " + bar.address)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <IconMap className="w-4 h-4" />
                  Abrir no Maps
                </button>
              </Card>
            ))}
          </div>
        );
      case Tab.DICAS:
         return (
            <div className="space-y-4 pb-24 animate-fade-in">
               <h2 className="text-2xl font-bold tracking-tight mb-6">Guia de Sobrevivência</h2>
               
               <Card className="bg-gradient-to-br from-violet-500 to-purple-700 text-white border-none">
                  <h3 className="text-lg font-bold mb-2">Dica do Dia</h3>
                  <p className="text-sm opacity-90">Mantenha a hidratação! Intercale água entre as bebidas alcoólicas para garantir energia até o fim do bloco.</p>
               </Card>

               <h3 className="text-sm uppercase tracking-wider font-semibold opacity-50 mt-6 mb-2">Segurança</h3>
               <Card>
                  <ul className="space-y-3 text-sm">
                      <li className="flex gap-3">
                          <span className="text-red-500 font-bold">•</span>
                          Leve doleira interna para celular e cartões.
                      </li>
                      <li className="flex gap-3">
                          <span className="text-red-500 font-bold">•</span>
                          Evite andar sozinho em ruas desertas.
                      </li>
                      <li className="flex gap-3">
                          <span className="text-red-500 font-bold">•</span>
                          Compartilhe sua localização com amigos.
                      </li>
                  </ul>
               </Card>

                <h3 className="text-sm uppercase tracking-wider font-semibold opacity-50 mt-6 mb-2">Transporte</h3>
                <Card>
                    <p className="text-sm mb-2">O metrô é a melhor opção. Uber e Táxi podem ter tarifas dinâmicas altíssimas.</p>
                </Card>
            </div>
         );
      case Tab.CHECKLIST:
        return (
          <div className="space-y-4 pb-24 animate-fade-in">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Checklist</h2>
                <span className="text-sm opacity-50">
                    {checklist.filter(i => i.checked).length}/{checklist.length}
                </span>
             </div>
             
             {checklist.map(item => (
                 <div 
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className="flex items-center gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 cursor-pointer active:scale-[0.99] transition-transform"
                 >
                     <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                        ${item.checked 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 dark:border-gray-600'}
                     `}>
                         {item.checked && <IconCheck className="w-4 h-4" />}
                     </div>
                     <span className={`text-base ${item.checked ? 'opacity-40 line-through decoration-1' : ''}`}>
                         {item.text}
                     </span>
                 </div>
             ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md z-30 border-b border-gray-200/50 dark:border-gray-800/50 flex justify-between items-center transition-all duration-300">
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-500">
          Carnaval sem Perrengue
        </h1>
        <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 active:scale-90 transition-transform hover:bg-gray-200 dark:hover:bg-gray-700"
        >
            {theme === 'dark' ? <IconSun className="w-5 h-5" /> : <IconMoon className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 px-6 py-6 overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {/* Components Modals */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />

      {/* FABs Container */}
      
      {/* FAB Chat (Right) */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed right-4 bottom-24 z-40 p-4 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 active:scale-95 transition-all duration-300 group"
      >
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-20 group-hover:opacity-40" />
        <IconSparkles className="w-6 h-6" />
      </button>

      {/* FAB SOS (Left) */}
      <button 
        onClick={() => setIsSOSOpen(true)}
        className="fixed left-4 bottom-24 z-40 p-4 rounded-full bg-gradient-to-tr from-rose-500 to-orange-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <IconSOS className="w-6 h-6" />
      </button>

      {/* Bottom Nav Premium */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#1E1E22]/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 pb-safe z-50 transition-all duration-300 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
        <div className="flex justify-around items-center h-[72px] px-2 max-w-md mx-auto">
            {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as Tab)}
                        className="group flex-1 flex flex-col items-center justify-center h-full relative cursor-pointer"
                    >
                        {/* Active Pill Indicator */}
                        <div className={`
                            absolute top-2 w-14 h-8 rounded-full transition-all duration-300 ease-out
                            ${isActive ? 'bg-violet-100 dark:bg-violet-900/30 opacity-100 scale-100' : 'opacity-0 scale-50'}
                        `} />

                        {/* Icon */}
                        <Icon className={`
                            w-6 h-6 z-10 transition-all duration-300 mb-1
                            ${isActive 
                                ? 'text-violet-600 dark:text-violet-300 -translate-y-[1px]' 
                                : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'}
                        `} />

                        {/* Label */}
                        <span className={`
                            text-[10px] font-bold z-10 transition-all duration-300
                            ${isActive 
                                ? 'text-violet-600 dark:text-violet-300 translate-y-0 opacity-100' 
                                : 'text-gray-400 dark:text-gray-500 translate-y-1'}
                        `}>
                            {item.label}
                        </span>
                    </button>
                )
            })}
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;