# DaVincii

Minimalist starter for Next.js projects using shadcn/ui, Tailwind CSS, Supabase and Prisma.

## 🚀 Tech stack

- **Next.js 15** - React framework
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Headless UI components
- **Supabase** - Backend and authentication
- **Prisma** - Database ORM

## 📦 Installation

1. Install dependencies:

```bash
npm install
```

2. Set environment variables:

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

3. Configure Supabase:

- Create a project at [Supabase](https://supabase.com)
- Get your project URL and anon key
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env`
- **Important:** Configure redirect URLs in Supabase Dashboard:
  - Go to **Authentication** → **URL Configuration**
  - Add these redirect URLs:
    - `http://localhost:3000/auth/confirm`
    - `http://localhost:3000/auth/callback`
  - Enable email confirmations in **Authentication** → **Providers** → **Email**
  - See `SUPABASE_SETUP.md` for detailed instructions

4. Configure Prisma:

- Set your `DATABASE_URL` in `.env`
- Generate the Prisma client:

```bash
npm run db:generate
```

- Push the schema to your database:

```bash
npm run db:push
```

## 🛠️ Available scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Apply schema changes to database
- `npm run db:migrate` - Create a new migration
- `npm run db:studio` - Open Prisma Studio

## 📁 Project structure

```
davincii/
├── prisma/
│   └── schema.prisma      # Prisma schema
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Landing page
│   │   ├── auth/          # Auth (sign in / sign up)
│   │   ├── demo/          # Demo landing
│   │   └── dashboard/     # Minimal dashboard
│   ├── components/        # React components
│   │   └── ui/            # shadcn/ui components
│   └── lib/               # Utilities
│       ├── utils.ts       # General utilities
│       ├── supabase.ts    # Supabase client
│       └── prisma.ts      # Prisma client
└── public/                # Static assets
```

## 🎨 Adding shadcn/ui components

Use the CLI to add new components:

```bash
npx shadcn@latest add [component-name]
```

Example:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## 📝 Suggested next steps

1. Wire Supabase auth session into the dashboard
2. Replace placeholder metrics with real data
3. Add more shadcn/ui components as needed
4. Customize the layout to match your brand

## 📚 Resources

- [Next.js docs](https://nextjs.org/docs)
- [shadcn/ui docs](https://ui.shadcn.com)
- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [Supabase docs](https://supabase.com/docs)
- [Prisma docs](https://www.prisma.io/docs)

