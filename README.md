# 🩸 LifeLink

LifeLink is a responsive blood donor discovery frontend built with Next.js. It helps users search for donors by blood group, location, and availability, view donor profiles, and submit privacy-focused contact requests.

> **Project status:** Frontend MVP. Donor data is currently stored as mock data, while login, registration, and contact-request submissions are UI simulations.

## 🔗 Project Links

- **Live Site:** [https://life-link-cyan-two.vercel.app]
- **Public GitHub Repository:** [https://github.com/raselahmed2023/Life-Link]

##  Implemented Features

- Responsive landing page with reusable sections
- Responsive navigation bar and footer
- Recently available donor cards
- Blood-group-based donor navigation
- Search donors by name, district, or area
- Filter donors by blood group, district, and availability
- Sort donors by recent confirmation, newest listing, or donation count
- Dynamic donor details pages
- Donor availability and donation-history information
- Privacy-focused contact request form
- Login page interface
- Become-a-donor registration page interface
- FAQ, donation-safety, platform-statistics, and success-story sections
- Mobile, tablet, and desktop responsive layouts

##  Main User Flow

1. Open the homepage.
2. Select **Find Donors** from the navigation bar.
3. Search or filter donors by blood group, district, area, or availability.
4. Open a donor profile using **View Details**.
5. Review the donor's profile and submit a contact request.

##  Available Routes

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page and platform overview |
| Find Donors | `/donors` | Search, filter, and sort donors |
| Donor Details | `/donors/[donorId]` | Dynamic donor profile and contact request form |
| Login | `/login` | Login interface |
| Become a Donor | `/register` | Donor registration interface |

Example donor routes:

```text
/donors/nusrat-jahan
/donors/kamrul-hasan
```

Example filtered URL:

```text
/donors?bloodGroup=O%2B&district=Dhaka&available=true&sort=recent
```

##  Technology Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide React**
- **React Icons**
- **Next.js App Router**

##  Project Structure

```text
Life-Link/
├── src/
│   ├── app/
│   │   ├── donors/
│   │   │   ├── [donorId]/page.tsx
│   │   │   └── page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── donors/
│   │   ├── home/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── data/
│   │   └── donors.ts
│   └── types/
│       └── donor.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

##  Run Locally

### Prerequisites

Install the following before starting:

- Node.js
- npm
- Git

### 1. Clone the public repository

```bash
git clone https://github.com/raselahmed2023/Life-Link.git
```

### 2. Enter the project folder

```bash
cd Life-Link
```

### 3. Install dependencies

For a normal local setup:

```bash
npm install
```

For an installation that follows `package-lock.json` exactly:

```bash
npm ci
```

Use only one of the two installation commands.

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

```text
http://localhost:3000
```

No environment variables are currently required.

> The project uses Google-hosted Geist fonts and remote images, so an internet connection is required during the first development or production build and while loading those remote assets.

##  Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

##  Run the Production Build Locally

```bash
npm run build
npm run start
```

Then open:

```text
http://localhost:3000
```

##  Privacy Approach

LifeLink does not display donor phone numbers publicly. The donor-details page provides a contact-request form containing:

- Patient name
- Hospital or location
- Urgency level

In the current frontend MVP, submission is simulated and no request is stored in a database.

##  Medical Disclaimer

LifeLink is a donor discovery and communication interface. It does not conduct medical screening, verify blood compatibility, determine donation eligibility, or replace certified hospitals and healthcare professionals. Blood collection and transfusion must be handled by qualified medical professionals or authorized blood banks.