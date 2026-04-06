import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface DashboardCard {
  id: string;
  title: string;
}

const cards: DashboardCard[] = [
  { id: '1', title: 'Bundle and Entitlement Maintenance' },
  { id: '2', title: 'Transaction Maintenance' },
  { id: '3', title: 'Wallet Activity Tool' },
  { id: '4', title: 'Electronically Approved Vouchers' },
  { id: '5', title: 'Cashiering' },
  { id: '6', title: 'Typecode & Voucher Management' }
];

export function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCardClick = (cardId: string) => {
    if (cardId === '6') {
      navigate('/typecode-voucher-management');
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      <Header showMenu showUserProfile />

      <main className="flex-1 p-10">
        <div 
          className="grid gap-5"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {cards.map((card) => (
            <button
              key={card.id}
              className="text-center transition-all duration-200"
              style={{
                backgroundColor: hoveredCard === card.id ? '#9ec9e8' : '#b3d9f2',
                borderRadius: '8px',
                padding: '40px 30px',
                minHeight: '120px',
                border: hoveredCard === card.id ? '2px solid #1e3a5f' : '2px solid transparent',
                transform: hoveredCard === card.id ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredCard === card.id ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(card.id)}
            >
              <h2 
                className="font-semibold"
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1e3a5f'
                }}
              >
                {card.title}
              </h2>
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}