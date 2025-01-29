# ALMA Immigration Case Assessment App

This application helps users submit and manage immigration case assessments. It includes a landing page for submissions and a dashboard for managing leads.

## Getting Started

Follow these simple steps to run the application on your computer:

### Prerequisites

1. Install Node.js:
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download and install the "LTS" (Long Term Support) version for your operating system
   - Follow the installation wizard's instructions

### Installing and Running the App

1. Download the project:

   - Download this project as a ZIP file
   - Extract the ZIP file to a location on your computer

2. Open Terminal (Mac) or Command Prompt (Windows):

   - **On Mac**:
     - Press `Command + Space`
     - Type "Terminal"
     - Press Enter
   - **On Windows**:
     - Press `Windows + R`
     - Type "cmd"
     - Press Enter

3. Navigate to the project folder:

   ```bash
   cd path/to/my-app
   ```

   (Replace "path/to" with the actual path where you extracted the files)

4. Install the required packages:

   ```bash
   npm install
   ```

   Wait for the installation to complete (this might take a few minutes)

5. Start the application:

   ```bash
   npm run dev
   ```

6. Access the application:
   - Open your web browser
   - Go to [http://localhost:3000](http://localhost:3000)

### Using the Application

1. Landing Page (http://localhost:3000):

   - Fill out the immigration case assessment form
   - Upload your resume/CV
   - Select visa categories of interest
   - Submit your information

2. Dashboard (http://localhost:3000/dashboard):
   - Login credentials:
     - Username: admin
     - Password: admin
   - View and manage submitted leads
   - Search and sort leads
   - Update lead statuses
   - Navigate through pages of leads

### Troubleshooting

If you encounter any issues:

1. Make sure Node.js is properly installed:

   ```bash
   node --version
   ```

   This should show a version number (e.g., v18.0.0)

2. If the installation fails:

   - Delete the 'node_modules' folder if it exists
   - Run `npm install` again

3. If the app won't start:

   - Make sure no other application is using port 3000
   - Try closing and reopening your terminal
   - Run `npm run dev` again

4. If you see "command not found":
   - Make sure you're in the correct directory (my-app folder)
   - Try installing Node.js again

For additional help, please contact technical support.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
