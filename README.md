# CA Monk Blog Application

A modern blog application built with React, TypeScript, TanStack Query, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **React 19** + **TypeScript** - UI framework with type safety
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Vite** - Fast build tool
- **JSON Server** - Mock REST API

## Features

- ✅ View all blogs with responsive card layout
- ✅ View full blog details with cover image
- ✅ Create new blog posts with form validation
- ✅ Loading states with skeleton animations
- ✅ Error handling for API failures
- ✅ Two-column responsive layout

## How to Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Backend (JSON Server)

```bash
npm run server
```

This runs the API at [http://localhost:3001/blogs](http://localhost:3001/blogs)

### 3. Start the Frontend (in a new terminal)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── api/
│   └── blogs.ts          # API functions (fetch, create)
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── BlogCard.tsx      # Blog preview card
│   ├── BlogList.tsx      # List with useQuery
│   ├── BlogDetails.tsx   # Full blog view
│   └── CreateBlogForm.tsx # Form with useMutation
├── pages/
│   └── Home.tsx          # Main page layout
├── types/
│   └── blog.ts           # TypeScript interfaces
├── lib/
│   └── utils.ts          # Utility functions
├── App.tsx
├── main.tsx              # QueryClientProvider setup
└── index.css             # Tailwind + CSS variables
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blogs |
| GET | `/blogs/:id` | Get blog by ID |
| POST | `/blogs` | Create new blog |
