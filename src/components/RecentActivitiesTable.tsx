import React, { useState } from 'react';
import {
  Search,
  MoreVertical,
  ArrowDownLeft,
  ArrowUpRight,
  Layers,
  ShieldCheck,
  ShieldAlert,
  FileCheck,
  ExternalLink,
  Download,
  CheckSquare,
  Square
} from 'lucide-react';
import { Transaction } from '../types';

interface RecentActivitiesTableProps {
  transactions: Transaction[];
  currencyMode?: 'USD' | 'INR';
  onSelectTransaction: (txn: Transaction) => void;
  onFilterChange?: (filter: string) => void;
}

export const RecentActivitiesTable: React.FC<RecentActivitiesTableProps> = ({
  transactions,
  currencyMode = 'USD',
  onSelectTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'INBOUND' | 'OUTBOUND' | 'COMPLETED' | 'BLOCKED'>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Filter transactions
  const filteredTransactions = transactions.filter((txn) => {
    // Search match
    const matchesSearch =
      txn.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.purposeCode.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'INBOUND') return txn.direction === 'in';
    if (activeFilter === 'OUTBOUND') return txn.direction === 'out';
    if (activeFilter === 'COMPLETED') return txn.status === 'Completed';
    if (activeFilter === 'BLOCKED') return txn.status === 'Blocked';
    return true;
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredTransactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTransactions.map((t) => t.id));
    }
  };

  const handleToggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderActivityIcon = (txn: Transaction) => {
    if (txn.status === 'Blocked') {
      return (
        <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-4 h-4 text-red-500" />
        </div>
      );
    }
    if (txn.type === 'POOLED_CONVERSION') {
      return (
        <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF6B35] flex items-center justify-center shrink-0">
          <Layers className="w-4 h-4 text-[#FF6B35]" />
        </div>
      );
    }
    if (txn.direction === 'in') {
      return (
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
        </div>
      );
    }
    return (
      <div className="w-9 h-9 rounded-xl bg-gray-100 text-zinc-800 flex items-center justify-center shrink-0">
        <ArrowUpRight className="w-4 h-4 text-zinc-700" />
      </div>
    );
  };

  const renderStatusPill = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Completed</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#FF6B35] text-xs font-semibold border border-orange-100">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span>In Progress</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold border border-red-100">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>Pending</span>
          </span>
        );
      case 'Blocked':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/80 text-red-700 text-xs font-bold border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            <span>Blocked (Fraud)</span>
          </span>
        );
    }
  };

  return (
    <div className="lg:col-span-8 bg-white rounded-[32px] p-7 card-shadow border border-gray-100/60 transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between">
      {/* Top Header: Title, Search bar, and Filter button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-[18px] font-semibold text-zinc-900 leading-snug">
            Recent Activities
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Cross-Border Collections, Netting Batches & Outbound Remittances
          </p>
        </div>

        {/* Controls: Search and Filter */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Search bar */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, client..."
              className="w-full bg-[#F5F6F8] border border-transparent focus:border-gray-200 focus:bg-white rounded-2xl pl-9 pr-3.5 py-2 text-xs text-zinc-900 placeholder:text-gray-400 transition-all outline-none"
            />
          </div>

          {/* Filter button & pills */}
          <div className="flex items-center gap-1.5 bg-[#F5F6F8] p-1 rounded-2xl text-xs font-medium">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-white text-zinc-900 font-bold shadow-sm'
                  : 'text-gray-500 hover:text-zinc-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('INBOUND')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeFilter === 'INBOUND'
                  ? 'bg-white text-zinc-900 font-bold shadow-sm'
                  : 'text-gray-500 hover:text-zinc-900'
              }`}
            >
              Inward
            </button>
            <button
              onClick={() => setActiveFilter('OUTBOUND')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeFilter === 'OUTBOUND'
                  ? 'bg-white text-zinc-900 font-bold shadow-sm'
                  : 'text-gray-500 hover:text-zinc-900'
              }`}
            >
              Outward
            </button>
            <button
              onClick={() => setActiveFilter('BLOCKED')}
              className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                activeFilter === 'BLOCKED'
                  ? 'bg-red-500 text-white font-bold shadow-sm'
                  : 'text-red-500 hover:bg-red-50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Flagged</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto -mx-7 px-7">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-3 pl-2 pr-3 w-8">
                <button
                  onClick={handleSelectAll}
                  className="text-gray-400 hover:text-zinc-900 transition-colors"
                >
                  {selectedIds.length === filteredTransactions.length && filteredTransactions.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-[#FF6B35]" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </th>
              <th className="py-3 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Order ID
              </th>
              <th className="py-3 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Activity
              </th>
              <th className="py-3 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Price / Amount
              </th>
              <th className="py-3 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 pr-2 pl-3 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Proof & Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredTransactions.map((txn) => {
              const isSelected = selectedIds.includes(txn.id);

              // Amount formatting based on currencyMode
              const mainPrice = currencyMode === 'INR'
                ? (txn.direction === 'in' ? `+${txn.inrFormatted}` : `-${txn.inrFormatted}`)
                : txn.priceFormatted;

              const altPrice = currencyMode === 'INR'
                ? `≈ ${txn.priceFormatted} ${txn.currency}`
                : `≈ ${txn.inrFormatted}`;

              return (
                <tr
                  key={txn.id}
                  onClick={() => onSelectTransaction(txn)}
                  className={`group transition-colors duration-150 cursor-pointer ${
                    isSelected ? 'bg-orange-50/40' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 pl-2 pr-3">
                    <button
                      onClick={(e) => handleToggleSelect(txn.id, e)}
                      className="text-gray-400 hover:text-zinc-900 transition-colors"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-[#FF6B35]" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                      )}
                    </button>
                  </td>

                  {/* Order ID (Medium weight) */}
                  <td className="py-3.5 px-3">
                    <div className="font-medium text-xs text-zinc-900 font-mono">
                      {txn.orderId}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {txn.invoiceId}
                    </div>
                  </td>

                  {/* Activity (Icon + Label) */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      {renderActivityIcon(txn)}
                      <div>
                        <div className="text-xs font-semibold text-zinc-900 group-hover:text-[#FF6B35] transition-colors leading-tight">
                          {txn.activity}
                        </div>
                        <div className="text-[11px] text-gray-400 font-medium">
                          {txn.counterparty}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Price (Bold) */}
                  <td className="py-3.5 px-3">
                    <div
                      className={`text-xs font-bold ${
                        txn.status === 'Blocked'
                          ? 'text-red-500 line-through'
                          : 'text-zinc-900'
                      }`}
                    >
                      {mainPrice}
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">
                      {altPrice}
                    </div>
                  </td>

                  {/* Status (Pill with dot) */}
                  <td className="py-3.5 px-3">
                    {renderStatusPill(txn.status)}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-3">
                    <div className="text-xs text-gray-500 font-medium">
                      {txn.date}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      {txn.purposeCode.split(' ')[0]}
                    </div>
                  </td>

                  {/* Action Menu & Proof Graph Launcher */}
                  <td className="py-3.5 pr-2 pl-3 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectTransaction(txn)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                          txn.proofGraph.trustScore >= 90
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            : txn.proofGraph.trustScore >= 70
                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                            : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                        }`}
                        title="Inspect 6-Layer Proof Graph & Double-Entry Ledger"
                      >
                        {txn.proofGraph.trustScore >= 90 ? (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                        )}
                        <span>{txn.proofGraph.trustScore}/100</span>
                      </button>

                      {/* Three-dot action menu */}
                      <button
                        onClick={() => setActiveDropdownId(activeDropdownId === txn.id ? null : txn.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-zinc-900 hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Dropdown Menu */}
                    {activeDropdownId === txn.id && (
                      <div className="absolute right-8 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-30 text-left">
                        <button
                          onClick={() => {
                            setActiveDropdownId(null);
                            onSelectTransaction(txn);
                          }}
                          className="w-full px-3.5 py-1.5 text-xs text-zinc-900 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>View Proof Graph</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdownId(null);
                            alert(`FIRC Certificate for ${txn.invoiceId} downloaded.`);
                          }}
                          className="w-full px-3.5 py-1.5 text-xs text-zinc-900 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
                          <span>Download e-FIRC</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdownId(null);
                            alert(`EDPMS Ref: EDPMS-2026-IN-${txn.invoiceId}`);
                          }}
                          className="w-full px-3.5 py-1.5 text-xs text-zinc-900 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                          <span>EDPMS Clearance Ref</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100 text-xs text-gray-400">
        <div>
          Showing <span className="font-semibold text-zinc-900">{filteredTransactions.length}</span> of {transactions.length} records
        </div>
        <div className="flex items-center gap-2">
          <span>RBI Master Direction Reporting: 100% Gross Realized</span>
        </div>
      </div>
    </div>
  );
};
