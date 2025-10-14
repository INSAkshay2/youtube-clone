# YouTube Clone - AI Agent Instructions

## Project Overview

This is a full-stack YouTube clone with Next.js frontend and Express.js backend.

### Architecture

#### Frontend (Next.js App Router)

- Located in `/Frontend/my-app/`
- Uses App Router pattern with React Server Components
- Key UI components in `/src/components/`
- Global styles and layout in `/src/app/`
- Shared utilities in `/src/lib/`
- Custom hooks in `/src/hooks/`
- Uses Geist font family for consistent typography

#### Backend (Express.js)

- Located in `/Backend/`
- RESTful API with `/api/v1` prefix
- Models:
  - `User`: Handles authentication, profiles with avatar/coverImage (stored on Cloudinary)
  - `Video`: Main content model (referenced in User's watchHistory)
  - `Subscription`: Manages user subscriptions
- Middleware:
  - Authentication (`auth.middleware.js`)
  - File uploads via Multer (`multer.middleware.js`)
- Error handling via custom `ApiError` and `ApiResponse` utilities

## Development Workflow

### Frontend

```bash
cd Frontend/my-app
npm run dev  # Starts dev server on http://localhost:3000
```

### Backend

```bash
cd Backend
npm run dev  # Starts server with nodemon for auto-reload
```

## Project-Specific Patterns

### Frontend

1. Component Organization:
   - UI components are in `src/components/ui/`
   - Layout components like sidebar use compound pattern (see `app-sidebar.tsx`)
   - Mobile responsiveness handled via `use-mobile` hook

### Backend

1. API Error Handling:

   - Use `ApiError` class for consistent error responses
   - Wrap async handlers with `asyncHandler` utility
   - Always return responses using `ApiResponse` class

2. File Upload Flow:
   - Use Multer middleware for handling multipart/form-data
   - Files temporarily stored in `public/temp/`
   - Upload to Cloudinary using `cloudinary.js` utility
   - Store URLs in User/Video models

## Key Integration Points

1. Authentication:

   - JWT-based with refresh tokens
   - Tokens stored in HTTP-only cookies
   - Protected routes use `auth.middleware.js`

2. Media Storage:
   - Uses Cloudinary for avatar, cover images, and video content
   - Configure via environment variables
   - Check `cloudinary.js` for upload options

## Additional Notes

- CORS is configured to accept requests from `CORS_ORIGIN` env variable
- API request size limited to 16kb
- Database uses MongoDB with Mongoose for modeling
- Frontend components use shadcn/ui patterns
