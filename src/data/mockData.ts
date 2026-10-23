import { WalletItem, StatCardItem, ChartPoint, CardItem, Transaction, FXPool } from '../types';

export const INITIAL_WALLETS: WalletItem[] = [
  {
    currency: 'USD',
    balance: 412850.00,
    symbol: '$',
    flag: '🇺🇸',
    active: true,
    inrEquivalent: 36248230.00,
  },
  {
    currency: 'EUR',
    balance: 148200.00,
    symbol: '€',
    flag: '🇪🇺',
    active: true,
    inrEquivalent: 13782600.00,
  },
  {
    currency: 'GBP',
    balance: 98322.00,
    symbol: '£',
    flag: '🇬🇧',
    active: false,
    inrEquivalent: 10834046.00,
  },
];

export const STAT_CARDS: StatCardItem[] = [
  {
    id: 'pooled-savings',
    title: 'Pooled FX Volume',
    value: '$142.5K',
    subValue: 'Netting saved ₹1.84L',
    trend: '+18.4% this month',
    isPositive: true,
    icon: 'Layers',
    isGradient: true, // MUST be gradient background (orange-500 to orange-400) with white text
  },
  {
    id: 'inbound-collections',
    title: 'Active Receivables',
    value: '$84,200',
    trend: '+12% vs last month',
    isPositive: true,
    icon: 'ArrowDownLeft',
    isGradient: false,
  },
  {
    id: 'outbound-payouts',
    title: 'Vendor Payouts',
    value: '$31,850',
    trend: '-4.2% vs last month',
    isPositive: false,
    icon: 'ArrowUpRight',
    isGradient: false,
  },
  {
    id: 'trust-score',
    title: 'Verified Trust Avg',
    value: '98.4%',
    trend: '+2.1% compliance rate',
    isPositive: true,
    icon: 'ShieldCheck',
    isGradient: false,
  },
];

export const CHART_DATA: ChartPoint[] = [
  { month: 'Jan', profit: 18, loss: 12, rawProfit: 18200, rawLoss: 12100 },
  { month: 'Feb', profit: 26, loss: 16, rawProfit: 26400, rawLoss: 16000 },
  { month: 'Mar', profit: 24, loss: 22, rawProfit: 24100, rawLoss: 22400 },
  { month: 'Apr', profit: 34, loss: 19, rawProfit: 34500, rawLoss: 19200 },
  { month: 'May', profit: 31, loss: 28, rawProfit: 31200, rawLoss: 28000 },
  { month: 'Jun', profit: 43, loss: 24, rawProfit: 43800, rawLoss: 24500 },
  { month: 'Jul', profit: 38, loss: 32, rawProfit: 38900, rawLoss: 32100 },
  { month: 'Aug', profit: 48, loss: 27, rawProfit: 48600, rawLoss: 27400 },
];

export const CREDIT_CARDS: CardItem[] = [
  {
    id: 'card-1',
    variant: 'dark',
    cardholder: 'RAVI SHARMA // BHARATPAY FX',
    cardNumberMasked: '5412  8834  9012  8821',
    expiry: '08/29',
    cvv: '942',
    limit: 25000,
    spent: 18450,
    currency: 'USD',
    status: 'ACTIVE',
  },
  {
    id: 'card-2',
    variant: 'gradient',
    cardholder: 'TREASURY CORP // OPEX INTL',
    cardNumberMasked: '5248  9100  3411  4092',
    expiry: '11/30',
    cvv: '128',
    limit: 50000,
    spent: 34200,
    currency: 'USD',
    status: 'ACTIVE',
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'BPFX-INV-2291-8F42A',
    orderId: '#ORD-2291',
    invoiceId: 'INV-2291',
    activity: 'Acme Inc. — Software Dev Services',
    counterparty: 'Acme Technologies Inc. (US)',
    counterpartyCountry: 'United States',
    type: 'INBOUND_COLLECTION',
    direction: 'in',
    amount: 10000.00,
    currency: 'USD',
    priceFormatted: '+$10,000.00',
    inrAmount: 878980.00,
    inrFormatted: '₹8,78,980.00',
    status: 'Completed',
    date: '23 Oct 2026, 15:32',
    purposeCode: 'P0802 — Software Consultancy',
    virtualAccountRef: 'BPFX-INV-2291-8F42A',
    proofGraph: {
      trustScore: 97,
      proofStatus: 'VERIFIED',
      layers: {
        intent: {
          name: 'Intent Proof',
          status: 'PASS',
          summary: 'Invoice INV-2291 matched with client SOW agreement',
          details: [
            'Invoice No: INV-2291 ($10,000.00)',
            'Contract Ref: SOW-2026-US-049',
            'SHA-256 PDF Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            'Issue Date: Oct 14, 2026 | Due: Oct 28, 2026'
          ]
        },
        money: {
          name: 'Money Movement Proof',
          status: 'PASS',
          summary: 'SWIFT MT103 credit webhook matched with partner bank ICA',
          details: [
            'Partner Bank: AD Category-I Partner Bank',
            'SWIFT UETR: 981d3f66-8800-410a-b32c-7b4d139e8f12',
            'Remitter: ACME TECHNOLOGIES INC (DELAWARE, US)',
            'Credit Reference: BPFX-INV-2291-8F42A (Exact Match)'
          ]
        },
        identity: {
          name: 'Identity & Sanctions Proof',
          status: 'PASS',
          summary: 'Both Indian MSME and foreign counterparty fully verified',
          details: [
            'Exporters: Ravi Tech Solutions Pvt Ltd (PAN: AABCR1234F, GSTIN: 27AABCR1234F1Z5)',
            'Signatory: Ravi Sharma (Biometric Aadhaar e-KYC Active)',
            'Payer: Acme Technologies Inc. (US EIN: 82-1984210)',
            'OFAC / UN / RBI Sanctions Screening: CLEARED (0 hits)'
          ]
        },
        settlement: {
          name: 'Settlement & FIRC Proof',
          status: 'PASS',
          summary: 'e-FIRC issued by AD-I Bank and INR credited to HDFC Current Account',
          details: [
            'FIRC Reference: BPFX-FIRC-2026-1023-9912',
            'Settlement Mode: RTGS to Beneficiary A/C **9102',
            'Settled Timestamp: 23 Oct 2026, 15:35:10 IST',
            'EDPMS Reporting: Gross realization logged with RBI'
          ]
        },
        ledger: {
          name: 'Double-Entry Ledger Proof',
          status: 'PASS',
          summary: 'Immutable double-entry journal balanced to ₹0.00 variance',
          details: [
            'Journal Entry ID: JRNL-89412-2026',
            'Debits: USD Receivable / Collection Account ($10,000.00)',
            'Credits: Export Revenue ($10,000.00) & INR Customer Wallet (₹8,78,980.00)',
            'Cryptographic Block Hash: 7a8f902c4b... Verified'
          ]
        },
        compliance: {
          name: 'Regulatory & Purpose Code',
          status: 'PASS',
          summary: 'Complies with RBI Master Direction — External Payments',
          details: [
            'Purpose Code: P0802 (Software Consultancy / IT Services)',
            'PA-CB Framework: Inward Collection Account (ICA) compliant',
            'GST Treatment: Zero-rated Export of Services under LUT (ARN: AD270326001928K)'
          ]
        }
      },
      ledgerEntries: [
        { account: 'USD Collection Account (AD-I Bank)', debit: '$10,000.00', currency: 'USD' },
        { account: 'Export Accounts Receivable', credit: '$10,000.00', currency: 'USD' },
        { account: 'INR Customer Operational Wallet', debit: '₹8,78,980.00', currency: 'INR' },
        { account: 'USD Collection Account (Net External)', credit: '$10,000.00', currency: 'USD' },
        { account: 'Platform Operational Netting Fee', credit: '₹120.00', currency: 'INR' },
      ]
    }
  },
  {
    id: 'BPFX-PAY-8812-4C10D',
    orderId: '#ORD-8812',
    invoiceId: 'SUP-4491',
    activity: 'AWS Cloud Infrastructure — Dublin',
    counterparty: 'Amazon Web Services EMEA SARL',
    counterpartyCountry: 'Ireland',
    type: 'OUTBOUND_PAYMENT',
    direction: 'out',
    amount: 3250.00,
    currency: 'USD',
    priceFormatted: '-$3,250.00',
    inrAmount: 286325.00,
    inrFormatted: '₹2,86,325.00',
    status: 'Completed',
    date: '23 Oct 2026, 11:20',
    purposeCode: 'P0807 — Database & Cloud Hosting Services',
    proofGraph: {
      trustScore: 99,
      proofStatus: 'VERIFIED',
      layers: {
        intent: {
          name: 'Intent Proof',
          status: 'PASS',
          summary: 'Verified monthly recurring cloud infrastructure invoice',
          details: [
            'Invoice No: SUP-4491 ($3,250.00)',
            'Vendor: AWS EMEA SARL (VAT: LU20260796)',
            'Billing Cycle: Sep 2026 Consumption'
          ]
        },
        money: {
          name: 'Money Movement Proof',
          status: 'PASS',
          summary: 'INR funding debit balanced; Outward OCA converted via pool',
          details: [
            'Debit A/C: Indian MSME Current Account',
            'Outward Remittance: SWIFT MT103 sent to Deutsche Bank Frankfurt'
          ]
        },
        identity: {
          name: 'Identity & Sanctions Proof',
          status: 'PASS',
          summary: 'Tier-1 enterprise vendor verified with standard IBAN',
          details: ['Vendor Risk Score: 1/100 (Ultra Low)', 'Sanctions: CLEARED']
        },
        settlement: {
          name: 'Settlement Proof',
          status: 'PASS',
          summary: 'Beneficiary bank advice confirmation received',
          details: ['Beneficiary Credit Acknowledged: 23 Oct 2026']
        },
        ledger: {
          name: 'Double-Entry Ledger Proof',
          status: 'PASS',
          summary: 'Ledger debited INR Expense, credited USD Outward',
          details: ['Balanced double-entry journal JRNL-8812']
        },
        compliance: {
          name: 'Compliance Proof',
          status: 'PASS',
          summary: 'Form 15CA/CB verified for cross-border software royalty',
          details: ['Purpose Code: P0807 (Cloud & Data Hosting)']
        }
      },
      ledgerEntries: [
        { account: 'Software & Infrastructure Expense', debit: '₹2,86,325.00', currency: 'INR' },
        { account: 'INR Funding Ledger', credit: '₹2,86,325.00', currency: 'INR' },
        { account: 'USD Outward Collection Account', credit: '$3,250.00', currency: 'USD' }
      ]
    }
  },
  {
    id: 'BPFX-POOL-2026-001',
    orderId: '#ORD-7740',
    invoiceId: 'POOL-BATCH-01',
    activity: 'Pooled Netting Batch Execution #01',
    counterparty: 'BharatPayFX Liquidity Pool',
    counterpartyCountry: 'India / Multi',
    type: 'POOLED_CONVERSION',
    direction: 'in',
    amount: 14200.00,
    currency: 'USD',
    priceFormatted: '+$14,200.00',
    inrAmount: 1248464.00,
    inrFormatted: '₹12,48,464.00',
    status: 'In Progress',
    date: '23 Oct 2026, 14:45',
    purposeCode: 'FX-POOL-NETTING',
    proofGraph: {
      trustScore: 94,
      proofStatus: 'PARTIALLY_VERIFIED',
      layers: {
        intent: {
          name: 'Intent Proof',
          status: 'PASS',
          summary: 'Aggregated MSME conversion requests verified against invoices',
          details: ['27 Exporters joined pool', 'Gross Volume: $142,000.00']
        },
        money: {
          name: 'Money Movement Proof',
          status: 'PASS',
          summary: 'Netted internal offset calculated ($28,000 netted)',
          details: ['Remaining $114,000 routed to AD-I Bank Wholesale Desk']
        },
        identity: {
          name: 'Identity & Sanctions Proof',
          status: 'PASS',
          summary: 'All 27 participants passed automated KYC & risk tiering',
          details: ['0 flagged entities in batch']
        },
        settlement: {
          name: 'Settlement Proof',
          status: 'WARNING',
          summary: 'Awaiting final RTGS batch confirmation from Clearing House',
          details: ['Cutoff executed at 15:30 IST; allocation underway']
        },
        ledger: {
          name: 'Double-Entry Ledger Proof',
          status: 'PASS',
          summary: 'Escrow clearing sub-ledgers pre-balanced',
          details: ['Rate locked at 87.91 INR/USD']
        },
        compliance: {
          name: 'Compliance Proof',
          status: 'PASS',
          summary: 'Gross reporting batch generated for EDPMS',
          details: ['Each exporter receives distinct regulatory realization record']
        }
      },
      ledgerEntries: [
        { account: 'Pooled Escrow Clearing', debit: '$14,200.00', currency: 'USD' },
        { account: 'INR Participant Settlement Ledger', credit: '₹12,48,464.00', currency: 'INR' }
      ]
    }
  },
  {
    id: 'BPFX-INV-3012-7K19Q',
    orderId: '#ORD-3012',
    invoiceId: 'INV-3012',
    activity: 'GlobalTech Tokyo — UI/UX Retainer',
    counterparty: 'GlobalTech K.K. (Japan)',
    counterpartyCountry: 'Japan',
    type: 'INBOUND_COLLECTION',
    direction: 'in',
    amount: 8500.00,
    currency: 'USD',
    priceFormatted: '+$8,500.00',
    inrAmount: 746895.00,
    inrFormatted: '₹7,46,895.00',
    status: 'Pending',
    date: '22 Oct 2026, 18:14',
    purposeCode: 'P0802 — Software Consultancy',
    virtualAccountRef: 'BPFX-INV-3012-7K19Q',
    proofGraph: {
      trustScore: 82,
      proofStatus: 'PARTIALLY_VERIFIED',
      layers: {
        intent: {
          name: 'Intent Proof',
          status: 'PASS',
          summary: 'Invoice INV-3012 verified with approved client estimate',
          details: ['Invoice: INV-3012 ($8,500.00)']
        },
        money: {
          name: 'Money Movement Proof',
          status: 'WARNING',
          summary: 'Inward wire pending correspondent bank transit',
          details: ['Awaiting MT103 notification from Tokyo correspondent']
        },
        identity: {
          name: 'Identity & Sanctions Proof',
          status: 'PASS',
          summary: 'Client corporate registration verified in Japan',
          details: ['Screening: CLEARED']
        },
        settlement: {
          name: 'Settlement Proof',
          status: 'WARNING',
          summary: 'Settlement pending fund arrival',
          details: ['Virtual account ready to auto-match']
        },
        ledger: {
          name: 'Double-Entry Ledger Proof',
          status: 'PASS',
          summary: 'Draft journal entry prepared',
          details: ['Receivable booked']
        },
        compliance: {
          name: 'Compliance Proof',
          status: 'PASS',
          summary: 'Purpose code P0802 documentation attached',
          details: ['No missing items']
        }
      },
      ledgerEntries: [
        { account: 'Anticipated Inward Collections', debit: '$8,500.00', currency: 'USD' },
        { account: 'Unearned Revenue Reserve', credit: '$8,500.00', currency: 'USD' }
      ]
    }
  },
  {
    id: 'BPFX-ALERT-FRAUD-09',
    orderId: '#ORD-9904',
    invoiceId: 'SUP-SUSPECT-81',
    activity: 'Shenzhen Micro Parts (High Risk Flag)',
    counterparty: 'Shenzhen Fast Components Ltd',
    counterpartyCountry: 'China',
    type: 'OUTBOUND_PAYMENT',
    direction: 'out',
    amount: 18000.00,
    currency: 'USD',
    priceFormatted: '-$18,000.00',
    inrAmount: 1584000.00,
    inrFormatted: '₹15,84,000.00',
    status: 'Blocked',
    date: '21 Oct 2026, 17:05',
    purposeCode: 'P0102 — Raw Material Import',
    proofGraph: {
      trustScore: 22,
      proofStatus: 'BLOCKED',
      riskReasons: [
        'Beneficiary bank account changed 6 minutes prior to payment request',
        'Invoice PDF modified after creation (SHA-256 hash mismatch with original PO)',
        'Payment amount is 4.1x user’s 90-day median transaction size',
        'Payment reference missing expected invoice verification token',
        'Vendor account flagged in industry mule-account surveillance network'
      ],
      layers: {
        intent: {
          name: 'Intent Proof',
          status: 'FAIL',
          summary: 'Invoice hash mismatch; tampering detected in PDF stream',
          details: ['Altered bank routing number detected in PDF text layer']
        },
        money: {
          name: 'Money Movement Proof',
          status: 'FAIL',
          summary: 'Hold enforced before partner bank disbursement',
          details: ['Pre-clearing security interlock tripped']
        },
        identity: {
          name: 'Identity & Sanctions Proof',
          status: 'WARNING',
          summary: 'Beneficiary account cooling-off period violated (0 hrs active)',
          details: ['New beneficiary requires 24h cooling off for payments > $5,000']
        },
        settlement: {
          name: 'Settlement Proof',
          status: 'FAIL',
          summary: 'Blocked by Automated Risk Engine',
          details: ['Funds securely quarantined in INR Operational Wallet']
        },
        ledger: {
          name: 'Double-Entry Ledger Proof',
          status: 'WARNING',
          summary: 'Hold reserve created, no external movement logged',
          details: ['Audit lock enabled']
        },
        compliance: {
          name: 'Compliance Proof',
          status: 'FAIL',
          summary: 'Escalated to Compliance Officer & Owner Approval Queue',
          details: ['Requires dual-signatory verification and fresh CA certificate']
        }
      },
      ledgerEntries: [
        { account: 'Quarantined Outward Escrow', debit: '₹15,84,000.00', currency: 'INR' },
        { account: 'Compliance Risk Reserve', credit: '₹15,84,000.00', currency: 'INR' }
      ]
    }
  },
  {
    id: 'BPFX-INV-4418-2B90X',
    orderId: '#ORD-4418',
    invoiceId: 'INV-4418',
    activity: 'Figma Inc. — Enterprise Plugin Dev',
    counterparty: 'Figma Inc. (San Francisco, US)',
    counterpartyCountry: 'United States',
    type: 'INBOUND_COLLECTION',
    direction: 'in',
    amount: 12500.00,
    currency: 'USD',
    priceFormatted: '+$12,500.00',
    inrAmount: 1098525.00,
    inrFormatted: '₹10,98,525.00',
    status: 'Completed',
    date: '20 Oct 2026, 09:15',
    purposeCode: 'P0802 — Software Consultancy',
    virtualAccountRef: 'BPFX-INV-4418-2B90X',
    proofGraph: {
      trustScore: 98,
      proofStatus: 'VERIFIED',
      layers: {
        intent: {
          name: 'Intent Proof',
          status: 'PASS',
          summary: 'Approved enterprise contract & timesheet verification verified',
          details: ['PO Ref: FIGMA-PO-99120', 'Invoice INV-4418 verified']
        },
        money: {
          name: 'Money Movement Proof',
          status: 'PASS',
          summary: 'Direct Fedwire inward to Inward Collection Account',
          details: ['Received on 20 Oct 2026', 'Exact amount matched']
        },
        identity: {
          name: 'Identity & Sanctions Proof',
          status: 'PASS',
          summary: 'Global tech enterprise verified',
          details: ['Sanctions check: CLEARED']
        },
        settlement: {
          name: 'Settlement Proof',
          status: 'PASS',
          summary: 'e-FIRC issued and stored in Document Vault',
          details: ['FIRC-2026-1020-0041']
        },
        ledger: {
          name: 'Double-Entry Ledger Proof',
          status: 'PASS',
          summary: 'Balanced double-entry journal entries verified',
          details: ['JRNL-9102 balanced']
        },
        compliance: {
          name: 'Compliance Proof',
          status: 'PASS',
          summary: 'Export of services EDPMS compliant',
          details: ['Purpose Code: P0802']
        }
      },
      ledgerEntries: [
        { account: 'USD Inward Collection Account', debit: '$12,500.00', currency: 'USD' },
        { account: 'Export Receivables', credit: '$12,500.00', currency: 'USD' },
        { account: 'INR Operational Wallet', debit: '₹10,98,525.00', currency: 'INR' },
        { account: 'USD Inward Collection Account', credit: '$12,500.00', currency: 'USD' }
      ]
    }
  }
];

export const MOCK_POOL_DATA: FXPool = {
  poolId: 'POOL-USD-INR-20261023-001',
  currencyPair: 'USD -> INR',
  cutoffTime: '15:30 IST (Today)',
  participantsCount: 27,
  grossVolume: 142000,
  nettedVolume: 28000,
  externalVolume: 114000,
  status: 'OPEN',
  poolRate: 87.91,
  individualRate: 87.65,
  savingsEstimateINR: 36960,
};
