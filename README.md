# Out-Patient Appointment System

## Project Overview

The Out-Patient Appointment System is a web-based application that provides a convenient way for patients to book appointments with doctors who practice on a weekly schedule. The system allows patients to view a list of doctors, access detailed information about specific doctors, and book appointments based on the doctor's availability.

## Features

- **Doctor Listing**: Provides a list of doctors along with their basic information, including name, specialty, and the maximum number of patients they can consult in a given evening.

- **Doctor Detail Page**: Allows users to access detailed information about a specific doctor, including their schedule for the week.

- **Appointment Booking**: Enables patients to book appointments with doctors based on the doctor's availability. The system ensures that the maximum patient limit for each doctor is not exceeded.

## Project Implementation

This project is implemented using Node.js and Express.js for the backend server. It includes the following components:

- **Server**: A Node.js server built with Express.js to handle API requests and serve static files.

- **API Endpoints**: The server provides several API endpoints for listing doctors, accessing detailed doctor information, and booking appointments.

- **Database**: For simplicity, the project uses in-memory data storage to maintain a list of doctors and appointments. A more sophisticated system can integrate with a database.

- **Frontend**: While the project focuses on the backend, it can be integrated with a frontend application to provide a complete user interface for patients.


