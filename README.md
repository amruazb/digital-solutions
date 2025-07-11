# UAE Digital Solutions - Typing Center Enquiry Flow System

A comprehensive web-based platform designed to streamline and digitize the entire service enquiry and management process for typing centers operating in the UAE. This system serves multiple user types including customers, staff, and administrators, providing a complete solution for service requests, tracking, and management.

## 🚀 Features

### Customer Portal
- **Service Discovery**: Browse and search through comprehensive service catalog
- **Multi-step Enquiry Forms**: Intuitive forms with document upload capabilities
- **Real-time Tracking**: Track service progress with status updates
- **Customer Dashboard**: Manage documents, services, and personal information
- **WhatsApp Integration**: Direct communication with service staff

### Staff Portal
- **Service Management**: Handle assigned service requests efficiently
- **Document Processing**: Access and process customer documents
- **Status Updates**: Update service progress and communicate with customers
- **Workload Management**: Manage and prioritize tasks

### Admin Portal
- **Analytics Dashboard**: Real-time performance metrics and insights
- **Staff Management**: Assign tasks, monitor performance, and manage workload
- **Service Configuration**: Manage service catalog, pricing, and workflows
- **Customer Management**: Track customer history and manage renewals
- **Financial Reporting**: Revenue tracking and financial analytics

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: [Shadcn/ui](https://ui.shadcn.com/) components
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Notifications**: Sonner

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern web browser

## 🚀 Quick Start

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

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── auth/           # Authentication components
│   ├── ui/             # Shadcn/ui components
│   └── workHistory/    # Work history components
├── data/               # Mock data and service configurations
│   ├── services/       # Service-specific data
│   └── mockData/       # Mock data for development
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## 🎯 Service Categories

### Document Typing Services
- Consent & Authorization Letters
- Employment Letters
- Resignation Letters
- Termination Letters
- Custom Immigration Letters
- Legal Document Typing

### Business Setup & PRO Services
- Trade License Applications
- Company Formation
- MOA Drafting & Renewal
- Partner Addition/Removal
- Business License Renewal
- Company Liquidation

### Visa & Immigration Services
- Family Visa Applications
- Visa Renewals & Cancellations
- NOC for Sponsoring
- Maid Visa Processing
- Change of Status
- Travel Permits for Minors

### Driving License Services
- Golden Chance Booking
- New License Applications
- Eye Test Appointments
- Traffic File Transfers
- Driving Class Booking
- Foreign License Translation

### Attestation Services
- Birth Certificate Attestation
- Degree Certificate Attestation
- Marriage Certificate Attestation
- MOFA Attestation
- Embassy Attestations
- Police Clearance Certificates

### Health Insurance Services
- New Daman Applications
- Insurance Renewals
- DHA/HAAD Registrations
- Medical Insurance
- Investor Insurance
- Family Medical Coverage

## 🔐 Authentication & Authorization

The system implements role-based access control with three main user types:

### Customer Access
- Service browsing and booking
- Document upload and management
- Service tracking and history
- Profile management

### Staff Access
- Assigned service management
- Document processing
- Customer communication
- Status updates

### Admin Access
- Full system administration
- Analytics and reporting
- Staff management
- Service configuration

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with desktop optimization
- **Accessibility**: WCAG 2.1 AA compliance
- **Modern UI**: Clean, intuitive interface using Shadcn/ui
- **Dark/Light Mode**: Theme switching capability
- **Loading States**: Smooth loading animations
- **Error Handling**: Comprehensive error states and user feedback

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_WHATSAPP_NUMBER=your_whatsapp_number
VITE_APP_NAME=UAE Digital Solutions
```

### Service Configuration

Services can be configured in `src/data/services/`:
- `documentTyping.ts` - Document typing services
- `businessSetup.ts` - Business setup services
- `visaServices.ts` - Visa and immigration services
- `drivingLicense.ts` - Driving license services
- `otherServices.ts` - Other miscellaneous services

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 📊 Performance

- **Page Load Time**: < 3 seconds
- **API Response Time**: < 500ms
- **Bundle Size**: Optimized with Vite
- **Image Optimization**: Automatic optimization
- **Caching**: Efficient caching strategies

## 🔒 Security

- **Authentication**: Secure login/logout flows
- **Authorization**: Role-based access control
- **Data Protection**: Secure data handling
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: Built-in React security features

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Analytics & Monitoring

- **Performance Monitoring**: Built-in performance tracking
- **Error Tracking**: Comprehensive error logging
- **User Analytics**: User behavior tracking
- **Service Metrics**: Service performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Structure
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow Shadcn/ui component patterns
- Use proper error boundaries

### State Management
- Use React Context for global state
- Use local state for component-specific data
- Implement proper loading and error states

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Deployment Options
- **Vercel**: Recommended for React applications
- **Netlify**: Great for static sites
- **AWS S3**: For static hosting
- **Docker**: For containerized deployment

## 📞 Support

For support and questions:
- **Email**: support@uaedigitalsolutions.com
- **WhatsApp**: +971-XX-XXX-XXXX
- **Documentation**: [Link to documentation]

## 📄 License

This project is proprietary software developed for UAE Digital Solutions.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the excellent UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Vite](https://vitejs.dev/) for the fast build tool

## 📋 Changelog

### Version 1.0.0 (January 2024)
- Initial release
- Complete customer, staff, and admin portals
- Service management system
- Document upload and tracking
- WhatsApp integration
- Responsive design
- Comprehensive service catalog

---

**Built with ❤️ for UAE Digital Solutions**
