# Quick Court - Sports Venue Booking Platform

A comprehensive full-stack web application that connects sports enthusiasts with venue owners, providing a seamless booking experience for sports facilities. Built with modern technologies and designed for scalability.

## 🚀 Live Demo
🔗 **Quick Court is live here:** [https://your-deployed-link.com](https://quick-court-mx6r.onrender.com/)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)

## Project Overview

Quick Court is a sports venue booking platform that serves three distinct user roles:

| Role | Description | Key Capabilities |
|------|-------------|------------------|
| **Users (Sports Enthusiasts)** | End users who book venues | Browse venues, make bookings, view history, rate venues |
| **Venue Owners** | Facility managers | Create listings, manage bookings, track revenue, analytics |
| **Administrators** | Platform managers | User management, venue approval, system reports |

## Features

### Core Functionality

| Feature Category | Description |
|------------------|-------------|
| **Authentication & Security** | JWT-based auth, role-based access, email verification with OTP, password encryption |
| **Venue Management** | Multi-court support, detailed venue info, availability management, Google Maps integration |
| **Booking System** | Real-time availability, time slot booking, automatic pricing, status tracking |
| **Payment & Transactions** | Payment tracking, booking confirmation, revenue reporting, transaction history |
| **Rating & Reviews** | 5-star rating system, user reviews, rating analytics |
| **Analytics & Reporting** | Booking analytics, revenue reports, user activity tracking |
| **User Interface** | Responsive design, modern UI, interactive charts, image galleries |

## Technology Stack

### Backend Technologies

| Component | Technology | Purpose |
|-----------|------------|---------|
| Runtime | Node.js | Server environment |
| Framework | Express.js | Web application framework |
| Database | MongoDB with Mongoose | Data storage and ODM |
| Authentication | JWT | Secure token-based authentication |
| File Upload | Multer with Cloudinary | Image handling and cloud storage |
| Email | Nodemailer | Email notifications |
| Security | bcryptjs | Password hashing |
| CORS | cors | Cross-origin resource sharing |

### Frontend Technologies

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | React 19 with Vite | UI framework and build tool |
| Routing | React Router DOM | Client-side routing |
| Styling | Tailwind CSS | Utility-first CSS framework |
| HTTP Client | Axios | API communication |
| Charts | Chart.js with react-chartjs-2 | Data visualization |
| Icons | Lucide React | Icon library |
| Carousel | React Slick | Image carousel component |

### External Services

| Service | Purpose |
|---------|---------|
| Cloudinary | Image uploads and management |
| Nodemailer | Email service |
| Google Maps | Location and mapping |

## Project Structure

```
quick-court/
├── backend/                 # Backend API server
│   ├── config/             # Configuration files
│   │   ├── cloudinary.js   # Cloudinary setup
│   │   └── db.js          # Database connection
│   ├── controllers/        # Route controllers
│   │   ├── booking.js     # Booking logic
│   │   ├── rating.js      # Rating system
│   │   ├── sport.js       # Sports management
│   │   ├── user.js        # User operations
│   │   └── venue.js       # Venue management
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js        # Authentication middleware
│   │   └── upload.js      # File upload handling
│   ├── models/            # MongoDB schemas
│   │   ├── booking.js     # Booking model
│   │   ├── rating.js      # Rating model
│   │   ├── sport.js       # Sport model
│   │   ├── user.js        # User model
│   │   └── venue.js       # Venue model
│   ├── routes/            # API routes
│   │   ├── bookingRoutes.js
│   │   ├── index.js       # Main router
│   │   ├── ratingRoutes.js
│   │   ├── sportRoutes.js
│   │   ├── userRoutes.js
│   │   └── venueRoutes.js
│   ├── utils/             # Utility functions
│   │   └── helper.js
│   ├── package.json
│   └── server.js          # Main server file
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OwnerAdminRoute.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── AddVenue.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminManagement.jsx
│   │   │   ├── AdminSports.jsx
│   │   │   ├── AllVenues.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OtpVerification.jsx
│   │   │   ├── OwnerDashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── UpdateVenue.jsx
│   │   │   └── VenueDetails.jsx
│   │   ├── assets/        # Static assets
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # App entry point
│   │   └── helper.js      # Frontend utilities
│   ├── package.json
│   └── vite.config.js     # Vite configuration
└── README.md
```

## Installation & Setup

### Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Node.js | v16 or higher | Runtime environment |
| MongoDB | Latest | Database |
| npm/yarn | Latest | Package manager |

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quick-court/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

### Application URLs

| Component | URL |
|-----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |

## Usage Guide

### For Users

| Action | Steps |
|--------|-------|
| **Registration & Login** | Sign up → Verify email with OTP → Login |
| **Browsing Venues** | View venues → Filter by sport/location → View details |
| **Making Bookings** | Select venue → Choose date/time → Confirm payment |
| **Managing Bookings** | View history → Cancel if needed → Rate venues |

### For Venue Owners

| Action | Steps |
|--------|-------|
| **Venue Registration** | Create account → Add venue details → Submit for approval |
| **Venue Management** | Update info → Manage availability → Set pricing |
| **Booking Management** | View bookings → Track revenue → Manage confirmations |

### For Administrators

| Action | Steps |
|--------|-------|
| **User Management** | View users → Approve venues → Monitor activity |
| **Platform Management** | Manage sports → Generate reports → Monitor performance |

## API Documentation

### Authentication & User Management

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/users/register` | POST | Send registration OTP | Public |
| `/api/users/verify-otp` | POST | Verify registration OTP | Public |
| `/api/users/login` | POST | User login | Public |
| `/api/users/logout` | POST | User logout | Public |
| `/api/users/forgot-password` | POST | Forgot password | Public |
| `/api/users/me` | GET | Get current user profile | Protected |
| `/api/users/me/update` | PUT | Update current user profile | Protected |

### User Management (Admin Only)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users` | GET | Get all users |
| `/api/users/stats/admin` | GET | Get admin statistics |
| `/api/users` | POST | Create new user |
| `/api/users/:userId` | GET | Get user by ID |
| `/api/users/:userId` | PUT | Update user |
| `/api/users/:userId` | DELETE | Delete user |
| `/api/users/:userId/toggle-ban` | POST | Toggle user ban status |

### Venue Management

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/venues` | GET | Get all venues | Public |
| `/api/venues/search` | GET | Search venues | Public |
| `/api/venues/availability` | GET | Check venue availability | Public |
| `/api/venues/my` | GET | Get my venues | Owner |
| `/api/venues/:venueId` | GET | Get venue by ID | Public |
| `/api/venues/createVenue` | POST | Create new venue | Owner/Admin |
| `/api/venues/:venueId` | PUT | Update venue | Owner/Admin |
| `/api/venues/:venueId` | DELETE | Delete venue | Owner/Admin |
| `/api/venues/:venueId/toggle-availability` | POST | Toggle venue availability | Owner |
| `/api/venues/:venueId/ratings` | GET | Get venue ratings | Public |

### Venue Management (Admin Only)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/venues/:venueId/approve` | POST | Approve venue |
| `/api/venues/:venueId/reject` | POST | Reject venue |
| `/api/venues/:venueId/ban` | POST | Toggle venue ban status |

### Booking Management

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/bookings` | POST | Create new booking | User |
| `/api/bookings/me` | GET | Get my bookings | User |
| `/api/bookings/owner` | GET | Get owner bookings | Owner |
| `/api/bookings` | GET | Get all bookings | Admin |
| `/api/bookings/:id` | PUT | Update booking | User |
| `/api/bookings/:id` | DELETE | Cancel booking | User |
| `/api/bookings/:bookingId/cancel` | POST | Owner cancel booking | Owner |

### Booking Management (Admin Only)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bookings/:id/status` | PUT | Update booking status |

### Rating & Reviews

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/ratings` | POST | Add venue rating | User |
| `/api/ratings/:ratingId` | PUT | Update rating | User |
| `/api/ratings/:ratingId` | DELETE | Delete rating | User |

### Sports Management

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/sports` | GET | Get all sports | Public |
| `/api/sports/:id` | GET | Get sport by ID | Public |

### Sports Management (Admin Only)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sports/addSport` | POST | Create new sport |
| `/api/sports/:id` | PUT | Update sport |
| `/api/sports/:id` | DELETE | Delete sport |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Quick Court** - Making sports venue booking simple and efficient!

