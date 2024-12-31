# Location/Address Flow Application

## Overview
This project is a MERN stack application that allows users to select and save their delivery location using Google Maps API for geolocation and location search. Users can also fine-tune their location via a draggable pin on the map and save their address under specific categories. The app features user authentication and provides a seamless user experience for managing delivery addresses.

---

## Features

### User Authentication
- **Signup/Login Pages**: Users can register or log in securely using token-based authentication (JWT).
- **Encrypted Passwords**: User passwords are hashed using bcrypt.

### Location Functionality
- **Location Permission Request**:
  - Modal popup prompts users to enable location permissions if they are turned off.
  - Two options available:
    1. **Enable Location**: Requests location through the browser.
    2. **Search Manually**: Allows users to input their address using Google Places Autocomplete API.
- **Geolocation & Pin Selection**:
  - Displays the user's selected location on a map.
  - Allows users to fine-tune their location by dragging a pin.
  - Includes a **Use current location** button to detect the current location using the browser's geolocation feature.

### Address Management
- **Delivery Address Form**:
  - Collects additional details such as House/Flat/Block No., Apartment/Road/Area.
  - Provides options to categorize addresses as Home, Office, or Friends & Family using icons.
- **Saved Addresses Page**:
  - Displays all saved addresses.
  - Allows users to filter addresses by type (e.g., Home, Office).

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Tailwind CSS**: For styling components.
- **Google Maps API**: For location search and map functionalities.
- **React Context API/Redux**: For state management.

### Backend
- **Node.js**: For server-side logic.
- **Express.js**: For creating RESTful APIs.
- **MongoDB Atlas**: For database management.
- **JWT**: For token-based user authentication.
- **bcrypt**: For hashing passwords.

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed.
- MongoDB Atlas account for the database.
- Google Cloud account for API keys.

### Steps to Run the Project

#### Backend Setup
1. Clone the repository.
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=8000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
   ```
4. Start the server.
   ```bash
   npm run start
   ```

#### Frontend Setup
1. Navigate to the frontend directory.
   ```bash
   cd ../frontend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
   ```
4. Start the development server.
   ```bash
   npm run dev
   ```

### Deployment
- **Frontend**: Host on platforms like Vercel or Netlify.
- **Backend**: Deploy on platforms like Render, Heroku, or AWS.

---

## API Endpoints

### Authentication
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in an existing user.

### Location Management
- **POST /location/save**: Save a delivery address.
- **GET /location/get**: Retrieve all saved addresses for the logged-in user.

---

## Screens and Functionality

### Signup/Login Page
- User-friendly forms for authentication.
- Error handling for invalid credentials.

### Location Page
- Modal for location permission requests.
- Map interface with draggable pin for precise location selection.
- Search bar for manual address input.
- "Locate Me" button for auto-detection of current location.

### Delivery Address Form
- Input fields for house, area, and address type.
- Save button to persist the address to the database.

### Saved Addresses Page
- Displays a list of saved addresses.
- Filter functionality by address type.

---

## Future Enhancements
- Add support for multi-language localization.
- Integrate with delivery service APIs.
- Enable bulk address import/export.

---

## License
This project is licensed under the MIT License.

---

## Acknowledgments
- **Google Maps API** for map functionalities.
- **MongoDB Atlas** for seamless database management.
- **Tailwind CSS** for beautiful UI design.


