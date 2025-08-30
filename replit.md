# Firebase Auth App - Mobile First

## Overview

This is a mobile-first React application with Firebase authentication and user profile management. The app features a clean, modern interface built with React, TypeScript, and Tailwind CSS, following a mobile-first design approach. It includes user authentication (login/register), profile management, and a responsive UI with bottom navigation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context for authentication state, TanStack Query for server state management
- **UI Components**: Comprehensive shadcn/ui component system with Radix UI primitives
- **Mobile-First Design**: Bottom navigation pattern optimized for mobile devices

### Backend Architecture (Minimal)
- **Server**: Express.js with TypeScript for API endpoints
- **Database Layer**: Drizzle ORM configured for PostgreSQL with schema management
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Development Server**: Vite integration for hot module replacement and development tooling

### Authentication System
- **Provider**: Firebase Authentication for secure user management
- **Storage**: Firestore for user profile data
- **Features**: Email/password authentication, Google Sign-In, profile updates, password changes, password reset
- **Context**: React Context API for global authentication state management
- **Google Integration**: Popup-based Google OAuth with automatic profile creation

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: User table with id, username, and password fields
- **Migrations**: Drizzle Kit for database schema management
- **Environment**: Database URL configuration through environment variables

### Component Architecture
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Layout**: Mobile-first responsive design with bottom navigation
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Protected Routes**: Route guards for authenticated content
- **Toast Notifications**: Radix UI Toast system for user feedback

### Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **TypeScript**: Strict type checking with path mapping for clean imports
- **Code Organization**: Modular structure with shared components and utilities
- **Development Server**: Hot reload with error overlay for development experience

## External Dependencies

### Authentication & Database
- **Firebase**: Authentication (Email/Password + Google Sign-In) and Firestore for user management and profile storage
- **Neon Database**: PostgreSQL database service (configured via DATABASE_URL)
- **Drizzle ORM**: Type-safe database operations with PostgreSQL

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: Pre-built accessible component library
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Icon library for consistent iconography

### Development & Build
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and developer experience
- **React Hook Form**: Form handling with validation
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing solution

### Utilities
- **Zod**: Schema validation for forms and data
- **date-fns**: Date manipulation utilities
- **clsx/tailwind-merge**: Conditional CSS class management
- **nanoid**: Unique ID generation