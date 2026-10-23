import React, { useState } from 'react';
import { X, ArrowUpRight, ShieldCheck, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Transaction } from '../../types';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTransfer: (newTxn: Partial<Transaction>) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  onSubmitTransfer,
}) => {
  const [beneficiary, setBeneficiary] = useState('AWS EMEA SARL (Ireland)');
  const [amount, setAmount] = useState('3250');
  const [currency, setCurrency] = useState('USD');
  const [purposeCode, setPurposeCode] = useState('P0807 — Database & Cloud Hosting Services');
  const [invoiceNumber, setInvoiceNumber] = useState('SUP-5102');
  const [fileName, setFileName] = useState('AWS_Oct_Invoice_5102.pdf');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount) || 1000;
    const inrRate = 88.10;
    const inr = Math.round(numAmount * inrRate);

    onSubmitTransfer({
      id: `BPFX-PAY-${Date.now().toString().slice(-4)}-9A10`,
      orderId: `#ORD-${Date.now().toString().slice(-4)}`,
      invoiceId: invoiceNumber,
      activity: `${beneficiary.split(' ')[0]} Cloud & Infra`,
      counterparty: beneficiary,
      counterpartyCountry: 'Ireland',
      type: 'OUTBOUND_PAYMENT',
      direction: 'out',
      amount: numAmount,
      currency: currency as any,
      priceFormatted: `-$${numAmount.toLocaleString()}.00`,
      inrAmount: inr,
      inrFormatted: `₹${inr.toLocaleString()}.00`,
      status: 'In Progress',
      date: 'Just now',
      purposeCode,
      proofGraph: {
        trustScore: 96,
        proofStatus: 'VERIFIED',
        layers: {
          intent: {
            name: 'Intent Proof',
            status: 'PASS',
            summary: `Invoice ${invoiceNumber} uploaded with verified digital signature`,
            details: [`File: ${fileName}`, `Vendor: ${beneficiary}`]
          },
          money: {
            name: 'Money Movement Proof',
            status: 'PASS',
            summary: 'INR funding debit scheduled; OCA SWIFT routing verified',
            details: ['AD-I Category Outward Account']
          },
          identity: {
            name: 'Identity & Sanctions Proof',
            status: 'PASS',
            summary: 'Beneficiary bank IBAN and KYC verified',
            details: ['Sanctions check: CLEARED (0 hits)']
          },
          settlement: {
            name: 'Settlement Proof',
            status: 'PASS',
            summary: 'Disbursement queued in next banking clearing cycle',
            details: ['Expected settlement: Within 4 hours']
          },
          ledger: {
            name: 'Double-Entry Ledger Proof',
            status: 'PASS',
            summary: 'Sub-ledger journal entry created and balanced',
            details: ['JRNL-NEW-01 created']
          },
          compliance: {
            name: 'Compliance Proof',
            status: 'PASS',
            summary: 'Form 15CA/CB documentation verified for foreign remittance',
            details: [`Purpose Code: ${purposeCode}`]
          }
        },
        ledgerEntries: [
          { account: 'Vendor Accounts Payable', debit: `$${numAmount.toLocaleString()}.00`, currency },
          { account: 'INR Operational Wallet', credit: `₹${inr.toLocaleString()}.00`, currency: 'INR' }
        ]
      }
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-zinc-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <ArrowUpRight className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="text-base font-bold">Transfer / Outbound Payout</h3>
              <p className="text-xs text-gray-400">Compliant Foreign Supplier Remittance (OCA)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Select Verified Beneficiary
            </label>
            <select
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              className="w-full bg-[#F5F6F8] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900 outline-none focus:border-[#FF6B35]"
            >
              <option value="AWS EMEA SARL (Ireland)">AWS EMEA SARL (Ireland) — Cloud Hosting</option>
              <option value="Munich Server GmbH (Germany)">Munich Server GmbH (Germany) — Datacenter</option>
              <option value="Figma Inc. (United States)">Figma Inc. (United States) — Enterprise Tools</option>
              <option value="Shenzhen Fast Components Ltd (China)">Shenzhen Fast Components Ltd (China) [Caution]</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#F5F6F8] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900 outline-none focus:border-[#FF6B35]"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#F5F6F8] border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 outline-none focus:border-[#FF6B35]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              RBI Purpose Code
            </label>
            <select
              value={purposeCode}
              onChange={(e) => setPurposeCode(e.target.value)}
              className="w-full bg-[#F5F6F8] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900 outline-none focus:border-[#FF6B35]"
            >
              <option value="P0807 — Database & Cloud Hosting Services">P0807 — Cloud Hosting & Software</option>
              <option value="P0802 — Software Consultancy Services">P0802 — Software Consultancy</option>
              <option value="P0102 — Raw Material Import">P0102 — Raw Material Import</option>
              <option value="P1006 — Advertising & Marketing Services">P1006 — Advertising & Marketing</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Invoice Ref</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full bg-[#F5F6F8] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900 outline-none focus:border-[#FF6B35]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Supporting Invoice PDF</label>
              <div className="bg-[#F5F6F8] border border-dashed border-gray-300 rounded-xl px-3 py-2 text-[11px] text-gray-500 flex items-center justify-between">
                <span className="truncate">{fileName}</span>
                <Upload className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </div>
            </div>
          </div>

          {/* Maker-Checker & Compliance Badge */}
          <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Maker-Checker Approval: Ravi Sharma (Authorized Owner) active session</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitted}
            className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all cursor-pointer ${
              isSubmitted
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white'
            }`}
          >
            {isSubmitted ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Outbound Transfer Scheduled!</span>
              </span>
            ) : (
              <span>Initiate Outbound Payment</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
