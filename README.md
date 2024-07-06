# Home Energy Consumption Tracker

## Objective

The primary objective of this project is to develop a user-friendly web application that enables users to monitor, analyze, and manage their residential energy consumption. The application will provide tools for real-time tracking, historical data analysis, and personalized energy-saving recommendations.

## Features

### Real-Time Monitoring

- Users can view their current energy consumption in real-time, allowing for immediate feedback and adjustments.

### Historical Data Analysis

- The application offers comprehensive charts and graphs to visualize past consumption patterns, helping users identify trends and make informed decisions.

### Energy Filtering Tools

- Users can comprehensively filter their consumption data based on a certain time frame and even a specific device, allowing for detailed and customized analysis.

### Customizable Alerts and Notifications

- The system notifies users when their energy consumption exceeds set thresholds, helping to prevent excessive usage and unexpected high costs.
- Users can manage their notification preferences, including opting for text, email, or disabling notifications altogether.

### Energy-Saving Tips

- Based on the user’s consumption habits, the application provides tailored advice on how to reduce energy waste and improve efficiency.

### User Profile Management

- Users can manage their profiles, including personal details and energy consumption preferences.

### Device Management

- Users can add, edit, and remove devices, allowing for detailed tracking and analysis of energy consumption per device.

## Technology Stack

### Backend

- **Framework**: Developed using Python's Django framework, the backend handles server-side routing, data management, API endpoints, and alert systems.
- **Task Queue**: Celery is used for background tasks such as generating consumption records and sending notifications.

### Frontend

- **Library**: Built with React, the frontend provides an interactive, responsive, and appealing user interface. It utilizes websockets for real-time data updates and integrates with various charting libraries (like Recharts) for visualization.

### Database

- **Database**: PostgreSQL is used for its robustness and scalability alongside a large and mature community.

### APIs

- **RESTful APIs**: The application uses RESTful APIs to facilitate communication between the frontend and backend.
- **HTTP Client**: Axios is used on the frontend for making API requests and handling responses.

## Installation

### Prerequisites

- Python 3.x
- Node.js and npm
- Redis
- PostgreSQL

### Clone the Repository

```bash
git clone https://github.com/yourusername/home-energy-consumption-tracker.git
cd home-energy-consumption-tracker 
```

### Backend Setup

1. Create a virtual environment:

    ```bash
    python3 -m venv env
    source env/bin/activate
    ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up the database:
   1. Ensure you have PostgreSQL installed and running.
   2. Create a new database with:

    ```bash
    psql -c "CREATE DATABASE yourdbname;"
    ```

4. Apply migrations:

    ```bash
    python manage.py migrate
    ```

5. Create a superuser

   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1.	Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

### Redis Setup

1. Install Redis:
   1. On MacOS with Homebrew:

        ```bash
        brew install redis
        ```

   2. On Ubuntu:

        ```bash
        sudo apt-get update
        sudo apt-get install redis-server
        ```

2. Start Redis server:

    ```bash
    redis-server
    ```

### Celery and Celery Beat Setup

1. Start Celery worker:

   ```bash
    celery -A energy_management worker --loglevel=info
    ```

2. Start Celery beat:

    ```bash
    celery -A energy_management beat --loglevel=info
    ```

### Environment Variables

Create a .env file in the root directory and add necessary environment variables (e.g., database settings, secret keys, Redis URL).

```env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/yourdbname
REDIS_URL=redis://localhost:6379/0
```

## Usage

1. Access the backend API:
    Navigate to http://localhost:8000 to access the backend API.

2. Access the frontend application:
    Navigate to http://localhost:5173 to access the frontend application.

3. User registration and login:
    Register a new user, log in, and start adding your devices.

4. Real-time monitoring and historical data analysis:
    Use the real-time monitoring and historical data analysis features to track and manage your energy consumption.

5. Set up alerts and notifications:
    Stay informed about your energy usage by setting up alerts and notifications.

6. Explore energy-saving tips:
    Explore the energy-saving tips tailored to your consumption habits.

## Contributing

I welcome contributions to enhance the functionality and features of this application. Please fork the repository, create a new branch for your feature or bugfix, and submit a pull request for review.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

Thank you for using the Home Energy Consumption Tracker. Together, let’s make our homes more energy-efficient and sustainable!
