import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, TrendingUp, ChevronDown, Check, ArrowRightLeft } from 'lucide-react';
import { CurrencyCode, WalletItem } from '../types';

interface TotalBalanceCardProps {
  wallets: WalletItem[];
  currencyMode: 'USD' | 'INR';
  onToggleCurrency: () => void;
  onTransferClick: () => void;
  onRequestClick: () => void;
  onWalletSelect?: (currency: CurrencyCode) => void;
}

export const TotalBalanceCard: React.FC<TotalBalanceCardProps> = ({
  wallets,
  currencyMode,
  onToggleCurrency,
  onTransferClick,
  onRequestClick,
  onWalletSelect,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(currencyMode === 'INR' ? 'INR' : 'USD');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sync with currencyMode
  const activeCurrency = currencyMode === 'INR' ? 'INR' : selectedCurrency;

  const currencyData: Record<CurrencyCode, { symbol: string; flag: string; amount: string; altEq: string; growth: string }> = {
    USD: { symbol: '$', flag: '🇺🇸', amount: '689,372.00', altEq: '₹6,05,95,798.80 INR', growth: '+14.8%' },
    INR: { symbol: '₹', flag: '🇮🇳', amount: '6,05,95,798.80', altEq: '$689,372.00 USD', growth: '+14.8%' },
    EUR: { symbol: '€', flag: '🇪🇺', amount: '634,220.00', altEq: '₹5,90,45,882.00 INR', growth: '+11.2%' },
    GBP: { symbol: '£', flag: '🇬🇧', amount: '544,600.00', altEq: '₹6,00,14,920.00 INR', growth: '+9.4%' },
    AED: { symbol: 'AED ', flag: '🇦🇪', amount: '2,530,000.00', altEq: '₹5,75,00,000.00 INR', growth: '+6.1%' },
    SGD: { symbol: 'S$', flag: '🇸🇬', amount: '920,400.00', altEq: '₹5,89,05,600.00 INR', growth: '+8.3%' },
  };

  const current = currencyData[activeCurrency];

  const handleCurrencySwitch = (curr: CurrencyCode) => {
    setSelectedCurrency(curr);
    setDropdownOpen(false);
    if (onWalletSelect) onWalletSelect(curr);
  };

  return (
    <div className="lg:col-span-4 bg-white rounded-[32px] p-7 card-shadow border border-gray-100/60 flex flex-col justify-between transition-all duration-300 hover:shadow-card-hover">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between relative mb-4">
          <span className="text-gray-500 font-medium text-sm">Total Balance</span>

          {/* Quick Buttons: Currency Switcher Pill + Currency Selector */}
          <div className="flex items-center gap-2">
            {/* Explicit Button to change currency to INR / USD */}
            <button
              onClick={onToggleCurrency}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all duration-200 cursor-pointer ${
                currencyMode === 'INR'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-orange-50 text-[#FF6B35] border border-orange-200 hover:bg-orange-100'
              }`}
              title="Click to toggle currency"
            >
              <span>{currencyMode === 'INR' ? '🇮🇳 INR' : '🇮🇳 Change to INR'}</span>
              <ArrowRightLeft className="w-3 h-3" />
            </button>

            {/* Pill-shaped currency dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors text-xs font-semibold text-zinc-900 cursor-pointer"
              >
                <span className="text-sm">{current.flag}</span>
                <span>{activeCurrency}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-40 animate-in fade-in zoom-in-95">
                  {(['USD', 'EUR', 'GBP', 'INR'] as CurrencyCode[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => handleCurrencySwitch(curr)}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between hover:bg-gray-50 text-zinc-900 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span>{currencyData[curr].flag}</span>
                        <span>{curr}</span>
                      </span>
                      {activeCurrency === curr && <Check className="w-3.5 h-3.5 text-[#FF6B35]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main: Large amount in Zinc-900 */}
        <div className="mt-1">
          <div className="text-[36px] font-bold text-zinc-900 tracking-tight leading-tight flex items-baseline gap-1">
            <span className="text-2xl text-gray-400 font-semibold">{current.symbol}</span>
            <span>{current.amount}</span>
          </div>

          {/* Below: Emerald-500 growth percentage */}
          <div className="flex items-center gap-2 mt-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-500 font-semibold text-xs border border-emerald-100">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span>{current.growth}</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">vs last month</span>
            <span className="text-[11px] text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium">≈ {current.altEq}</span>
          </div>
        </div>
      </div>

      {/* Middle: Two primary buttons (Transfer: Zinc-900, Request: White/Bordered) */}
      <div className="grid grid-cols-2 gap-3 my-6">
        <button
          onClick={onTransferClick}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          <ArrowUpRight className="w-4 h-4 text-gray-300" />
          <span>Transfer</span>
        </button>

        <button
          onClick={onRequestClick}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-300 text-zinc-900 font-medium text-sm transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          <ArrowDownLeft className="w-4 h-4 text-[#FF6B35]" />
          <span>Request</span>
        </button>
      </div>

      {/* Footer: A 'Wallets' section showing a 3-column grid of mini-wallet cards for USD, EUR, GBP */}
      <div className="border-t border-gray-100 pt-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
            Wallets (ICA Sub-Accounts)
          </span>
          <span className="text-[11px] text-gray-400">3 Available</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {wallets.map((wallet) => (
            <div
              key={wallet.currency}
              onClick={() => handleCurrencySwitch(wallet.currency)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                activeCurrency === wallet.currency
                  ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-sm'
                  : 'border-gray-100 bg-[#F5F6F8]/60 hover:bg-[#F5F6F8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-base">{wallet.flag}</span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    wallet.active
                      ? 'bg-emerald-50 text-emerald-500'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {wallet.active ? 'Active' : 'Idle'}
                </span>
              </div>
              <div className="text-[11px] font-medium text-gray-400">{wallet.currency}</div>
              <div className="text-xs font-bold text-zinc-900 truncate">
                {wallet.symbol}
                {(wallet.balance / 1000).toFixed(1)}k
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
