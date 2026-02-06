import React from 'react';
import { useNavigate } from 'react-router-dom';

const IconLock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
  </svg>
);

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-8 bg-background-light dark:bg-background-dark relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />

      <div className="z-10 text-center space-y-8 max-w-md animate-fade-in-up w-full flex flex-col items-center">
        <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-400 dark:from-violet-400 dark:to-purple-200">
            Carnaval sem Perrengue
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Seu guia definitivo para a folia.
            </p>
        </div>

        <div className="space-y-4 w-full">
            <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-400">
                <span>Blocos</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>Bares</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>Dicas</span>
            </div>
        </div>

        <button 
            onClick={() => navigate('/guide')}
            className="w-full py-4 bg-primary-light dark:bg-primary-dark text-white text-lg font-bold rounded-2xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
            Entrar no App
        </button>

        {/* Psychological Warning Block */}
        <div className="mt-4 px-5 py-4 rounded-xl bg-red-500/5 border border-red-500/10 backdrop-blur-sm max-w-[300px]">
           <div className="flex items-center gap-2 justify-center mb-2 text-red-500 dark:text-red-400">
              <IconLock className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Acesso Único</span>
           </div>
           <p className="text-[10px] text-center text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Este link é vinculado ao seu dispositivo. O compartilhamento é monitorado e resultará no <span className="text-red-500 dark:text-red-400 font-bold">banimento automático</span> do seu acesso.
           </p>
        </div>
      </div>

      <p className="absolute bottom-8 text-xs text-gray-400 opacity-30">
        v2.0 • Premium Edition • ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
      </p>
    </div>
  );
};

export default Home;