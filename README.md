# CashTrail: Your Personal Finance Tracker

![CashTrail Screenshot](public/cashtrail.jpeg)

CashTrail is a modern, intuitive, and powerful web application designed to help you take control of your finances. By intelligently parsing transaction messages and providing clear, visual reports, CashTrail makes it easy to track your income and expenses, understand your spending habits, and manage your budget effectively.

## ✨ Features

-   **Intelligent Message Parsing**: Simply paste your transaction messages (e.g., from M-Pesa), and CashTrail will automatically extract the amount, payee, and date, and intelligently assign a category.
-   **Manual Entry**: Flexibility to add transactions manually with a simple and intuitive form, including date, type, category, and description.
-   **Interactive Dashboard**: A central hub showing your current month's financial summary, including total income, expenses, and balance.
-   **Detailed Transaction List**: View all your transactions in a clear, sortable list. Edit or delete transactions as needed directly from the dashboard.
-   **In-depth Reporting**:
    -   Navigate through your financial history month by month.
    -   Visualize your spending with interactive pie charts for both income and expenses.
    -   View a read-only list of all transactions for the selected month.
-   **Secure Configuration**: All sensitive API keys are managed securely using environment variables and are not exposed in the codebase.
-   **Modern UI**: Built with Microsoft's Fluent UI, providing a clean, professional, and responsive user experience.

## 🛠️ Technologies Used

-   **Frontend**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **UI Framework**: [Fluent UI 2](https://fluentui.microsoft.com/components/web/v9)
-   **Database**: [Google Firestore](https://firebase.google.com/docs/firestore)
-   **Charting**: [Recharts](https://recharts.org/)
-   **Routing**: [React Router](https://reactrouter.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/cashtrail.git
    cd cashtrail
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up your Firebase project:**
    -   Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    -   Add a new "Web" app to your project.
    -   Copy the `firebaseConfig` object.

4.  **Configure environment variables:**
    -   Create a new file named `.env.local` in the root of your project.
    -   Copy the contents of `.env.example` into your new `.env.local` file.
    -   Replace the placeholder values in `.env.local` with your actual Firebase project keys from the `firebaseConfig` object.

    ```env
    # .env.local
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

5.  **Run the development server:**
    ```sh
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## 🌐 Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/), which offers a seamless and free hosting experience for modern web applications.

To deploy your own version of CashTrail:

1.  **Push to GitHub**: Ensure your project, including your latest changes, is pushed to a GitHub repository. **Important**: Make sure to commit the `package-lock.json` file as well, as Vercel uses it to install the exact dependency versions.

2.  **Import Project on Vercel**:
    -   Sign up for a free Vercel account and connect it to your GitHub.
    -   Click "Add New..." -> "Project".
    -   Select your CashTrail repository from the list.

3.  **Configure Project**:
    -   Vercel will automatically detect that you are using Vite and configure the build settings for you. You typically do not need to change anything here.
    -   The most important step is to add your Firebase environment variables. Go to the "Settings" tab of your new Vercel project, then click on "Environment Variables".
    -   Add each variable from your `.env.local` file. For example:
        -   **Name**: `VITE_FIREBASE_API_KEY`, **Value**: `your_api_key_value`
        -   **Name**: `VITE_FIREBASE_AUTH_DOMAIN`, **Value**: `your_auth_domain_value`
        -   ...and so on for all the variables in `.env.example`.

4.  **Deploy**:
    -   Click the "Deploy" button. Vercel will build and deploy your application.
    -   Once complete, you will be given a public URL where you can access your live CashTrail application.


## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/cashtrail/issues).

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

