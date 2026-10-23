import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Bell,
  Layers,
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';

interface HeaderProps {
  currencyMode: 'USD' | 'INR';
  onToggleCurrency: () => void;
  onOpenQuote: () => void;
  onOpenPool: () => void;
  onOpenProofAlert: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currencyMode,
  onToggleCurrency,
  onOpenQuote,
  onOpenPool,
  onOpenProofAlert,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F5F6F8]/90 backdrop-blur-md border-b border-gray-200/60 py-3.5 px-4 sm:px-8 mb-6">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Organization */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#18181B] via-[#27272A] to-[#FF6B35] flex items-center justify-center text-white shadow-md shadow-orange-500/10">
              <span className="font-bold text-lg tracking-wider text-white">B</span>
              <span className="text-[#FF6B35] font-extrabold text-sm ml-[-2px]">FX</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-[#18181B] tracking-tight">BharatPay<span className="text-[#FF6B35]">FX</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                  PA-CB Rails
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium hidden sm:block">
                Cross-Border FX & Treasury for Indian MSMEs
              </p>
            </div>
          </div>

          {/* Org Switcher / Verified Badge */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-gray-200">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-zinc-900">Ravi Tech Solutions Pvt Ltd</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className="text-[11px] text-gray-400">IEC: 0319842109 • AD-I Verified</span>
            </div>
          </div>
        </div>

        {/* Live Rates Ticker */}
        <div className="hidden xl:flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-full border border-gray-200/80 shadow-sm text-xs">
          <div className="flex items-center gap-1.5 font-medium text-gray-500">
            <TrendingUp className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Live Interbank:</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-zinc-900">
              USD/INR <span className="text-emerald-600 font-bold">87.8700</span>
            </span>
            <span className="text-gray-300">|</span>
            <span className="font-semibold text-zinc-900">
              EUR/INR <span className="text-emerald-600 font-bold">93.1250</span>
            </span>
            <span className="text-gray-300">|</span>
            <span className="font-semibold text-zinc-900">
              GBP/INR <span className="text-emerald-600 font-bold">110.1800</span>
            </span>
          </div>
        </div>

        {/* Action Controls, Currency Switcher & Profile */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap sm:flex-nowrap">
          {/* Explicit Button: Change Currency to INR (₹) / USD ($) */}
          <button
            onClick={onToggleCurrency}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold text-xs border shadow-sm transition-all duration-200 cursor-pointer ${
              currencyMode === 'INR'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-emerald-600/20 active:scale-95'
                : 'bg-white hover:bg-orange-50 text-zinc-900 border-gray-200 hover:border-orange-300 active:scale-95'
            }`}
            title="Toggle between INR (₹) and USD ($) display"
          >
            <span className="text-sm">{currencyMode === 'INR' ? '🇮🇳' : '🇺🇸'}</span>
            <span>{currencyMode === 'INR' ? 'Viewing in INR (₹)' : 'Change to INR (₹)'}</span>
            <ArrowRightLeft className={`w-3.5 h-3.5 ${currencyMode === 'INR' ? 'text-emerald-200' : 'text-[#FF6B35]'}`} />
          </button>

          {/* Active Pool Shortcut */}
          <button
            onClick={onOpenPool}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FF6B35]/10 hover:bg-[#FF6B35]/15 text-[#FF6B35] font-semibold text-xs border border-[#FF6B35]/20 transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Pool #001 (15:30 IST)</span>
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
          </button>

          {/* Quick FX Calculator */}
          <button
            onClick={onOpenQuote}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-gray-50 text-zinc-900 font-semibold text-xs border border-gray-200 shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="hidden sm:inline">FX Quote</span>
          </button>

          {/* Fraud / Compliance Alert Notification */}
          <button
            onClick={onOpenProofAlert}
            title="1 Security Risk Alert"
            className="relative p-2.5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-zinc-800 transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
              1
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-2">
            <div className="w-9 h-9 rounded-2xl bg-[#18181B] text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
              RS
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-zinc-900">Ravi Sharma</div>
              <div className="text-[10px] text-gray-500 font-medium">Founder & Maker</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
