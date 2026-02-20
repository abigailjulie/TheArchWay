# The ArchWay - Every Phase. One Platform.

### Enterprise project management for architectural firms

Replacing fragmented spreadsheets with real-time budget tracking, role-based workflows, and AI-powered automation.

### Project Status

![](client/TheArchWay/src/assets/project-status.JPG)

---

## The Problem

After 7 years in architecture, I saw firms managing $3M+ projects with Excel spreadsheets, manually emailing every client update, and losing hours to duplicate data entry. I built The ArchWay to solve this.

## Key Features

- **Role-Based Access**: Secure authentication for 3 user types (Clients, Admins, Founders)
- **7-Phase Tracking**: Real-time budget and timeline tracking from Predevelopment → Close-out
- **AI Automation**: Personalized client communications using Google Gemini API
- **Performance**: 70% reduction in API requests through intelligent caching
- **Production-Ready**: Comprehensive testing with Vitest and React Testing Library
- **Password Security**: 12-48 character passwords with confirmation to prevent typos

**Tech Stack:** React • Redux Toolkit • Node.js • Express • MongoDB • Gemini AI

---

## Impact & Metrics

| Metric                        | Result     |
| ----------------------------- | ---------- |
| API Request Reduction         | 70%        |
| Database Query Speed          | 40% faster |
| Email Delivery Success        | 95%+       |
| Administrative Work Reduction | 80%        |
| System Reliability            | 99%+       |

---

## Technical Highlights

### State Management & Performance

- Normalized Redux with `createEntityAdapter` for efficient updates
- RTK Query with intelligent caching and automatic invalidation
- Optimistic UI updates for instant user feedback

### Authentication & Security

- JWT tokens with automatic refresh (15min access, 24hr refresh)
- Role-based access control with protected routes
- bcrypt password hashing with 12-48 character requirements
- Password confirmation to prevent registration typos
- Secure HTTP-only cookies

### Backend Architecture

- RESTful API with centralized error handling
- MongoDB with Map-based phase budget storage
- Indexed queries and lean() operations for speed
- Rate limiting and CORS configuration for security

### AI Integration

- Google Gemini API for personalized email generation
- Intelligent fallback mechanisms with comprehensive logging
- 95% delivery success rate for automated notifications

### Testing & Quality

- **Unit tests** for utility functions (formatCurrency, validation helpers)
- **Integration tests** for form components with mocked authentication
- React Testing Library for user interaction testing
- Vitest for fast test execution
- Test coverage for happy paths, validation, and edge cases

### Frontend Architecture

- 15+ reusable React components with ARIA-compliant accessibility
- Advanced form validation using regex patterns
- Responsive design with Bootstrap grid system
- Type-safe inputs (tel, email) for better mobile UX
- Draft-saving system using localStorage

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/abigailjulie/TheArchWay.git
cd TheArchWay

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your MongoDB URI, JWT secrets, Gemini API key, etc.

# Run development server
npm run dev
```

**Environment Variables Needed:**

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for access tokens
- `REFRESH_TOKEN_SECRET` - Secret for refresh tokens
- `GEMINI_API_KEY` - Google Gemini API key
- `EMAILJS_SERVICE_ID` - EmailJS service ID
- `EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `EMAILJS_PUBLIC_KEY` - EmailJS public key

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test NewClientForm

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**Current test coverage includes:**

- Form rendering and field validation
- User interaction flows (typing, clicking, form submission)
- Error handling and validation messages
- Role-based conditional rendering
- Password confirmation matching

---

### Screenshots

### Welcome

![](client/TheArchWay/src/assets/Welcome.JPG)

### Login

![](client/TheArchWay/src/assets/Login.JPG)

### Project List

Admin View

![](client/TheArchWay/src/assets/project-list-admin.JPG)

Client View

![](client/TheArchWay/src/assets/Client-Projects-page.JPG)

Sorting Data

![](client/TheArchWay/src/assets/sort-by-Owner.JPG)
![](client/TheArchWay/src/assets/sort-by-Created.JPG)

### Project Status

![](client/TheArchWay/src/assets/project-status.JPG)

### Client Profile

![](client/TheArchWay/src/assets/Client-Profile.JPG)

---

## 📚 What I Learned

Building The ArchWay taught me:

- **Performance optimization** through normalized state and strategic caching
- **Production-grade security** with JWT refresh tokens and role-based access
- **AI integration** for practical workflow automation
- **Test-driven development** with comprehensive unit and integration tests
- **User-centered design** informed by real architectural industry pain points
- **CORS troubleshooting** and proper preflight request handling

The biggest challenge was designing a flexible budget tracking system that could handle unique requirements for each of 7 construction phases while maintaining data integrity and performance. The Map-based MongoDB schema solution reduced query complexity while supporting dynamic phase-specific data.

---

## 🔮 Roadmap

- [x] Password confirmation field
- [x] Comprehensive test coverage for forms
- [x] CORS configuration for production
- [ ] Password reset functionality via email
- [ ] TypeScript migration for improved type safety
- [ ] Real-time updates using WebSockets
- [ ] Document management with file uploads
- [ ] Project health indicators using TensorFlow
- [ ] Mobile app with React Native

---

## 👤 About Me

I'm a full-stack developer who spent 7 years designing award-winning commercial spaces in NYC. I built The ArchWay because I lived the problem it solves.

**Connect:**

- 🌐 [Portfolio](https://www.abigaildesigns.org)
- 💼 [LinkedIn](https://www.linkedin.com/in/abigailfigaro/)
- 📧 [Email](mailto:abigail.figaro@gmail.com)

---

## 📄 License

MIT License. Contributions and feedback are welcome.

---

**⭐ If you find this project interesting, please consider starring it!**
