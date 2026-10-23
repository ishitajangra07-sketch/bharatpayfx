import React from 'react';
import { Layers, ArrowRight, Zap, Users, Clock, Sparkles, TrendingUp } from 'lucide-react';
import { FXPool } from '../types';

interface ActivePoolCardProps {
  poolData: FXPool;
  currencyMode: 'USD' | 'INR';
  onOpenPoolModal: () => void;
}

export const ActivePoolCard: React.FC<ActivePoolCardProps> = ({
  poolData,
  currencyMode,
  onOpenPoolModal,
}) => {
  const nettingPercentage = Math.round((poolData.nettedVolume / poolData.grossVolume) * 100);

  return (
    <div className="bg-white rounded-[32px] p-6 card-shadow border border-gray-100/60 transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-orange-50 text-[#FF6B35] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-900">FX Netting Clearinghouse</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px] border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>OPEN</span>
                </span>
              </div>
              <p className="text-[11px] font-mono text-gray-400">
                {poolData.poolId}
              </p>
            </div>
          </div>
        </div>

        {/* Highlighted Savings Banner */}
        <div className="bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-blue-500/5 border border-orange-200/60 rounded-2xl p-3.5 mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-zinc-800 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Internal Offset Benefit</span>
            </span>
            <span className="font-extrabold text-[#FF6B35]">
              {currencyMode === 'INR' ? '₹1,84,200 Saved' : '$2,190 Net Savings'}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Offsets inbound exporter receipts against outbound importer invoices with 0% bank spread.
          </p>
        </div>

        {/* 2-Column Key Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#F5F6F8] rounded-2xl p-3 border border-gray-100/80">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium mb-0.5">
              <Clock className="w-3 h-3 text-[#FF6B35]" />
              <span>Next Cutoff</span>
            </div>
            <div className="text-sm font-bold text-zinc-900">
              15:30 IST <span className="text-[10px] font-semibold text-orange-600 block sm:inline">Today</span>
            </div>
          </div>

          <div className="bg-[#F5F6F8] rounded-2xl p-3 border border-gray-100/80">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium mb-0.5">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>Pooled Rate</span>
            </div>
            <div className="text-sm font-bold text-zinc-900">
              ₹{poolData.poolRate.toFixed(2)} <span className="text-[10px] text-emerald-600 font-medium">(+0.26)</span>
            </div>
          </div>
        </div>

        {/* Netting Volume Progress */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>{poolData.participantsCount} MSMEs in batch</span>
            </span>
            <span className="font-bold text-zinc-800 text-[11px]">
              {nettingPercentage}% Internally Netted
            </span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${nettingPercentage}%` }}
              className="bg-emerald-500 h-full rounded-l-full"
              title={`Internally Netted: $${poolData.nettedVolume.toLocaleString()}`}
            />
            <div
              style={{ width: `${100 - nettingPercentage}%` }}
              className="bg-[#3B82F6] h-full rounded-r-full"
              title={`Wholesale Bank Conversion: $${poolData.externalVolume.toLocaleString()}`}
            />
          </div>

          <div className="flex justify-between text-[10px] text-gray-400 pt-0.5">
            <span>Netted: ${poolData.nettedVolume.toLocaleString()}</span>
            <span>External: ${poolData.externalVolume.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onOpenPoolModal}
        className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98]"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
        <span>Join Netting Pool & Lock ₹{poolData.poolRate.toFixed(2)}</span>
        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
      </button>
    </div>
  );
};
