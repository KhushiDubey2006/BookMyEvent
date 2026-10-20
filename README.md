# BookMyEvent – Online Event Booking and Management System

## Project Overview

BookMyEvent is a full-stack web application developed to make finding and booking events easier. It provides a centralized platform where customers can explore events, manage their bookings, and interact with event listings.

The system also provides an Admin module to manage events and booking requests.

## Technologies Used

- **Frontend:** React.js, Vite
- **Styling:** Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT
- **API Testing:** Postman
- **Version Control:** Git and GitHub

## Features

### Customer Features

1. **User Registration and Login** – Allows customers to create an account and access the application.
2. **Browse Events** – Allows customers to explore events.
3. **Search Events** – Helps users find events using search functionality.
4. **Filter Events** – Allows users to filter events according to categories.
5. **Sort Events** – Helps users organize event listings using sorting options.
6. **View Event Details** – Displays information about individual events.
7. **View Event Posters** – Displays event posters where available.
8. **Wishlist / Save Events** – Allows users to save events for later.
9. **Ratings and Reviews** – Allows users to share feedback about events.
10. **Event Booking** – Allows customers to submit event booking requests.
11. **My Bookings / Dashboard** – Provides a single section to view and manage booking information.
12. **Booking Status** – Allows customers to check the status of their bookings.

### Admin Features

1. **Event Management** – Allows the administrator to manage event listings.
2. **View Booking Requests** – Allows the administrator to view customer booking requests.
3. **Booking Approval and Rejection** – Allows the administrator to manage booking requests.
4. **Booking Information Management** – Provides access to relevant booking information.

## Project Structure

```text
BookMyEvent/
├── client/
├── server/
├── README.md
├── SETUP_GUIDE.md
├── package.json
├── dfd.png
└── fc.png
```

- **client/** – Contains the frontend application.
- **server/** – Contains the backend application.
- **README.md** – Contains project documentation.
- **SETUP_GUIDE.md** – Provides setup instructions.
- **package.json** – Contains project scripts and dependencies.
- **dfd.png** and **fc.png** – Supporting project diagrams.

## Prerequisites

Before running the project, make sure the following are installed:

- Node.js
- npm
- MongoDB or a MongoDB Atlas connection
- Git

## Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/KhushiDubey2006/BookMyEvent.git
```

### Step 2: Open the Project Folder

```bash
cd BookMyEvent
```

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 4: Configure Environment Variables

Configure the environment variables required by the backend according to `SETUP_GUIDE.md`.

Use your own database connection string and secret values.

**Important:** Never upload passwords, database credentials, or secret keys to GitHub.

### Step 5: Run the Backend

Open a terminal and execute:

```bash
cd server
npm run dev
```

### Step 6: Install Frontend Dependencies

Open another terminal and execute:

```bash
cd client
npm install
```

### Step 7: Run the Frontend

```bash
npm run dev
```

The frontend will display a local URL in the terminal. Open that URL in your browser to access the application.


## API Testing

Postman can be used to test the application's API endpoints.

## GitHub Repository

**Repository:** [BookMyEvent](https://github.com/KhushiDubey2006/BookMyEvent)

## Conclusion

BookMyEvent provides a centralized platform for event discovery, booking, and booking management. It aims to make event-related activities more convenient for customers and easier to manage for administrators.
