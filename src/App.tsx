import { useState } from 'react';
import { Header } from './components/Header';
import { TotalBalanceCard } from './components/TotalBalanceCard';
import { StatsGrid } from './components/StatsGrid';
import { LineChartCard } from './components/LineChartCard';
import { SpendingLimitCard } from './components/SpendingLimitCard';
import { ActivePoolCard } from './components/ActivePoolCard';
import { RecentActivitiesTable } from './components/RecentActivitiesTable';

import { ProofGraphModal } from './components/modals/ProofGraphModal';
import { FXQuoteModal } from './components/modals/FXQuoteModal';
import { PoolingNettingModal } from './components/modals/PoolingNettingModal';
import { TransferModal } from './components/modals/TransferModal';
import { RequestModal } from './components/modals/RequestModal';

import {
  INITIAL_WALLETS,
  STAT_CARDS,
  CHART_DATA,
  INITIAL_TRANSACTIONS,
  MOCK_POOL_DATA
} from './data/mockData';
import type { Transaction, FXQuote, FXPool, CurrencyCode } from './types';

export function App() {
  // Application State
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'INR'>('USD');
  const [wallets, setWallets] = useState(INITIAL_WALLETS);
  const [stats, setStats] = useState(STAT_CARDS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [poolData, setPoolData] = useState<FXPool>(MOCK_POOL_DATA);

  // Modal States
  const [selectedTxnForProof, setSelectedTxnForProof] = useState<Transaction | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isPoolModalOpen, setIsPoolModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Toggle Global Currency between USD ($) and INR (₹)
  const handleToggleCurrency = () => {
    setCurrencyMode((prev) => (prev === 'USD' ? 'INR' : 'USD'));
  };

  // Quick Notification Handler: Open Flagged Fraud Transaction
  const handleOpenProofAlert = () => {
    const alertTxn = transactions.find((t) => t.status === 'Blocked') || transactions[0];
    setSelectedTxnForProof(alertTxn);
  };

  // Handle New Outbound Payment Submission
  const handleAddOutboundPayment = (newTxn: Partial<Transaction>) => {
    const fullTxn = newTxn as Transaction;
    setTransactions((prev) => [fullTxn, ...prev]);
  };

  // Handle New Inbound Request Submission
  const handleAddInboundRequest = (newTxn: Partial<Transaction>) => {
    const fullTxn = newTxn as Transaction;
    setTransactions((prev) => [fullTxn, ...prev]);
  };

  // Handle Joining Active FX Pool
  const handleJoinPool = (amount: number) => {
    setPoolData((prev) => ({
      ...prev,
      participantsCount: prev.participantsCount + 1,
      grossVolume: prev.grossVolume + amount,
      externalVolume: prev.externalVolume + Math.round(amount * 0.8),
      nettedVolume: prev.nettedVolume + Math.round(amount * 0.2),
    }));

    // Update stats card for pooled volume
    setStats((prev) =>
      prev.map((s) =>
        s.id === 'pooled-savings'
          ? {
              ...s,
              value: `$${((poolData.grossVolume + amount) / 1000).toFixed(1)}K`,
              subValue: 'Netting saved ₹2.12L',
            }
          : s
      )
    );
  };

  // Handle Quote Conversion Execution
  const handleExecuteConversion = (quote: FXQuote, mode: 'IMMEDIATE' | 'POOLED') => {
    setIsQuoteModalOpen(false);

    if (mode === 'POOLED') {
      handleJoinPool(quote.amount);
      setIsPoolModalOpen(true);
    } else {
      // Immediate conversion transaction
      const newTxn: Transaction = {
        id: `BPFX-CONV-${Date.now().toString().slice(-4)}`,
        orderId: `#ORD-${Date.now().toString().slice(-4)}`,
        invoiceId: `CONV-${quote.quoteId}`,
        activity: `Immediate ${quote.sourceCurrency} → INR Conversion`,
        counterparty: 'Wholesale Partner Bank',
        counterpartyCountry: 'India',
        type: 'POOLED_CONVERSION',
        direction: 'in',
        amount: quote.amount,
        currency: quote.sourceCurrency,
        priceFormatted: `+$${quote.amount.toLocaleString()}.00`,
        inrAmount: quote.finalINR,
        inrFormatted: `₹${quote.finalINR.toLocaleString()}.00`,
        status: 'Completed',
        date: 'Just now',
        purposeCode: 'FX-CONV-DIRECT',
        proofGraph: {
          trustScore: 99,
          proofStatus: 'VERIFIED',
          layers: {
            intent: {
              name: 'Intent Proof',
              status: 'PASS',
              summary: 'Customer conversion order accepted at guaranteed rate',
              details: [`Rate: ₹${quote.offeredRate}`, `Amount: ${quote.sourceCurrency} ${quote.amount}`],
            },
            money: {
              name: 'Money Movement Proof',
              status: 'PASS',
              summary: 'Debited currency wallet; credited INR operational account',
              details: ['Instant settlement executed'],
            },
            identity: {
              name: 'Identity & Sanctions Proof',
              status: 'PASS',
              summary: 'Internal wallet transfer KYC verified',
              details: ['CLEARED'],
            },
            settlement: {
              name: 'Settlement Proof',
              status: 'PASS',
              summary: 'RTGS credit confirmed to linked current account',
              details: ['Advice ref: ADV-9901'],
            },
            ledger: {
              name: 'Double-Entry Ledger Proof',
              status: 'PASS',
              summary: 'Balanced currency position journal',
              details: ['JRNL-FX-CONV balanced'],
            },
            compliance: {
              name: 'Compliance Proof',
              status: 'PASS',
              summary: 'RBI Master Direction compliant conversion',
              details: ['Zero hidden spread fee'],
            },
          },
          ledgerEntries: [
            { account: 'USD Inward Collection Account', credit: `$${quote.amount.toLocaleString()}.00`, currency: quote.sourceCurrency },
            { account: 'INR Operational Account', debit: `₹${quote.finalINR.toLocaleString()}.00`, currency: 'INR' },
          ],
        },
      };

      setTransactions((prev) => [newTxn, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] font-outfit text-zinc-900 pb-16">
      {/* Top Navigation Bar with Explicit INR Toggle */}
      <Header
        currencyMode={currencyMode}
        onToggleCurrency={handleToggleCurrency}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onOpenPool={() => setIsPoolModalOpen(true)}
        onOpenProofAlert={handleOpenProofAlert}
      />

      {/* Main 12-Column Dashboard Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        {/* ============================================================== */}
        {/* TOP SECTION: Header / Hero (12-Column Grid)                   */}
        {/* ============================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Total Balance Card (lg:col-span-4) with Currency Switcher Button */}
          <TotalBalanceCard
            wallets={wallets}
            currencyMode={currencyMode}
            onToggleCurrency={handleToggleCurrency}
            onTransferClick={() => setIsTransferModalOpen(true)}
            onRequestClick={() => setIsRequestModalOpen(true)}
            onWalletSelect={(curr: CurrencyCode) => {
              setWallets((prev) =>
                prev.map((w) => (w.currency === curr ? { ...w, active: true } : w))
              );
            }}
          />

          {/* Earning and Stats Grid (lg:col-span-3) */}
          <StatsGrid
            stats={stats}
            currencyMode={currencyMode}
            onCardClick={(id) => {
              if (id === 'pooled-savings') setIsPoolModalOpen(true);
            }}
          />

          {/* Smooth Line Chart Section (lg:col-span-5) */}
          <LineChartCard data={CHART_DATA} />
        </section>

        {/* ============================================================== */}
        {/* BOTTOM SECTION: Sidebar & Recent Activities (12-Column Grid)   */}
        {/* ============================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Vertical Sidebar Section (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            {/* Top: Monthly Outward Remittance Quota with progress-stripe bar */}
            <SpendingLimitCard
              spent={18450}
              limit={25000}
              currencySymbol="$"
              currencyMode={currencyMode}
            />

            {/* Bottom: Active FX Netting Clearinghouse card (Replaces Credit Card) */}
            <ActivePoolCard
              poolData={poolData}
              currencyMode={currencyMode}
              onOpenPoolModal={() => setIsPoolModalOpen(true)}
            />
          </div>

          {/* Recent Activities Table (lg:col-span-8) */}
          <RecentActivitiesTable
            transactions={transactions}
            currencyMode={currencyMode}
            onSelectTransaction={(txn) => setSelectedTxnForProof(txn)}
          />
        </section>
      </main>

      {/* ============================================================== */}
      {/* INTERACTIVE WORKFLOW MODALS                                    */}
      {/* ============================================================== */}

      {/* 1. Transaction Proof Graph & Anti-Fraud Inspection Modal */}
      <ProofGraphModal
        transaction={selectedTxnForProof}
        onClose={() => setSelectedTxnForProof(null)}
      />

      {/* 2. Transparent FX Quote Engine Modal */}
      <FXQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onExecuteConversion={handleExecuteConversion}
      />

      {/* 3. Pooled FX & Netting Engine Clearing House Modal */}
      <PoolingNettingModal
        isOpen={isPoolModalOpen}
        poolData={poolData}
        onClose={() => setIsPoolModalOpen(false)}
        onJoinPool={handleJoinPool}
      />

      {/* 4. Outbound Supplier Payment / Transfer Modal */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onSubmitTransfer={handleAddOutboundPayment}
      />

      {/* 5. Inbound Collection Request / Virtual Account Modal */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmitRequest={handleAddInboundRequest}
      />
    </div>
  );
}

export default App;
