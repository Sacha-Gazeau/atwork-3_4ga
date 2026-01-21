# DIY Tuin

DIY Tuin is a Next.js application designed to help users plan and visualize their dream gardens. The platform allows users to submit requests for garden designs, including their preferences for style, budget, and specific requirements.

## Features

-   **Custom Requests**: Users can submit detailed forms with their garden preferences.
-   **File Uploads**: Integration with EdgeStore for handling image uploads (e.g., garden photos).
-   **Email Notifications**: Automated email confirmations using Nodemailer when a request is submitted.
-   **Admin Dashboard**: (If applicable, or future feature) Management of incoming requests.

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: SQLite (via [Prisma](https://www.prisma.io/))
-   **File Storage**: [EdgeStore](https://edgestore.dev/)
-   **Email**: [Nodemailer](https://nodemailer.com/)

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm, yarn, pnpm, or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/diy-tuin.git
    cd diy-tuin
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Set up environment variables:
    Copy `.env.example` to `.env` (if available) or create a new `.env` file and populate it with the required keys (see [Environment Variables](#environment-variables)).

4.  Initialize the database:
    ```bash
    npx prisma generate
    npx prisma db push
    # Optional: Seed the database if a seed script is provided
    npm run prisma:seed
    ```

5.  Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# SMTP Configuration (for Contact Form)
CONTACT_SMTP_HOST="smtp.example.com"
CONTACT_SMTP_PORT="587"
CONTACT_SMTP_USER="your_email@example.com"
CONTACT_SMTP_PASS="your_password"
CONTACT_FROM_EMAIL="no-reply@example.com"
CONTACT_TO_EMAIL="admin@example.com"

# EdgeStore (for File Uploads)
EDGE_STORE_ACCESS_KEY="your_access_key"
EDGE_STORE_SECRET_KEY="your_secret_key"
```

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a Git repository (GitHub, GitLab, BitBucket).
2.  Import the project into Vercel.
3.  Add the [Environment Variables](#environment-variables) in the Vercel project settings.
4.  Deploy.

> [!WARNING]
> **Important Note regarding SQLite and Vercel:**
> This project currently uses **SQLite**, which stores data in a local file (`dev.db`). Vercel's Serverless Functions have an ephemeral file system, meaning any data written to the SQLite file **will be lost** every time the app is redeployed or the function goes into a cold start.
>
> **For Production:**
> -   **Switch Database**: It is highly recommended to use a hosted database like **Vercel Postgres**, **Supabase**, or **PlanetScale** (MySQL) for production deployment. You will need to update the `provider` in `prisma/schema.prisma` and the `DATABASE_URL`.
> -   **VPS**: Alternatively, if you must use SQLite, deploy the application to a VPS (Virtual Private Server) or a containerized environment (e.g., Docker, Railway, Render with a persistent volume) where the file system persists.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
