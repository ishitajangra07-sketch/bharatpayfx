import React, { useState } from 'react';
import { X, ArrowDownLeft, Copy, Check, ShieldCheck, Building2, Globe } from 'lucide-react';
import { Transaction } from '../../types';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (newTxn: Partial<Transaction>) => void;
}

export const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  onSubmitRequest,
}) => {
  const [clientName, setClientName] = useState('Acme Technologies Inc. (US)');
  const [amount, setAmount] = useState('10000');
  const [currency, setCurrency] = useState('USD');
  const [purposeCode, setPurposeCode] = useState('P0802 — Software Consultancy Services');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2293');
  const [createdStep, setCreatedStep] = useState<'FORM' | 'GENERATED'>('FORM');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedToken = `BPFX-${invoiceNumber}-7K29`;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount) || 5000;
    const inrRate = 87.87;
    const inr = Math.round(numAmount * inrRate);

    onSubmitRequest({
      id: generatedToken,
      orderId: `#ORD-${Date.now().toString().slice(-4)}`,
      invoiceId: invoiceNumber,
      activity: `${clientName.split(' ')[0]} Export Collection`,
      counterparty: clientName,
      counterpartyCountry: 'United States',
      type: 'INBOUND_COLLECTION',
      direction: 'in',
      amount: numAmount,
      currency: currency as any,
      priceFormatted: `+$${numAmount.toLocaleString()}.00`,
      inrAmount: inr,
      inrFormatted: `₹${inr.toLocaleString()}.00`,
      status: 'Pending',
      date: 'Just now',
      purposeCode,
      virtualAccountRef: generatedToken,
      proofGraph: {
        trustScore: 88,
        proofStatus: 'PARTIALLY_VERIFIED',
        layers: {
          intent: {
            name: 'Intent Proof',
            status: 'PASS',
            summary: `Export Invoice ${invoiceNumber} created and registered in Document Vault`,
            details: [`Client: ${clientName}`, `Token: ${generatedToken}`]
          },
          money: {
            name: 'Money Movement Proof',
            status: 'WARNING',
            summary: 'Virtual Account active; awaiting overseas wire deposit',
            details: ['Routing: Fedwire / SWIFT MT103 direct']
          },
          identity: {
            name: 'Identity & Sanctions Proof',
            status: 'PASS',
            summary: 'Indian Exporter & US Client KYC verified',
            details: ['Sanctions check: CLEARED']
          },
          settlement: {
            name: 'Settlement Proof',
            status: 'WARNING',
            summary: 'Pending arrival of client wire',
            details: ['Will auto-match on reference token']
          },
          ledger: {
            name: 'Double-Entry Ledger Proof',
            status: 'PASS',
            summary: 'Unearned export receivables ledger prepared',
            details: ['Balanced draft journal']
          },
          compliance: {
            name: 'Compliance Proof',
            status: 'PASS',
            summary: 'Purpose Code P0802 compliant under RBI PA-CB guidelines',
            details: ['Gross realization ready for EDPMS']
          }
        },
        ledgerEntries: [
          { account: 'USD Inward Receivable', debit: `$${numAmount.toLocaleString()}.00`, currency },
          { account: 'Export Sales Revenue', credit: `$${numAmount.toLocaleString()}.00`, currency }
        ]
      }
    });

    setCreatedStep('GENERATED');
  };

  const handleCopyInstructions = () => {
    const text = `Wire Payment Instructions:\nBeneficiary: Ravi Tech Solutions Pvt Ltd / BharatPayFX ICA\nBank: AD Category-I Partner Bank\nVirtual Account No: 880291039812\nSWIFT: BPFXINBBXXX\nMandatory Reference: ${generatedToken}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center">
              <ArrowDownLeft className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                {createdStep === 'FORM' ? 'Create Inward Collection Request' : 'Virtual Receiving Account Generated'}
              </h3>
              <p className="text-xs text-gray-400">
                Inward Collection Account (ICA) with Deterministic Token
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

        {/* Content */}
        {createdStep === 'FORM' ? (
          <form onSubmit={handleCreate} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Foreign Client
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#F5F6F8] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900 outline-none focus:border-[#FF6B35]"
                required
              />
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full bg-[#F5F6F8] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900 outline-none focus:border-[#FF6B35]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Purpose Code</label>
                <select
                  value={purposeCode}
                  onChange={(e) => setPurposeCode(e.target.value)}
                  className="w-full bg-[#F5F6F8] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900 outline-none focus:border-[#FF6B35]"
                >
                  <option value="P0802 — Software Consultancy Services">P0802 — Software & IT</option>
                  <option value="P0803 — Data Processing Services">P0803 — Data Processing</option>
                  <option value="P1006 — Digital Marketing Services">P1006 — Digital Marketing</option>
                  <option value="P0101 — Physical Goods Export">P0101 — Goods Export</option>
                </select>
              </div>
            </div>

            <div className="bg-[#F5F6F8] p-3 rounded-2xl text-xs text-gray-600 space-y-1">
              <div className="font-semibold text-zinc-900">Deterministic Token Mapping:</div>
              <p className="text-[11px] text-gray-500 font-mono">
                Will generate reference <span className="font-bold text-[#FF6B35]">{generatedToken}</span> for automated zero-break reconciliation.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#FF6B35] hover:bg-[#FA581C] text-white font-semibold text-sm shadow-md shadow-orange-500/20 cursor-pointer transition-all"
            >
              Generate Virtual Collection Instructions
            </button>
          </form>
        ) : (
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <div className="flex items-center gap-2 font-bold mb-1 text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Virtual Receiving Account Ready</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Share these instructions with <strong>{clientName}</strong>. Payments will automatically match and notify you via webhook.
              </p>
            </div>

            {/* Instruction details */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-[#F5F6F8] space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Beneficiary Name:</span>
                <span className="font-semibold text-zinc-900">Ravi Tech Solutions Pvt Ltd / BharatPayFX ICA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Partner Bank:</span>
                <span className="font-semibold text-zinc-900">AD Category-I Partner Bank</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Virtual Account Number:</span>
                <span className="font-mono font-bold text-zinc-900">880291039812</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">SWIFT / BIC:</span>
                <span className="font-mono font-bold text-zinc-900">BPFXINBBXXX</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                <span className="text-gray-700 font-bold">Mandatory Payment Memo:</span>
                <span className="font-mono font-bold text-[#FF6B35] bg-white px-2 py-0.5 rounded-lg border border-orange-200">
                  {generatedToken}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyInstructions}
                className="flex-1 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Instructions Copied!' : 'Copy Payment Instructions'}</span>
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-zinc-900 font-semibold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
