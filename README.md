# Innovaxel Event Registration System

A RESTful Event Registration API built with Node.js, Express.js, MongoDB Atlas, and Mongoose.

## Features

### Event Management

* Create Events
* Unique Event Names
* Future Date Validation
* Seat Capacity Management

### Registration Management

* Register Users for Events
* Prevent Duplicate Registrations
* Prevent Event Overbooking
* Store Registration Timestamps

### Event Listing

* View All Events
* View Available Seats
* View Total Registrations
* Sort Events by Date
* Filter Upcoming Events

### Registration Cancellation

* Cancel Existing Registrations
* Restore Available Seats
* Exclude Cancelled Registrations

### Documentation

* Swagger API Documentation

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Swagger UI
* Express Validator

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd innovaxel-event-registration
```

Install dependencies:

```bash
npm install
```

Create a .env file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start development server:

```bash
npm run dev
```

## API Documentation

Swagger UI:

```text
http://localhost:5000/api-docs
```

## API Endpoints

### Events

Create Event

```http
POST /api/events
```

Get Events

```http
GET /api/events
```

Get Upcoming Events

```http
GET /api/events?upcoming=true
```

Sort Events

```http
GET /api/events?sort=date
```

### Registrations

Register User

```http
POST /api/registrations
```

Cancel Registration

```http
DELETE /api/registrations/:registrationId
```

## Deployment

Backend: Render

Database: MongoDB Atlas

## Author

Muhammad Subhan
