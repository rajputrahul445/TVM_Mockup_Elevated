import { useEffect, useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  showMenu?: boolean;
  showUserProfile?: boolean;
}

export function Header({ showMenu = false, showUserProfile = false }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options).replace(',', '');
  };

  return (
    <header
      className="h-[60px] flex items-center justify-between px-[30px]"
      style={{ backgroundColor: '#1e3a5f' }}
    >
      <div className="flex items-center gap-3">
        {showMenu && (
          <button className="text-white hover:opacity-80">
            <Menu size={24} />
          </button>
        )}

        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1e3a5f] text-xs font-bold">
          O
        </div>

        <span className="text-white text-2xl font-semibold" style={{ letterSpacing: '2px' }}>
          OASSYS
        </span>
      </div>

      <div className="flex items-center">
        <span className="text-white font-semibold">AWS Prod</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-white text-xs">{formatTime(currentTime)}</div>
          <div className="text-white text-xs font-semibold">Current Voyage: G605</div>
        </div>

        {showUserProfile && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-semibold">
              MG
            </div>
            <span className="text-white text-sm">MaqGarcia</span>
            <ChevronDown size={16} className="text-white" />
          </div>
        )}
      </div>
    </header>
  );
}