
# 🩸 LifeLink

LifeLink is a responsive full-stack blood donor connection platform built to help users find available blood donors, create blood requests, and connect safely through an approval-based contact system.

The project was originally created for the Deep Web Studio Build-A-Thon Challenge and has since been extended with a real backend, database, authentication, donor management, blood request management, and admin functionality.

## Live Links

- **Live Site:** https://life-link-cyan-two.vercel.app
- **Frontend Repository:** https://github.com/raselahmed2023/Life-Link
- **Backend Repository:** https://github.com/raselahmed2023/lifelink-server
- **Backend API:** https://lifelink-server-pct2.onrender.com

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected user dashboard
- Role-based access for User and Admin
- Logout functionality

### Donor Management

- Become a donor
- Create donor profile
- Edit donor profile
- Toggle donor availability
- Browse available donors
- Search and filter donors by blood group and location
- View dynamic donor details

### Blood Requests

- Create blood requests
- View approved public blood requests
- Track personal blood requests
- Admin can approve, reject, and complete blood requests

### Contact Requests

- Send contact requests to donors
- Donors can accept or reject requests
- Donor contact information remains private before approval
- Approved requests reveal donor contact information
- Users can view incoming and outgoing contact requests

### User Dashboard

- View profile information
- Edit profile
- View donor status
- Edit donor profile
- Toggle donor availability
- Create and track blood requests
- Manage contact requests

### Admin Dashboard

- View platform overview
- Manage users
- Block and unblock users
- View donors
- Deactivate donor profiles
- Manage blood request status
- Monitor contact request activity

### UI/UX

- Responsive navbar and footer
- Mobile, tablet, and desktop responsive design
- Reusable modals
- Custom heart loader
- Framer Motion animations
- Animated homepage sections
- FAQ accordion
- Blood donation safety section

## Technologies

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Icons

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Neon Database
- Prisma ORM
- JWT
- bcrypt
- CORS
- dotenv

## Local Setup

### 1. Clone the frontend repository

```bash
git clone https://github.com/raselahmed2023/Life-Link.git
cd Life-Link
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env.local` file in the frontend project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For the deployed frontend, use the Render backend URL:

```env
NEXT_PUBLIC_API_URL=https://lifelink-server-pct2.onrender.com
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

Creates an optimized production build.

```bash
npm run start
```

Runs the production build.

## Main Routes

| Page            | Route               |
| --------------- | ------------------- |
| Home            | `/`                 |
| Find Donors     | `/donors`           |
| Donor Details   | `/donors/[donorId]` |
| Blood Requests  | `/blood-requests`   |
| Become a Donor  | `/become-donor`     |
| User Dashboard  | `/dashboard`        |
| Admin Dashboard | `/admin`            |
| Login           | `/login`            |
| Register        | `/register`         |

## Privacy Flow

LifeLink keeps donor contact information private until a donor approves a contact request.

```text
Find Donor
   ↓
Send Contact Request
   ↓
Donor Accepts or Rejects
   ↓
If Approved
   ↓
Contact Information Becomes Available
```

## Deployment

### Frontend

The frontend is deployed on **Vercel**.

```text
https://life-link-cyan-two.vercel.app
```

### Backend

The backend is deployed on **Render**.

```text
https://lifelink-server-pct2.onrender.com
```

### Database

The project uses **PostgreSQL hosted on Neon**.

## Current Project Scope

LifeLink is now a full-stack application.

* Real donor data is loaded from the backend API
* Authentication is connected to the backend
* PostgreSQL database is connected through Prisma ORM
* Contact requests use real API endpoints
* Blood requests use real API endpoints
* Donor availability and profile editing are dynamic
* Admin controls are connected to backend services
* Donor phone numbers and email addresses are not displayed publicly

## Author

Developed as part of the LifeLink blood donor platform project.




