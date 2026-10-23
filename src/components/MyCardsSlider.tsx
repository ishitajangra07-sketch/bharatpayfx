import React, { useState } from 'react';
import { Wifi, ChevronLeft, ChevronRight, Plus, Eye, EyeOff } from 'lucide-react';
import { CardItem } from '../types';

interface MyCardsSliderProps {
  cards: CardItem[];
  onAddNewCard?: () => void;
}

export const MyCardsSlider: React.FC<MyCardsSliderProps> = ({
  cards,
  onAddNewCard,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSensitive, setShowSensitive] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white rounded-[32px] p-6 card-shadow border border-gray-100/60 transition-all duration-300 hover:shadow-card-hover">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">My Cards</h3>
          <p className="text-[11px] text-gray-400 font-medium">
            Virtual Corporate FX Cards (Mastercard)
          </p>
        </div>

        {/* Carousel arrows */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-zinc-700 transition-colors cursor-pointer"
            title="Previous Card"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-semibold text-gray-500 px-1">
            {currentIndex + 1}/{cards.length}
          </span>
          <button
            onClick={handleNext}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-zinc-700 transition-colors cursor-pointer"
            title="Next Card"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Display Area: centered container with 280x170px dimensions */}
      <div className="flex justify-center items-center py-1">
        <div
          style={{ width: '280px', height: '170px' }}
          className={`relative rounded-[22px] p-4 text-white shadow-xl flex flex-col justify-between overflow-hidden select-none transition-all duration-500 transform ${
            currentCard.variant === 'gradient'
              ? 'bg-gradient-to-tr from-[#EA580C] via-[#FF6B35] to-[#FB923C]'
              : 'bg-zinc-900 border border-zinc-800'
          }`}
        >
          {/* Subtle background glow decorative circle */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

          {/* Top row: Top-left RSS icon & EMV chip + Top-right glassmorphism pill with 'ACTIVE' */}
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-2">
              {/* RSS / Contactless Wave Icon (rotated 90deg like contactless) */}
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white/90">
                <Wifi className="w-4 h-4 rotate-90" />
              </div>
              {/* EMV Chip mockup */}
              <div className="w-7 h-5 rounded-md bg-amber-300/80 border border-amber-200/50 flex flex-col justify-around p-0.5 shadow-sm">
                <div className="w-full h-[1px] bg-amber-500/40" />
                <div className="w-full h-[1px] bg-amber-500/40" />
              </div>
            </div>

            {/* Top-right glassmorphism pill (bg-white/10, backdrop-blur) with 'ACTIVE' text */}
            <div className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-widest text-white shadow-sm">
              {currentCard.status}
            </div>
          </div>

          {/* Center-left: Dual overlapping circles (red/orange) for Mastercard issuer logo */}
          <div className="flex items-center gap-3 relative z-10 my-auto">
            <div className="flex -space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-[#EB001B] opacity-95 shadow-sm" />
              <div className="w-7 h-7 rounded-full bg-[#F79E1B] opacity-90 shadow-sm" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
              Corporate FX
            </span>
          </div>

          {/* Bottom: Card number masked with asterisks, expiry date, and CVV in small uppercase labels with 40% opacity */}
          <div className="relative z-10">
            {/* Masked Card Number */}
            <div className="text-sm font-mono font-medium tracking-widest text-white/95 mb-1.5 drop-shadow">
              {showSensitive
                ? currentCard.cardNumberMasked
                : currentCard.cardNumberMasked.replace(/\d{4}\s\d{4}/, '•••• ••••')}
            </div>

            {/* Expiry and CVV with 40% opacity uppercase labels */}
            <div className="flex items-center justify-between text-[9px] uppercase tracking-wider">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-white opacity-40 block">Expires</span>
                  <span className="font-semibold text-white/90">{currentCard.expiry}</span>
                </div>
                <div>
                  <span className="text-white opacity-40 block">CVV</span>
                  <span className="font-semibold text-white/90">
                    {showSensitive ? currentCard.cvv : '•••'}
                  </span>
                </div>
              </div>

              {/* Toggle sensitive toggle */}
              <button
                onClick={() => setShowSensitive(!showSensitive)}
                className="text-white/60 hover:text-white transition-colors p-1"
                title={showSensitive ? 'Hide details' : 'Show details'}
              >
                {showSensitive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Quick Actions */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="text-[11px] text-gray-500 font-medium">
          Spent: <span className="font-bold text-zinc-900">${currentCard.spent.toLocaleString()}</span> of ${currentCard.limit.toLocaleString()}
        </div>
        <button
          onClick={onAddNewCard}
          className="flex items-center gap-1 text-xs font-semibold text-[#FF6B35] hover:text-[#FA581C] transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Card</span>
        </button>
      </div>
    </div>
  );
};
