# BharatPayFX — Cross-Border FX & Treasury Platform for Indian MSMEs

BharatPayFX is an orchestration and treasury platform designed specifically for Indian small exporters, importers, agencies, and SaaS businesses. It aggregates cross-border currency flows, enables peer netting with 0% bank spread, delivers transparent mid-market FX quotes, and enforces a cryptographic 6-layer **Transaction Proof Graph** to prevent invoice fraud and unauthorized capital flight under RBI PA-CB guidelines.

---

## 🌟 Key Features

### 1. Modern Fintech Dashboard (Design Spec)
- **High-Radius Card Grid**: 32px rounded primary cards (`rounded-[32px]`) with subtle `card-shadow` and glassmorphic micro-elements.
- **Outfit Typography**: Wide-set Google Font 'Outfit' (400, 500, 600, 700).
- **Smooth Bezier Line Chart**: SVG area chart using organic cubic bezier (`C`) commands, exactly 5 horizontal grid lines, dual paths (Profit in blue `#3B82F6`, Outflow in dashed Zinc-900 `#18181B`), and circular interactive vertex nodes.
- **Animated Progress Stripe Bar**: Diagonal 45-degree moving stripe overlay (`.progress-stripe`) for the monthly outward remittance quota.

### 2. Dual Currency Engine (USD ⇄ INR Toggle)
- 1-click **"Change to INR (₹)"** button in the header and Total Balance card.
- Automatically calculates and toggles balances, stats, quotas, and transaction history between USD and Indian Rupee (`₹`) in Lakhs and Crores.

### 3. FX Netting & Pooling Clearinghouse
- Real-time aggregation of participant flows (`POOL-USD-INR-20261023-001`).
- Internally nets opposite flows (e.g. IT service export receipts vs cloud infrastructure vendor payouts) with **0% bank spread**.
- External residual volume routed to Authorized Dealer (AD) Category-I bank wholesale trading desks.

### 4. 6-Layer Transaction Proof Graph (Anti-Fraud Core)
Every financial transaction is provably linked across 6 layers:
1. **Intent Proof**: Multi-currency invoices, PO hashes, and contract SOWs.
2. **Money Movement Proof**: SWIFT MT103 / Fedwire tracking with deterministic tokens (`BPFX-INV-XXXX`).
3. **Identity & Sanctions Proof**: Exporter PAN/GSTIN, Signatory Aadhaar e-KYC, and OFAC/UN sanctions clearance.
4. **Settlement Proof**: AD-I Bank e-FIRC generation and RTGS account credit.
5. **Double-Entry Ledger Proof**: Balanced sub-ledgers (0 variance) for segregated funds.
6. **Compliance Proof**: Purpose code verification (e.g. P0802 IT Services, P0102 Raw Materials, P0807 Cloud Hosting) under RBI Master Direction.
- **Dynamic Trust Score (0–100)**: Flags anomalies, cooling-off violations, and altered PDF hashes.

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Animations**: CSS Keyframes + Canvas Confetti
- **Typography**: Google Fonts (Outfit)

---

## 🛠️ Local Development

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd bharatpayfx
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
bharatpayfx/
├── src/
│   ├── components/
│   │   ├── modals/
│   │   │   ├── FXQuoteModal.tsx         # Live rate calculator & lock timer
│   │   │   ├── PoolingNettingModal.tsx  # Clearinghouse netting batch execution
│   │   │   ├── ProofGraphModal.tsx      # 6-layer anti-fraud proof graph & ledger
│   │   │   ├── RequestModal.tsx         # Inbound ICA collection & token generator
│   │   │   └── TransferModal.tsx        # Outbound OCA vendor payout
│   │   ├── ActivePoolCard.tsx           # Netting clearinghouse widget
│   │   ├── Header.tsx                   # Top bar with currency switcher
│   │   ├── LineChartCard.tsx            # Smooth cubic-bezier SVG line chart
│   │   ├── RecentActivitiesTable.tsx    # Transaction ledger table with proof links
│   │   ├── SpendingLimitCard.tsx        # Outward quota with diagonal progress stripes
│   │   ├── StatsGrid.tsx                # 2x2 stats cards (with gradient top-left)
│   │   └── TotalBalanceCard.tsx         # Total balance, INR toggle & ICA wallets
│   ├── data/
│   │   └── mockData.ts                  # Synthetic MSME transactions & pools
│   ├── types/
│   │   └── index.ts                     # TypeScript definitions
│   ├── utils/
│   │   └── chartUtils.ts                # Cubic-bezier SVG path calculation
│   ├── App.tsx                          # Main dashboard container
│   ├── index.css                        # Tailwind & custom stripe animations
│   └── main.tsx
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## ⚖️ Regulatory Positioning
BharatPayFX acts as an orchestration, workflow, and compliance intelligence layer on top of RBI-authorized Payment Aggregator–Cross Border (PA-CB) and Authorized Dealer (AD) Category-I banking partners.
