import React from 'react';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Icons
const IconToilet = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const IconAtm = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const IconCar = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const IconX = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const openMapSearch = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
    onClose();
  };

  const actions = [
    { 
      label: 'Banheiros', 
      query: 'banheiros químicos públicos', 
      icon: IconToilet, 
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
    },
    { 
      label: 'Caixa 24h', 
      query: 'caixa eletrônico 24h', 
      icon: IconAtm, 
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
    },
    { 
      label: 'Uber / Táxi', 
      query: 'ponto de táxi uber', 
      icon: IconCar, 
      color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400' 
    },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-2xl animate-fade-in-up border border-white/20 dark:border-gray-700">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">SOS Folia</h2>
            <p className="text-xs text-gray-500">Encontre ajuda rápida perto de você</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <IconX className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => openMapSearch(action.query)}
              className="flex flex-col items-center gap-3 p-2 rounded-xl active:scale-95 transition-transform group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${action.color} shadow-sm group-hover:shadow-md transition-all`}>
                <action.icon className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                {action.label}
              </span>
            </button>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-[10px] text-gray-400">
                Abertura direta no Google Maps ®
            </p>
        </div>
      </div>
    </div>
  );
};