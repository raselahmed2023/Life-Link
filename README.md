# 🩸 LifeLink

LifeLink is a responsive blood donor discovery web application built for the Deep Web Studio Build-A-Thon Challenge.

It helps users find blood donors by blood group, location, and availability while keeping donor contact information private.

## Live Links

- **Live Site:** https://life-link-cyan-two.vercel.app
- **GitHub Repository:** https://github.com/raselahmed2023/Life-Link

## Features

- Search donors by name, area, and district
- Filter by blood group and availability
- Sort by recent confirmation and donation count
- View dynamic donor profiles
- Send a contact request
- Responsive navbar and footer
- Login page UI
- Become a Donor registration UI
- FAQ and donation safety sections
- Mobile and desktop responsive design

## Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Icons

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/raselahmed2023/Life-Link.git
```

### 2. Open the project folder

```bash
cd Life-Link
```

### 3. Install all required packages

Packages must be installed before running the project.

```bash
npm install
```

This command installs all dependencies from `package.json`, including:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Icons

If the icon packages are missing, install them manually:

```bash
npm install lucide-react react-icons
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open the application

```text
http://localhost:3000
```

## Available Commands

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production build.

```bash
npm run lint
```

Checks code-quality issues.

## Main Routes

| Page | Route |
|---|---|
| Home | `/` |
| Find Donors | `/donors` |
| Donor Details | `/donors/[donorId]` |
| Login | `/login` |
| Become a Donor | `/register` |

## Current Project Scope

This project is currently a frontend MVP.

- Donor information uses mock data
- Login and registration are UI only
- Contact requests are simulated
- No backend or database is connected
- Donor phone numbers are not publicly displayed



