# Sabeshragav's Next.js Portfolio

A modern, full-stack portfolio website built with Next.js, React, Tailwind CSS, Redux Toolkit, and NextAuth. This project showcases innovative web development projects, articles, and personal insights, with a focus on clean UI/UX and robust authentication.

## Features

- **Project Showcase**: Browse featured and upcoming projects with detailed breakdowns, screenshots, and technology stacks.
- **Articles**: Read in-depth articles about projects, challenges, and solutions.
- **Authentication**: Secure sign up, login, and social authentication (Google, GitHub) via NextAuth.
- **Contact Form**: Authenticated users can send a single enquiry message.
- **Responsive Design**: Fully responsive and mobile-friendly UI.
- **Modern UI**: Built with Tailwind CSS, Framer Motion animations, and custom gradients.
- **Redux Toolkit**: State management for articles, authentication, and UI state.
- **API Routes**: RESTful API endpoints for articles, authentication, and enquiries.
- **Social Links**: Quick access to GitHub, LinkedIn, LeetCode, HackerRank, and more.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **State Management**: Redux Toolkit
- **Authentication**: NextAuth.js
- **Backend/API**: Next.js API routes
- **Database**: (Pluggable, e.g., MongoDB or PostgreSQL via models)
- **Other**: Axios, React Toastify, Lucide React Icons

## Project Structure

```
├── public/
│   ├── images/           # Project and article images
│   ├── icons/            # App icons and profile images
│   └── files/            # Downloadable files (e.g., resume)
├── src/
│   ├── app/              # Next.js app directory (layouts, pages, API routes)
│   ├── components/       # Reusable React components (Navbar, Footer, Article, Home, Auth, etc.)
│   ├── features/         # Redux slices (articleSlice, authSlice, etc.)
│   ├── model/            # Data models (articleModel, userModel, enquiryModel)
│   ├── providers/        # Context providers
│   ├── redux/            # Redux store setup
│   ├── services/         # Utility services (mail, storage)
│   ├── styles/           # Global and component styles (Tailwind CSS)
│   └── utils/            # Utility functions (e.g., dbConnection)
├── .env.example          # Example environment variables
├── package.json          # Project dependencies and scripts
├── tailwind.config.mjs   # Tailwind CSS configuration
└── ...                   # Other config files
```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Sabeshragav/nextjs-portfolio.git
   cd nextjs-portfolio
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**

   - Copy `.env.example` to `.env.local` and fill in the required values.

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint

## Customization

- **Add Projects/Articles**: Update the models and API routes in `src/model/` and `src/app/api/`.
- **Images**: Place project images in `public/images/` and update references in articles/projects.
- **Social Links**: Edit `src/components/Footer.jsx` and `src/components/Navbar.jsx`.

## License

This project is open source and available under the [MIT License](LICENSE).

---

> Designed and developed by Sabeshragav GK. For more, visit [sabeshragav.me](https://sabeshragav.me)
