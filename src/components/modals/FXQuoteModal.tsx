import React, { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw, Timer, ArrowRight, ShieldCheck, Check, Info } from 'lucide-react';
import { CurrencyCode, FXQuote } from '../../types';

interface FXQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteConversion: (quote: FXQuote, mode: 'IMMEDIATE' | 'POOLED') => void;
}

export const FXQuoteModal: React.FC<FXQuoteModalProps> = ({
  isOpen,
  onClose,
  onExecuteConversion,
}) => {
  const [sourceCurrency, setSourceCurrency] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState<number>(10000);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isLocked, setIsLocked] = useState<boolean>(true);

  // Live calculation based on real rates
  const midMarketRates: Record<CurrencyCode, number> = {
    USD: 88.00,
    EUR: 93.45,
    GBP: 110.60,
    INR: 1,
    AED: 23.96,
    SGD: 67.20,
  };

  const midRate = midMarketRates[sourceCurrency] || 88.00;
  const spreadPerUnit = sourceCurrency === 'USD' ? 0.13 : 0.18;
  const offeredRate = Number((midRate - spreadPerUnit).toFixed(4));
  const pooledRate = Number((midRate - 0.09).toFixed(4)); // Pooled spread is only 0.09!

  const immediateINR = Math.round(amount * offeredRate);
  const pooledINR = Math.round(amount * pooledRate);
  const savingsINR = pooledINR - immediateINR;

  const currentQuote: FXQuote = {
    quoteId: `QTE-${Date.now().toString().slice(-6)}`,
    sourceCurrency,
    destCurrency: 'INR',
    amount,
    midMarketRate: midRate,
    offeredRate,
    pooledRate,
    spread: spreadPerUnit,
    platformFee: 0,
    partnerFee: 0,
    finalINR: immediateINR,
    individualINR: immediateINR,
    savingsINR,
    expiresInSec: timeLeft,
    poolId: 'POOL-USD-INR-20261023-001',
  };

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 60; // Auto-refresh quote
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                Transparent FX Quote Engine
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                Live Mid-Market Reference & Netting Spread Calculator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-zinc-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Amount and Currency Selection */}
          <div className="bg-[#F5F6F8] p-4 rounded-2xl border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 mb-2">
              Source Currency & Amount
            </label>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sourceCurrency}
                  onChange={(e) => setSourceCurrency(e.target.value as CurrencyCode)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-zinc-900 outline-none focus:border-[#FF6B35] cursor-pointer"
                >
                  <option value="USD">🇺🇸 USD</option>
                  <option value="EUR">🇪🇺 EUR</option>
                  <option value="GBP">🇬🇧 GBP</option>
                  <option value="AED">🇦🇪 AED</option>
                  <option value="SGD">🇸🇬 SGD</option>
                </select>
              </div>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(100, Number(e.target.value)))}
                step="500"
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-base font-bold text-zinc-900 outline-none focus:border-[#FF6B35]"
              />
            </div>
          </div>

          {/* Rate Lock Timer Bar */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-orange-50/70 border border-orange-100 text-xs">
            <div className="flex items-center gap-2 text-orange-950 font-medium">
              <Timer className="w-4 h-4 text-[#FF6B35] animate-spin" />
              <span>Quote locked for:</span>
              <span className="font-mono font-bold text-[#FF6B35]">{timeLeft}s</span>
            </div>
            <button
              onClick={() => setTimeLeft(60)}
              className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-zinc-900 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </button>
          </div>

          {/* FR-16: Transparent Breakdown Card */}
          <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-gray-500">
              <span>Mid-market interbank rate:</span>
              <span className="font-mono font-medium text-zinc-700">₹{midRate.toFixed(4)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
              <span>BharatPayFX spread markup:</span>
              <span className="font-mono font-medium text-zinc-700">-₹{spreadPerUnit.toFixed(4)} / {sourceCurrency}</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
              <span>Platform fee (V1 Free):</span>
              <span className="font-mono font-bold text-emerald-600">₹0.00</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
              <span>Partner bank remittance fee:</span>
              <span className="font-mono font-bold text-emerald-600">₹0.00</span>
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center font-bold text-sm text-zinc-900">
              <span>Offered Effective Rate:</span>
              <span className="text-[#3B82F6] font-mono">1 {sourceCurrency} = ₹{offeredRate.toFixed(4)}</span>
            </div>
          </div>

          {/* Execution Options: Immediate vs Pooled */}
          <div className="grid grid-cols-2 gap-3">
            {/* Option A: Immediate Individual Conversion */}
            <div className="border border-gray-200 rounded-2xl p-3.5 flex flex-col justify-between hover:border-gray-300 transition-all bg-white">
              <div>
                <span className="text-xs font-semibold text-gray-500 block">Instant Conversion</span>
                <div className="text-base font-bold text-zinc-900 mt-1">
                  ₹{immediateINR.toLocaleString()}
                </div>
                <span className="text-[10px] text-gray-400 block mt-0.5">Rate: ₹{offeredRate}</span>
              </div>
              <button
                onClick={() => onExecuteConversion(currentQuote, 'IMMEDIATE')}
                className="mt-3 w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer"
              >
                Convert Now
              </button>
            </div>

            {/* Option B: Pooled Netting Rate (Recommended!) */}
            <div className="border-2 border-[#FF6B35] rounded-2xl p-3.5 flex flex-col justify-between bg-orange-50/30 relative overflow-hidden">
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#FF6B35] text-white text-[9px] font-bold">
                +₹{savingsINR.toLocaleString()} SAVINGS
              </div>
              <div>
                <span className="text-xs font-bold text-[#FF6B35] block">Join 15:30 IST Pool</span>
                <div className="text-base font-bold text-zinc-900 mt-1">
                  ₹{pooledINR.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                  Pooled Rate: ₹{pooledRate}
                </span>
              </div>
              <button
                onClick={() => onExecuteConversion(currentQuote, 'POOLED')}
                className="mt-3 w-full py-2 rounded-xl bg-[#FF6B35] hover:bg-[#FA581C] text-white text-xs font-semibold shadow-md shadow-orange-500/20 cursor-pointer"
              >
                Join Pooled Batch
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-gray-100 bg-[#F5F6F8] text-[11px] text-gray-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Guaranteed zero hidden markups under RBI PA-CB guidelines</span>
          </div>
          <span>Quote ID: {currentQuote.quoteId}</span>
        </div>
      </div>
    </div>
  );
};
