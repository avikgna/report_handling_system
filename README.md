
Setup Instructions
Prerequisites
Node.js (v18 or later)

npm or yarn

PostgreSQL database

Next.js 14

Installation Steps
Clone the repository

bash
Copy
git clone [repository-url]
cd servihub-admin
Install dependencies

bash
Copy
npm install
# or
yarn install
Set up environment variables
Create a .env file in the root directory with the following:

Copy
DATABASE_URL="postgresql://user:password@localhost:5432/servihub"
NEXTAUTH_SECRET="your-secure-secret-here"
NEXTAUTH_URL="http://localhost:3000"
Database setup
Ensure your PostgreSQL database is running and the schema matches the Prisma models.

Run the development server

bash
Copy
npm run dev
# or
yarn dev
Access the application
Open http://localhost:3000 in your browser.

Code Structure
Copy
servihub-admin/
├── app/
│   ├── admin/
│   │   └── table/
│   │       └── page.tsx       # Admin report management interface
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       ├── options.ts # Auth configuration
│   │   │       └── route.ts   # Auth API routes
│   │   ├── reports/
│   │   │   ├── route.ts       # GET all reports
│   │   │   └── [id]/
│   │   │       └── route.ts   # PATCH to resolve reports
│   ├── user/
│   │   └── report/
│   │       └── page.tsx       # User report submission
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   └── ui/                    # UI components (table, buttons, etc.)
├── types/
│   └── report.ts              # Type definitions
├── public/
├── styles/
│   └── globals.css            # Global styles
└── prisma/
    └── schema.prisma          # Database schema

# report_handling_system
This is a Repository for a Report Handling System built using TypeScript, Next.js and PostgreSQL.
>>>>>>> 2dbb9054940068c447952ac6ef779f035f1c8185
