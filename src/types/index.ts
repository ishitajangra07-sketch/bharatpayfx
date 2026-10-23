export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED' | 'SGD';

export interface WalletItem {
  currency: CurrencyCode;
  balance: number;
  symbol: string;
  flag: string;
  active: boolean;
  inrEquivalent: number;
}

export interface StatCardItem {
  id: string;
  title: string;
  value: string;
  subValue?: string;
  trend: string;
  isPositive: boolean;
  icon: string;
  isGradient?: boolean;
}

export interface ChartPoint {
  month: string;
  profit: number; // Y scale: 10 - 50 (representing $10k - $50k)
  loss: number;   // Y scale: 10 - 50
  rawProfit: number;
  rawLoss: number;
}

export interface CardItem {
  id: string;
  variant: 'dark' | 'gradient';
  cardholder: string;
  cardNumberMasked: string;
  expiry: string;
  cvv: string;
  limit: number;
  spent: number;
  currency: string;
  status: 'ACTIVE' | 'LOCKED';
}

export interface ProofLayer {
  name: string;
  status: 'PASS' | 'WARNING' | 'FAIL';
  summary: string;
  details: string[];
}

export interface TransactionProofGraph {
  trustScore: number;
  proofStatus: 'VERIFIED' | 'PARTIALLY_VERIFIED' | 'UNVERIFIED' | 'BLOCKED';
  riskReasons?: string[];
  layers: {
    intent: ProofLayer;
    money: ProofLayer;
    identity: ProofLayer;
    settlement: ProofLayer;
    ledger: ProofLayer;
    compliance: ProofLayer;
  };
  ledgerEntries: {
    account: string;
    debit?: string;
    credit?: string;
    currency: string;
  }[];
}

export interface Transaction {
  id: string;
  orderId: string;
  invoiceId: string;
  activity: string;
  counterparty: string;
  counterpartyCountry: string;
  type: 'INBOUND_COLLECTION' | 'OUTBOUND_PAYMENT' | 'POOLED_CONVERSION';
  direction: 'in' | 'out';
  amount: number;
  currency: CurrencyCode;
  priceFormatted: string;
  inrAmount: number;
  inrFormatted: string;
  status: 'Completed' | 'Pending' | 'In Progress' | 'Blocked';
  date: string;
  purposeCode: string;
  virtualAccountRef?: string;
  proofGraph: TransactionProofGraph;
}

export interface FXQuote {
  quoteId: string;
  sourceCurrency: CurrencyCode;
  destCurrency: CurrencyCode;
  amount: number;
  midMarketRate: number;
  offeredRate: number;
  pooledRate: number;
  spread: number;
  platformFee: number;
  partnerFee: number;
  finalINR: number;
  individualINR: number;
  savingsINR: number;
  expiresInSec: number;
  poolId: string;
}

export interface FXPool {
  poolId: string;
  currencyPair: string;
  cutoffTime: string;
  participantsCount: number;
  grossVolume: number;
  nettedVolume: number;
  externalVolume: number;
  status: 'OPEN' | 'CLOSING' | 'NETTING' | 'EXECUTED' | 'SETTLED';
  poolRate: number;
  individualRate: number;
  savingsEstimateINR: number;
}
