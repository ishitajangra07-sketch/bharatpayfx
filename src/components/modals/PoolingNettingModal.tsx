import React, { useState } from 'react';
import {
  X,
  Layers,
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FXPool } from '../../types';

interface PoolingNettingModalProps {
  isOpen: boolean;
  poolData: FXPool;
  onClose: () => void;
  onJoinPool: (amount: number) => void;
}

export const PoolingNettingModal: React.FC<PoolingNettingModalProps> = ({
  isOpen,
  poolData,
  onClose,
  onJoinPool,
}) => {
  const [contributionAmount, setContributionAmount] = useState<number>(10000);
  const [hasJoined, setHasJoined] = useState(false);

  if (!isOpen) return null;

  const handleJoin = () => {
    onJoinPool(contributionAmount);
    setHasJoined(true);

    // Fire joyful celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B35', '#3B82F6', '#10B981'],
    });

    setTimeout(() => {
      setHasJoined(false);
      onClose();
    }, 2200);
  };

  const calculatedINR = Math.round(contributionAmount * poolData.poolRate);
  const individualINR = Math.round(contributionAmount * poolData.individualRate);
  const savings = calculatedINR - individualINR;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* Modal Header */}
        <div className="px-7 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 via-white to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-[#FB923C] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-zinc-900">
                  Pooled FX & Netting Clearing House
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Active Cycle
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Pool ID: <span className="font-mono text-zinc-700">{poolData.poolId}</span>
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
        <div className="p-7 overflow-y-auto space-y-6">
          {/* Main Pool Metrics Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#F5F6F8] rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
                <Users className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Participants</span>
              </div>
              <div className="text-xl font-bold text-zinc-900">
                {poolData.participantsCount} MSMEs
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">+3 joined in last hour</span>
            </div>

            <div className="bg-[#F5F6F8] rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
                <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Cutoff Time</span>
              </div>
              <div className="text-xl font-bold text-zinc-900">
                {poolData.cutoffTime.split(' ')[0]} IST
              </div>
              <span className="text-[10px] text-[#FF6B35] font-semibold">Today • Auto-settles</span>
            </div>

            <div className="bg-[#F5F6F8] rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Locked Rate</span>
              </div>
              <div className="text-xl font-bold text-zinc-900">
                ₹{poolData.poolRate.toFixed(2)}
              </div>
              <span className="text-[10px] text-gray-400 font-medium">vs ₹{poolData.individualRate} solo</span>
            </div>
          </div>

          {/* Visual Netting Architecture (PRD Section 9.6 & 10.7) */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-gradient-to-b from-white to-[#F5F6F8]/60 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">
                  Internal Flow Netting Architecture
                </span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#3B82F6]">
                $28K Conversion Cost Avoided
              </span>
            </div>

            {/* Visual Bar Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Gross Aggregated Demand:</span>
                <span className="font-bold text-zinc-900">${poolData.grossVolume.toLocaleString()} USD</span>
              </div>

              {/* Stacked visualization bar */}
              <div className="h-6 w-full rounded-xl bg-gray-100 overflow-hidden flex shadow-inner">
                {/* Netted offset: 20% */}
                <div
                  style={{ width: `${(poolData.nettedVolume / poolData.grossVolume) * 100}%` }}
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] text-white font-bold tracking-wider"
                  title="Internally Netted: Zero FX Spread"
                >
                  NET OFFSET (20%)
                </div>
                {/* External AD-I Bank: 80% */}
                <div
                  style={{ width: `${(poolData.externalVolume / poolData.grossVolume) * 100}%` }}
                  className="bg-[#3B82F6] h-full flex items-center justify-center text-[10px] text-white font-bold tracking-wider"
                  title="Wholesale Liquidity Conversion"
                >
                  WHOLESALE BANK (80%)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-gray-600">
                    Internally Netted: <strong className="text-zinc-900">${poolData.nettedVolume.toLocaleString()}</strong> (0% spread)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-gray-600">
                    Bank Wholesale: <strong className="text-zinc-900">${poolData.externalVolume.toLocaleString()}</strong> (Tier-1 rate)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Join Pool Calculator */}
          <div className="bg-orange-50/60 border border-orange-200/80 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-orange-950 uppercase tracking-wider mb-3">
              Join Batch Allocation
            </h4>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:w-1/2">
                <label className="text-[11px] text-gray-500 font-medium block mb-1">
                  Your USD Amount:
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(Math.max(100, Number(e.target.value)))}
                    step="1000"
                    className="w-full bg-white border border-orange-200 rounded-xl pl-8 pr-3 py-2 text-sm font-bold text-zinc-900 outline-none focus:ring-2 focus:ring-[#FF6B35]/30"
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2 bg-white rounded-xl p-3 border border-orange-100 flex flex-col justify-center">
                <div className="text-[11px] text-gray-500 font-medium">Estimated INR Payout:</div>
                <div className="text-lg font-bold text-zinc-900">
                  ₹{calculatedINR.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 font-bold">
                  +₹{savings.toLocaleString()} extra in your pocket!
                </div>
              </div>
            </div>

            <button
              onClick={handleJoin}
              disabled={hasJoined}
              className={`mt-4 w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                hasJoined
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FF6B35] hover:bg-[#FA581C] text-white shadow-orange-500/25 active:scale-[0.99]'
              }`}
            >
              {hasJoined ? (
                <>
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span>Successfully Joined Pool #001!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Join Pool & Lock ₹{poolData.poolRate.toFixed(2)} Rate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-7 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Deterministic allocation per PRD FR-21 with separate double-entry audit</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-gray-500 hover:text-zinc-900 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
