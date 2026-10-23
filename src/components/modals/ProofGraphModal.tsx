import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  ShieldAlert,
  FileText,
  DollarSign,
  UserCheck,
  CheckCircle2,
  BookOpen,
  Scale,
  AlertTriangle,
  Download,
  Copy,
  Check,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Transaction } from '../../types';

interface ProofGraphModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const ProofGraphModal: React.FC<ProofGraphModalProps> = ({
  transaction,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'GRAPH' | 'LEDGER' | 'DOCS'>('GRAPH');

  if (!transaction) return null;

  const { proofGraph } = transaction;
  const isHighTrust = proofGraph.trustScore >= 90;
  const isBlocked = transaction.status === 'Blocked' || proofGraph.trustScore < 40;

  const handleCopyId = () => {
    navigator.clipboard.writeText(transaction.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIcon = (status: 'PASS' | 'WARNING' | 'FAIL') => {
    switch (status) {
      case 'PASS':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'WARNING':
        return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'FAIL':
        return <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />;
    }
  };

  const getStatusBadge = (status: 'PASS' | 'WARNING' | 'FAIL') => {
    switch (status) {
      case 'PASS':
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px] border border-emerald-100">
            VERIFIED PASS
          </span>
        );
      case 'WARNING':
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-bold text-[10px] border border-amber-100">
            REVIEW NEEDED
          </span>
        );
      case 'FAIL':
        return (
          <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-bold text-[10px] border border-red-100">
            CHECKS FAILED
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* Modal Header */}
        <div className="px-7 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                isBlocked
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                  : 'bg-[#18181B] text-white shadow-md'
              }`}
            >
              {isBlocked ? (
                <ShieldAlert className="w-6 h-6" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-zinc-900">
                  Transaction Proof Graph
                </h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isBlocked
                      ? 'bg-red-100 text-red-700'
                      : isHighTrust
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {proofGraph.proofStatus}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                <span>Ref:</span>
                <span className="font-mono font-medium text-zinc-800">{transaction.id}</span>
                <button
                  onClick={handleCopyId}
                  className="text-gray-400 hover:text-zinc-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Trust Score Ring Pill */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border text-xs font-bold ${
                isBlocked
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : isHighTrust
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}
            >
              <span>Trust Score</span>
              <span className="text-sm font-extrabold">{proofGraph.trustScore}/100</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-zinc-900 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-7 pt-3 border-b border-gray-100 flex items-center gap-4 bg-white text-xs font-semibold">
          <button
            onClick={() => setActiveTab('GRAPH')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'GRAPH'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-gray-400 hover:text-zinc-900'
            }`}
          >
            6-Layer Anti-Fraud Tree
          </button>
          <button
            onClick={() => setActiveTab('LEDGER')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'LEDGER'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-gray-400 hover:text-zinc-900'
            }`}
          >
            Double-Entry Ledger Proof
          </button>
          <button
            onClick={() => setActiveTab('DOCS')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'DOCS'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-gray-400 hover:text-zinc-900'
            }`}
          >
            Document Vault & Hash Signatures
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-7 overflow-y-auto flex-1 space-y-6">
          {/* If Flagged/Blocked: Prominent Anti-Fraud Warning Box as per PRD FR-34/35/36 */}
          {isBlocked && proofGraph.riskReasons && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 text-red-900 shadow-sm animate-in zoom-in-95">
              <div className="flex items-center gap-2 mb-2 font-bold text-sm text-red-700">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span>FRAUD ENGINE INTERLOCK TRIPPED — TRANSACTION BLOCKED</span>
              </div>
              <p className="text-xs text-red-700 mb-3 font-medium">
                The transaction violated 5 automated risk rules. Funds have been quarantined to prevent unauthorized capital flight under FEMA / RBI regulations.
              </p>
              <div className="space-y-1.5 pl-2 border-l-2 border-red-300">
                {proofGraph.riskReasons.map((reason, idx) => (
                  <div key={idx} className="text-xs text-red-800 flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'GRAPH' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Layer 1: Intent */}
              <div className="border border-gray-100 rounded-2xl p-4 bg-[#F5F6F8]/50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-xs font-bold text-zinc-900">1. Intent Proof</span>
                  </div>
                  {getStatusBadge(proofGraph.layers.intent.status)}
                </div>
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  {proofGraph.layers.intent.summary}
                </p>
                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-gray-100 text-[11px] text-gray-500">
                  {proofGraph.layers.intent.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      {getStatusIcon(proofGraph.layers.intent.status)}
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 2: Money Movement */}
              <div className="border border-gray-100 rounded-2xl p-4 bg-[#F5F6F8]/50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-zinc-900">2. Money Movement Proof</span>
                  </div>
                  {getStatusBadge(proofGraph.layers.money.status)}
                </div>
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  {proofGraph.layers.money.summary}
                </p>
                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-gray-100 text-[11px] text-gray-500">
                  {proofGraph.layers.money.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      {getStatusIcon(proofGraph.layers.money.status)}
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 3: Identity & Sanctions */}
              <div className="border border-gray-100 rounded-2xl p-4 bg-[#F5F6F8]/50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#FF6B35]" />
                    <span className="text-xs font-bold text-zinc-900">3. Identity & Sanctions</span>
                  </div>
                  {getStatusBadge(proofGraph.layers.identity.status)}
                </div>
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  {proofGraph.layers.identity.summary}
                </p>
                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-gray-100 text-[11px] text-gray-500">
                  {proofGraph.layers.identity.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      {getStatusIcon(proofGraph.layers.identity.status)}
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 4: Settlement & FIRC */}
              <div className="border border-gray-100 rounded-2xl p-4 bg-[#F5F6F8]/50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-zinc-900">4. Settlement & FIRC</span>
                  </div>
                  {getStatusBadge(proofGraph.layers.settlement.status)}
                </div>
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  {proofGraph.layers.settlement.summary}
                </p>
                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-gray-100 text-[11px] text-gray-500">
                  {proofGraph.layers.settlement.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      {getStatusIcon(proofGraph.layers.settlement.status)}
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 5: Double-Entry Ledger */}
              <div className="border border-gray-100 rounded-2xl p-4 bg-[#F5F6F8]/50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs font-bold text-zinc-900">5. Double-Entry Ledger</span>
                  </div>
                  {getStatusBadge(proofGraph.layers.ledger.status)}
                </div>
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  {proofGraph.layers.ledger.summary}
                </p>
                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-gray-100 text-[11px] text-gray-500">
                  {proofGraph.layers.ledger.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      {getStatusIcon(proofGraph.layers.ledger.status)}
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 6: Compliance & Purpose Code */}
              <div className="border border-gray-100 rounded-2xl p-4 bg-[#F5F6F8]/50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-zinc-900">6. Compliance & RBI Code</span>
                  </div>
                  {getStatusBadge(proofGraph.layers.compliance.status)}
                </div>
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  {proofGraph.layers.compliance.summary}
                </p>
                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-gray-100 text-[11px] text-gray-500">
                  {proofGraph.layers.compliance.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      {getStatusIcon(proofGraph.layers.compliance.status)}
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'LEDGER' && (
            <div className="space-y-4">
              <div className="bg-[#F5F6F8] p-4 rounded-2xl text-xs text-gray-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-zinc-900">Segregated Sub-Ledger Verification</span>
                  <p className="text-[11px] text-gray-500">Double-entry accounting principles enforced per FR-38.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                  Zero Variance Balanced
                </span>
              </div>

              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-400 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Account Name</th>
                      <th className="py-2.5 px-4">Currency</th>
                      <th className="py-2.5 px-4 text-right">Debit</th>
                      <th className="py-2.5 px-4 text-right">Credit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {proofGraph.ledgerEntries.map((entry, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-2.5 px-4 font-medium text-zinc-900">
                          {entry.account}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-gray-500">
                          {entry.currency}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono font-semibold text-emerald-700">
                          {entry.debit || '—'}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono font-semibold text-zinc-900">
                          {entry.credit || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'DOCS' && (
            <div className="space-y-3">
              <div className="border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#FF6B35]" />
                  <div>
                    <div className="text-xs font-bold text-zinc-900">{transaction.invoiceId}.pdf</div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloading verified PDF for ${transaction.invoiceId}`)}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-zinc-800 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>

              <div className="border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-xs font-bold text-zinc-900">AD-I Bank e-FIRC Certificate</div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      FIRC Ref: BPFX-FIRC-2026-1023-9912 (Cryptographically Signed)
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Downloading e-FIRC signed document...')}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-zinc-800 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>e-FIRC PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-7 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-xs text-gray-500 font-medium">
            RBI PA-CB Regulatory Audit Log: <span className="font-mono text-zinc-700">AUD-0918-2026</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Generating full cryptographic audit bundle ZIP...')}
              className="px-4 py-2 rounded-2xl bg-white border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-zinc-900 shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Export Audit Trail</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
