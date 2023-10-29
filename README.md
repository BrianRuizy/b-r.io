# My Personal Website

My personal portfolio website designed to be simplistic and clean while including features like MDX blog posts with view counts, a dark mode toggle, gear list, an about page, and more.

## Tech Stack

backend:
- [Next.js](nextjs.org) / TypeScript
- [MDX](https://mdxjs.com) / [Contentlayer](https://contentlayer.dev/) (Blog Posts)
- [PlanetScale](http://planetscale.com) (Database)
- [Prisma](https://www.prisma.io) (ORM)

frontend:
- [Tailwind CSS](https://tailwindcss.com) (Styling)
- [Radix Primitives](https://www.radix-ui.com/primitives) (Headless UI components)
- [Radix UI Colors](https://www.radix-ui.com/colors) (Color system)
- [Framer Motion](https://www.framer.com/motion/) (Animations)

## Getting Started

Make sure you have Node.js v18.17.0+ installed on your machine.

1. **Install Dependencies**: `npm install`
2. **Environment variables**: Copy `.env.example` to a new `.env.local`
3. **Database Setup**: See [Database Setup](#database-setup)
4. **Prisma Setup**: `npm install @prisma/client` (if you haven't already), then run `npx prisma generate`.
5. **Start Developing**: `npm run dev`, this will automatically create the .contentlayer files and start the Next.js development server.

## Database Setup

- Sign up for a PlanetScale account
- Create a new database in PlanetScale
- Update the DATABASE_URL environment variable in your project's `.env.local` file with the connection string provided by PlanetScale

## Deployment

This project can be easily deployed to [Vercel](https://vercel.com/new/clone). Simply connect your Vercel account to your GitHub repository, and Vercel will automatically build and deploy your application with each new push to the main branch.

Add the project .env variables to your Vercel project settings.
