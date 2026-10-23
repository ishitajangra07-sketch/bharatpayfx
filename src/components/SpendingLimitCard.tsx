import React from 'react';
import { Shield } from 'lucide-react';

interface SpendingLimitCardProps {
  spent: number;
  limit: number;
  currencySymbol?: string;
  currencyMode?: 'USD' | 'INR';
}

export const SpendingLimitCard: React.FC<SpendingLimitCardProps> = ({
  spent = 18450,
  limit = 25000,
  currencySymbol = '$',
  currencyMode = 'USD',
}) => {
  const displaySpent = currencyMode === 'INR' ? Math.round(spent * 87.87) : spent;
  const displayLimit = currencyMode === 'INR' ? Math.round(limit * 87.87) : limit;
  const symbol = currencyMode === 'INR' ? '₹' : currencySymbol;

  const percentage = Math.min(Math.round((displaySpent / displayLimit) * 100), 100);

  return (
    <div className="bg-white rounded-[32px] p-6 card-shadow border border-gray-100/60 mb-6 transition-all duration-300 hover:shadow-card-hover">
      {/* Title & Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-zinc-900">
          Monthly Outward Remittance Quota
        </span>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B35] text-[11px] font-semibold border border-orange-100">
          <Shield className="w-3 h-3 text-[#FF6B35]" />
          <span>AD-I Cap</span>
        </div>
      </div>

      {/* Amounts */}
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <span className="text-2xl font-bold text-zinc-900">
            {symbol}{displaySpent.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 font-medium ml-1.5">
            / {symbol}{displayLimit.toLocaleString()}
          </span>
        </div>
        <span className="text-xs font-bold text-zinc-900 bg-gray-100 px-2 py-0.5 rounded-full">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar with Animated Diagonal Stripe Overlay */}
      {/* Container: bg-gray-100, h-4, rounded-full. Fill: bg-[#FF6B35]. Overlay: CSS class 'progress-stripe' */}
      <div className="bg-gray-100 h-4 rounded-full overflow-hidden relative shadow-inner p-0.5">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-[#FF6B35] h-full rounded-full relative overflow-hidden transition-all duration-700 ease-out"
        >
          {/* Diagonal animated stripe overlay */}
          <div className="absolute inset-0 progress-stripe w-full h-full opacity-90" />
        </div>
      </div>

      {/* Subtext info */}
      <div className="flex items-center justify-between mt-3 text-[11px] text-gray-400 font-medium">
        <span>Resets in 8 days</span>
        <span className="text-emerald-600 font-semibold">
          {symbol}{(displayLimit - displaySpent).toLocaleString()} remaining
        </span>
      </div>
    </div>
  );
};
