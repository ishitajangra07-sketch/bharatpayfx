import React from 'react';
import { Layers, ArrowDownLeft, ArrowUpRight, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';
import { StatCardItem } from '../types';

interface StatsGridProps {
  stats: StatCardItem[];
  currencyMode?: 'USD' | 'INR';
  onCardClick?: (statId: string) => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, currencyMode = 'USD', onCardClick }) => {
  const renderIcon = (iconName: string, isGradient?: boolean) => {
    const iconClass = isGradient ? 'w-5 h-5 text-white' : 'w-5 h-5 text-zinc-900';
    switch (iconName) {
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'ArrowDownLeft':
        return <ArrowDownLeft className={iconClass} />;
      case 'ArrowUpRight':
        return <ArrowUpRight className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  const getDisplayValue = (stat: StatCardItem) => {
    if (currencyMode !== 'INR') return stat.value;

    switch (stat.id) {
      case 'pooled-savings':
        return '₹1.25 Cr';
      case 'inbound-collections':
        return '₹74.0 L';
      case 'outbound-payouts':
        return '₹28.0 L';
      default:
        return stat.value;
    }
  };

  const getDisplaySubValue = (stat: StatCardItem) => {
    if (currencyMode === 'INR') {
      if (stat.id === 'pooled-savings') return '≈ $142.5K USD (Saved ₹1.84L)';
      if (stat.id === 'inbound-collections') return '≈ $84,200 USD';
      if (stat.id === 'outbound-payouts') return '≈ $31,850 USD';
    }
    return stat.subValue;
  };

  return (
    <div className="lg:col-span-3 grid grid-cols-2 gap-4">
      {stats.map((stat, idx) => {
        const displayVal = getDisplayValue(stat);
        const displaySub = getDisplaySubValue(stat);

        // Spec: One card (Top-Left, idx === 0) must have a gradient background (orange-500 to orange-400) with white text
        if (stat.isGradient || idx === 0) {
          return (
            <div
              key={stat.id}
              onClick={() => onCardClick?.(stat.id)}
              className="bg-gradient-to-br from-[#FF6B35] to-[#FB923C] text-white rounded-[32px] p-5 shadow-lg shadow-orange-500/15 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            >
              {/* Header: Title and Icon */}
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-white/90 leading-snug">
                  {stat.title}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 ml-2 group-hover:bg-white/30 transition-colors">
                  {renderIcon(stat.icon, true)}
                </div>
              </div>

              {/* Big Number (text-3xl) & Trend */}
              <div className="mt-4">
                <div className="text-3xl font-bold tracking-tight text-white mb-1.5 truncate">
                  {displayVal}
                </div>
                {displaySub && (
                  <div className="text-[11px] text-white/80 font-medium mb-1 truncate">
                    {displaySub}
                  </div>
                )}
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
                  <TrendingUp className="w-3 h-3 text-white" />
                  <span>{stat.trend}</span>
                </div>
              </div>
            </div>
          );
        }

        // Other cards: white with gray icons
        return (
          <div
            key={stat.id}
            onClick={() => onCardClick?.(stat.id)}
            className="bg-white rounded-[32px] p-5 card-shadow border border-gray-100/60 text-[#18181B] flex flex-col justify-between transition-all duration-300 hover:shadow-card-hover cursor-pointer group"
          >
            {/* Header: Title and Gray Icon container */}
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-gray-500 leading-snug">
                {stat.title}
              </span>
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 ml-2 group-hover:bg-gray-200 transition-colors">
                {renderIcon(stat.icon, false)}
              </div>
            </div>

            {/* Big Number (text-3xl) & Trend */}
            <div className="mt-4">
              <div className="text-3xl font-bold tracking-tight text-zinc-900 mb-1.5 truncate">
                {displayVal}
              </div>
              {displaySub && (
                <div className="text-[11px] text-gray-400 font-medium mb-1 truncate">
                  {displaySub}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <div
                  className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    stat.isPositive
                      ? 'bg-emerald-50 text-emerald-500'
                      : 'bg-red-50 text-red-500'
                  }`}
                >
                  {stat.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{stat.trend}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
