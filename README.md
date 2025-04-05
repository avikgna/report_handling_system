# REPORT HANDLING SYSTEM

A reporting system with admin interface for managing user-submitted reports and a submission page to submit new reports.

## Features

- User report submission
- Admin report management and report resolution
- Role-based access control via NextAuth authentication
- Comprehensive filtering and sorting


## Prerequisites

- Node.js
- TypeScript and JavaScript
- NextAuth
- npm or yarn
- PostgreSQL database
- Next.js 14

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/report_handling_system.git
cd report_handling_system

```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env file in your root directory to store secrets. In order to use the system locally you will need to generate and store a next Auth Secret.

Generate the next auth secret using:

```bash
# Generate a secure random string for NEXTAUTH_SECRET
openssl rand -base64 32
```

Then store secrets in your root directory in a .env file:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/report_handling_system"
NEXTAUTH_SECRET="your-secure-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Seed and setup your database using prisma

Ensure PostgreSQL is running and create the database (optionally through command line as detailed below)

```bash
CREATE DATABASE report_handling_system
```

Create a database using the schema outlined using the npx prisma migrate dev line.

Seed the database with the seed file located in the repo, the seed file is under the prisma folder.



```bash
CREATE DATABASE report_handling_system
npx prisma migrate dev
npx prisma db seed
```


### 5. Run file

```bash
npm run dev
```
