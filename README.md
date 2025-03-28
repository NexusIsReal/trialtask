# User Management Web Application

A modern web application with user authentication, dashboard, and profile management using Next.js and Supabase.

## Features

- **User Authentication**: Login and registration functionality
- **User Dashboard**: Display user information and statistics
- **Profile Management**: Edit profile information
- **API Access**: RESTful API endpoints for user data
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Authentication
- **State Management**: Zustand
- **Form Handling**: React Hook Form, Zod for validation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy the `.env.local.example` file to `.env.local` and fill in your Supabase credentials.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/              # Next.js app router
│   ├── api/          # API routes
│   ├── dashboard/    # Dashboard page
│   └── profile/      # Profile page
├── components/       # React components
│   ├── auth/         # Authentication components
│   ├── dashboard/    # Dashboard components
│   ├── navigation/   # Navigation components
│   ├── profile/      # Profile components
│   ├── providers/    # Context providers
│   └── ui/           # UI components
└── lib/              # Utility functions
    ├── auth.ts       # Authentication utility
    ├── supabase.ts   # Supabase client
    └── utils.ts      # General utilities
```

## Deployment

This application can be easily deployed to Vercel or any other hosting platform that supports Next.js.

## License

This project is for demonstration purposes only.
#   t r i a l t a s k  
 