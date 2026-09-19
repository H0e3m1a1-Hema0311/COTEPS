# COTEPS - Choose • Order • Taste • Enjoy • Pure • Satisfaction

Welcome to COTEPS, a unique food ordering platform designed to enhance your food experience through innovative features and engaging interactions. Our mission is to not just deliver food, but to create a complete food experience that combines smart technology, AI assistance, gamification, and customer engagement.

## Project Structure

The project is organized into the following directories:

- **public/**: Contains static files such as the favicon and the main HTML entry point.
  - `favicon.ico`: The favicon for the website.
  - `index.html`: The main HTML file for the web application.

- **src/**: The source code for the application.
  - **assets/**: Static assets like images and fonts.
  - **components/**: Reusable UI components.
    - **aiChef/**: Components related to the animated AI Chef Bot.
    - **games/**: Components for the mini-games feature.
    - **layout/**: Layout components for structuring pages.
    - **portals/**: Components for user, admin, and delivery partner portals.
    - **ui/**: General UI components like buttons and modals.
  - **pages/**: Main pages of the application.
    - **admin/**: Components and logic for the admin portal.
    - **delivery/**: Components and logic for the delivery partner portal.
    - **home/**: Components and logic for the home page.
    - **user/**: Components and logic for the user portal.
    - **auth/**: Components and logic for user authentication.
  - **services/**: Service files for handling API calls and business logic.
  - **store/**: State management files.
  - **styles/**: CSS or styled-components for styling the application.
  - **utils/**: Utility functions and helpers.
  - `App.tsx`: The main application component that sets up routing and renders different pages and components.

- **tsconfig.json**: TypeScript configuration file.
- **package.json**: npm configuration file.

## Features

- **User Portal**: Browse and order food, play games, and earn rewards.
- **Admin Portal**: Manage users, restaurants, menus, orders, offers, and analytics.
- **Delivery Partner Portal**: Manage deliveries, update order status, and track earnings.
- **AI Chef Bot**: An animated bot that welcomes users and guides them through the platform.
- **Mini-Games**: Fun challenges that allow users to earn rewards, discounts, and cashback.
- **Mood-Based Recommendations**: AI-powered food suggestions based on user mood.
- **Food Stories**: Engaging narratives about the food and restaurants.
- **Loyalty Rewards**: Earn points for orders and activities on the platform.
- **Interactive Animations**: Enhance user experience with engaging visuals.

## Getting Started

To get started with COTEPS, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd coteps
npm install
```

Then, you can run the application:

```bash
npm start
```

## Contributing

We welcome contributions to COTEPS! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.