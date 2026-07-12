# 🩸 LifeLink

LifeLink is a modern blood donor discovery platform designed to help people find recently available blood donors by blood group and location.

The platform focuses on donor availability, privacy, and secure contact requests. Donor phone numbers are not displayed publicly. A requester must send a contact request before receiving private donor information.

---

## 🌐 Live Demo

**Live Website:
**GitHub Repository:

---

## 📌 Project Overview

During a medical emergency, finding the correct blood donor quickly can be difficult.

Many existing donor lists contain outdated information, unavailable donors, or publicly exposed phone numbers. LifeLink attempts to solve these problems by prioritizing recently confirmed donors and protecting their private contact information.

---

## ✨ Core Features

- Search donors by blood group
- Search donors by district and area
- Filter donors by availability
- Sort donors by recent confirmation
- View detailed donor profiles
- See previous donation information
- Send contact requests to donors
- Protected donor phone numbers
- Responsive design for mobile and desktop
- Login and registration interfaces
- Donor profile management interface
- FAQ and donation safety information

---

## 🔐 Privacy-Focused Contact System

LifeLink does not publicly display donor phone numbers.

The contact process works like this:

1. A user searches for a donor.
2. The user opens the donor profile.
3. The user submits a contact request.
4. The donor reviews the request.
5. Contact information is shared only after approval.

> The current frontend version simulates this interaction. Backend integration will be added later.

---

## 🛠️ Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React Icons
- Next.js App Router

### Planned Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation

---

## 📄 Available Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Main landing page |
| Find Donors | `/donors` | Search and filter donors |
| Donor Details | `/donors/[donorId]` | Dynamic donor profile |
| Login | `/login` | User login interface |
| Register | `/register` | Account registration |
| Donor Profile | `/dashboard/donor-profile` | Donor profile management |

---

##  Homepage Sections

The homepage includes:

- Hero section
- Donor search panel
- Recently available donors
- Blood group directory
- How LifeLink works
- Availability confirmation explanation
- Platform statistics
- Responsible donation guidelines
- Success stories
- Frequently asked questions
- Footer

---

## 🔎 Donor Search

Users can filter donors using:

- Name
- Blood group
- District
- Area
- Availability status
- Recently confirmed status

