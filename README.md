![MacBook Pro 16_ - 1](https://user-images.githubusercontent.com/23439187/230973444-631c2b5f-2da4-441d-b4b7-b25df8e90150.png)

## Technologies

backend:
- [Next.js](nextjs.org) / TypeScript
- [MDX](https://mdxjs.com) / Contentlayer (CMS)
- [Vercel](vercel.com) (Hosting)
- [PlanetScale](http://planetscale.com) (Database)
- [Prisma](https://www.prisma.io) (ORM)

frontend:
- [Tailwind CSS](https://tailwindcss.com) (utility styles)
- [Headless UI](https://headlessui.com) (UI components)
- [Radix UI Colors](https://www.radix-ui.com/colors) (color system)
- [Framer Motion](https://www.framer.com/motion/) (Animations)

## Prerequisites

Node.js installed on your local machine
PlanetScale account
Prisma CLI installed (npm i -g prisma)

## Installation

Clone this repository to your local machine
Install dependencies with `pnpm install`
Copy `.env.example` to `.env.local` and update the environment variables as needed
Start the development server with `pnpm dev`.

## Deployment

This project can be easily deployed to [Vercel](https://vercel.com/new/clone). Simply connect your Vercel account to your GitHub repository, and Vercel will automatically build and deploy your application with each new push to the main branch.

Alternatively, you can use the Vercel CLI to deploy your application straight from your local machine.

Also, you will have to add the mentioned environment variables to your Vercel project settings.

## Database Migration

To migrate your database from Prisma to PlanetScale, follow these steps:

Sign up for a PlanetScale account
Create a new database in PlanetScale
Update the DATABASE_URL environment variable in your project's `.env.local` file with the connection string provided by PlanetScale
Run `npx prisma migrate dev` to generate a new migration
Run `npx prisma migrate deploy` to apply the migration to your database in PlanetScale.