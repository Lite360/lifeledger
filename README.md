# LifeLedger NG

> **Know what you own. Remember what it needs. Protect its value.**

LifeLedger NG is a household asset and maintenance management platform built specifically for Nigerian households and businesses. It helps users organize appliances, electronics, solar systems, and generators, preserve receipts, track warranties, schedule maintenance intervals, and log repair costs in one reliable place.

---

## 🟢 Visual Identity & Design System

The application uses an emerald and warm-ivory visual identity:

- **Forest Green (`#123D2D`)**: Brand surfaces, sidebar, primary headers
- **Primary Emerald (`#16845B`)**: Primary call-to-actions, active links
- **Soft Sage (`#E4F0E8`)**: Subtle accents, status badges, highlighted states
- **Warm Ivory (`#FAF8F1`)**: Application background
- **Card Surface (`#FFFFFF`)**: Interactive containers and forms
- **Charcoal (`#252B27`)**: High-contrast readable body typography
- **Muted Grey (`#747C76`)**: Helper copy and secondary labels

---

## 🛠 Technology Stack

- **Frontend**: Vue 3 (Composition API) + Vite
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4 (HTML5 History Mode)
- **Icons**: Lucide Vue
- **Testing**: Vitest + Vue Test Utils + jsdom
- **Backend (Phase 2+)**: Supabase Auth, PostgreSQL with Row Level Security (RLS), Supabase Storage
- **Deployment**: Vercel Serverless

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18+` (or `v20+`)
- npm `v9+`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/lifeledger-ng.git
cd lifeledger-ng

# Install dependencies
npm install
```

### 3. Local Development
```bash
# Start local Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 4. Running Automated Tests
```bash
# Run unit and component test suites with Vitest
npm run test
```

### 5. Production Build
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
lifeledger/
├── docs/                # Architecture, PRD, and database specifications
├── public/              # Static assets and icons
├── src/
│   ├── assets/          # Project visual assets
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Navbar, Footer, Sidebar, Header, Badge, DemoBanner
│   │   └── assets/      # AddAssetModal, etc.
│   ├── composables/     # useAuth, etc.
│   ├── layouts/         # PublicLayout, AppLayout
│   ├── pages/
│   │   ├── public/      # Landing, How It Works, Pricing, Help, Privacy, Terms
│   │   ├── auth/        # Login, Register, Forgot Password, Verify Email
│   │   ├── dashboard/   # Dashboard overview
│   │   ├── assets/      # Asset register
│   │   ├── warranties/  # Warranty tracker
│   │   ├── maintenance/ # Scheduled tasks
│   │   ├── expenses/    # Repair expenses
│   │   └── settings/    # Profile & household settings
│   ├── router/          # Vue Router route map
│   ├── services/        # Demo sample data and API clients
│   ├── styles/          # Tailwind base & custom components
│   └── utils/           # Formatters (currency, dates, warranty calculators)
├── tests/
│   └── unit/            # Vitest unit & component specs
├── .env.example         # Documented environment variables template
├── tailwind.config.js   # Design tokens & color system
├── vercel.json          # Deployment & routing rewrites
└── vite.config.js       # Vite configuration with path aliases
```

---

## 📄 License & Compliance
LifeLedger NG is built with NDPR (Nigeria Data Protection Regulation) compliance standards in mind. All uploaded documents are planned for encrypted private buckets with Row Level Security.
