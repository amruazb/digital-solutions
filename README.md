# Interact Typing Center - Enquiry Flow System

A modern Next.js application for managing typing center services, customer enquiries, and business operations in the UAE.

## 🚀 Features

- **Customer Portal**: Service tracking, enquiry submission, and account management
- **Admin Dashboard**: Comprehensive management system for enquiries, staff, and services
- **Staff Portal**: Task management and service processing
- **Service Tracking**: Real-time status updates and progress tracking
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui
- **API Routes**: Backend functionality with Next.js API routes

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Backend**: Next.js API routes (ready for database integration)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── enquiries/     # Enquiry management
│   │   └── tracking/      # Service tracking
│   ├── admin/             # Admin pages
│   ├── customer/          # Customer pages
│   ├── staff/             # Staff pages
│   ├── services/          # Service pages
│   ├── track-service/     # Tracking page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── admin/            # Admin-specific components
│   └── workHistory/      # Work history components
├── data/                 # Mock data and constants
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd typing-center-enquiry-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Pages

### Public Pages
- **Home** (`/`) - Landing page with services overview
- **Services** (`/services`) - Detailed service offerings
- **Track Service** (`/track-service`) - Service status tracking

### Authentication Pages
- **Admin Login** (`/admin/login`) - Admin authentication
- **Customer Login** (`/customer/login`) - Customer authentication
- **Staff Login** (`/staff/login`) - Staff authentication

### Admin Pages
- **Dashboard** (`/admin/dashboard`) - Admin overview and analytics
- **Enquiries** (`/admin/enquiries`) - Manage customer enquiries
- **Assignments** (`/admin/assignments`) - Task assignment management
- **Staff** (`/admin/staff`) - Staff management
- **Settings** (`/admin/settings`) - System configuration

### Customer Pages
- **Dashboard** (`/customer/dashboard`) - Customer overview
- **Service History** - Track past and current services

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication

### Enquiries
- `GET /api/enquiries` - Get all enquiries (with filtering/pagination)
- `POST /api/enquiries` - Create new enquiry

### Tracking
- `GET /api/tracking/[id]` - Get tracking information
- `PUT /api/tracking/[id]` - Update tracking status

## 🎨 Customization

### Adding New Services
1. Update the services data in `src/data/services.ts`
2. Add corresponding UI components
3. Update API routes if needed

### Styling
- The project uses Tailwind CSS for styling
- shadcn/ui components are used for consistent UI
- Custom styles can be added in `src/app/globals.css`

### Database Integration
The current implementation uses mock data. To integrate with a real database:

1. **Choose a database** (PostgreSQL, MongoDB, etc.)
2. **Install database client** (Prisma, Drizzle, etc.)
3. **Update API routes** to use database queries
4. **Add environment variables** for database connection

Example with Prisma:
```bash
npm install prisma @prisma/client
npx prisma init
```

## 🔒 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your-database-url"

# Authentication
JWT_SECRET="your-jwt-secret"
NEXTAUTH_SECRET="your-nextauth-secret"

# Email (for notifications)
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-password"
```

## 📦 Build and Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deployment Options
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Self-hosted** with Node.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 TODO

### Backend Implementation
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication with JWT
- [ ] File upload for documents
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Payment integration

### Frontend Enhancements
- [ ] Real-time updates with WebSocket
- [ ] Advanced filtering and search
- [ ] Export functionality (PDF, Excel)
- [ ] Multi-language support
- [ ] Dark mode theme

### Features
- [ ] Customer registration
- [ ] Staff performance analytics
- [ ] Automated reminders
- [ ] Service templates
- [ ] Bulk operations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@interacttyping.ae
- Phone: +971 123 456 789
- Office Hours: Sunday - Thursday, 8:00 AM - 6:00 PM

---

**Interact Typing Center** - Your trusted partner for all typing, documentation, and business services in the UAE.
