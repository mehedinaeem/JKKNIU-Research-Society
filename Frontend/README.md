# JKKNIU Research Society Frontend

A professional, fully responsive React + Vite frontend for the JKKNIU Research Society website. This project demonstrates a modern, academic-focused user interface with comprehensive features for a research organization.

## 🎯 Project Overview

This is a **frontend-only** project designed to showcase a professional research society website. It includes all necessary pages and components for a research institution's web presence, ready for future backend integration.

**Tech Stack:**
- React 18 with TypeScript
- Vite (build tool)
- React Router v6 (navigation)
- Tailwind CSS (styling)
- Lucide React (icons)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Main navigation bar with responsive design
│   └── Footer.tsx          # Footer with links and contact information
├── pages/
│   ├── Home.tsx            # Landing page with hero and highlights
│   ├── About.tsx           # Organization mission, vision, and history
│   ├── ResearchAreas.tsx   # Research disciplines and focus areas
│   ├── Events.tsx          # Upcoming events and past event highlights
│   ├── Publications.tsx    # Research papers and publication database
│   ├── News.tsx            # News and announcements
│   ├── AdvisoryBoard.tsx   # Advisory board members and roles
│   ├── Team.tsx            # Organization team and departments
│   ├── Membership.tsx      # Membership types and benefits
│   ├── Contact.tsx         # Contact form and information
│   └── Login.tsx           # Authentication page (frontend only)
├── App.tsx                 # Main app with routing
├── main.tsx                # Entry point with React Router setup
└── index.css               # Global styles and Tailwind imports
```

## 🚀 Features

### Pages & Functionality

1. **Home Page** ✨
   - Hero section with research-focused messaging
   - Mission/Vision overview
   - Research areas highlights (4 main categories)
   - Statistics dashboard (500+ researchers, 200+ publications, etc.)
   - Recent events carousel
   - Latest publications feed
   - Call-to-action buttons

2. **About Us** 📖
   - Organization history and timeline
   - Mission and vision statements
   - Core values (Excellence, Collaboration, Innovation, Impact)
   - Key achievements and milestones

3. **Research Areas** 🔬
   - 6 research domains with detailed descriptions
   - Focus areas for each discipline
   - Research leads and contacts
   - Research process flowchart

4. **Events** 📅
   - Upcoming events with registration info
   - Past events archive
   - Event filters and search
   - Event categories (Conference, Workshop, Symposium, etc.)

5. **Publications** 📚
   - Featured and recent publications
   - Publication database with search
   - Citation metrics and impact
   - DOI and PDF download options

6. **News & Announcements** 📢
   - Featured news stories
   - All news feed
   - Categories and tags
   - Newsletter subscription

7. **Advisory Board** 👔
   - Board member profiles
   - Expertise and affiliations
   - Board responsibilities
   - Meeting information

8. **Our Team** 👥
   - Team member profiles with contact info
   - Department organization
   - Team structure and hierarchy
   - Careers section

9. **Membership** 💳
   - 4 membership types (Student, Faculty, Associate, Institutional)
   - Membership benefits overview
   - Pricing and requirements
   - Application process
   - FAQ section

10. **Contact** 📞
    - Contact form with validation
    - Multiple contact methods
    - Department directory
    - Office hours
    - Embedded map placeholder

11. **Login** 🔐
    - Professional login interface
    - Email and password fields
    - Remember me option
    - Password reset link (placeholder)
    - Demo notice about backend integration

### Responsive Design
- Mobile-first approach
- Fully responsive across all breakpoints
- Desktop, tablet, and mobile optimized
- Touch-friendly navigation
- Adaptive grid layouts

### User Experience
- Smooth scrolling navigation
- Hover effects and transitions
- Loading states
- Form validation
- Accessible color contrasts
- Clean typography hierarchy

## 🎨 Design System

### Color Palette
- **Primary**: Sky Blue (#0ea5e9) - Used for CTAs, links, highlights
- **Secondary**: Slate (#64748b) - Used for text and backgrounds
- **Accent**: Red (#ef4444) - Used for highlights and alerts

### Typography
- **Font**: Inter (sans-serif)
- **Sizes**: Responsive heading scales (h1-h6)
- **Weight**: 400 (normal), 600 (semibold), 700 (bold)

### Components
- Button variants (primary, secondary)
- Card layouts
- Section padding and spacing
- Icon integration with Lucide React

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "tailwindcss": "^3.3.6",
  "typescript": "^5.2.2",
  "vite": "^5.0.8"
}
```

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The app runs on `http://localhost:5173` by default.

## 📊 Dummy Data

All pages include **static dummy data** for:
- Research areas and focus topics
- Events (past and upcoming)
- Publications with citations
- News and announcements
- Team members and advisory board
- Testimonials and statistics

No backend API calls are currently implemented.

## 🔄 Future Backend Integration

This project is structured for easy Django REST API integration:

### Planned API Endpoints
```
GET    /api/research-areas/
GET    /api/events/
GET    /api/publications/
GET    /api/team-members/
GET    /api/news/
POST   /api/contact/
POST   /api/membership/applications/
POST   /api/auth/login/
GET    /api/auth/user/
```

### Environment Setup
Create a `.env` file for backend URL:
```
VITE_API_URL=http://localhost:8000/api
```

## 📝 Usage Notes

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `App.tsx`
3. Update navigation in `Navbar.tsx`

### Customizing Styles
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Use CSS variables for consistent theming

### Form Handling
Forms currently show demo notifications. Integrate with:
- Form validation libraries (React Hook Form, Formik)
- Backend API calls
- Error handling and feedback

## 🎯 Best Practices Implemented

✅ Component-based architecture  
✅ TypeScript for type safety  
✅ Responsive design with Tailwind  
✅ Clean folder structure  
✅ Reusable components (Navbar, Footer)  
✅ Accessible color contrasts  
✅ Mobile-first approach  
✅ SEO-friendly structure  
✅ Performance optimized  
✅ Maintainable code  

## 📱 Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Focus states on interactive elements
- Form labels associated with inputs

## 🚀 Deployment

The project can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

Build command:
```bash
npm run build
```

Output: `dist/` folder (static files)

## 📄 License

This project is created for JKKNIU Research Society.

## 👥 Contact

For questions or support:
- Email: research@jkkniu.edu.bd
- Phone: +880-1712-345678
- Website: www.jkkniu.edu.bd

---

**Note**: This is a frontend prototype. Backend authentication, API integration, and database connectivity will be implemented in future phases using Django REST Framework.
