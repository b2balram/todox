# Todo Application

## Description
A comprehensive Todo application built with ReactJS for the frontend and ExpressJS for the backend. This application provides users with robust task management capabilities.

## Features
1. **Task Management:**
   - Users can list, create, modify, and delete todo items through an intuitive web interface.
   - Each todo item will have fields for title, description, due date, priority, and status (complete/incomplete).

2. **Cancellation Option:**
   - Todo items can be marked as canceled, providing users with the flexibility to manage unexpected changes or cancellations.

3. **Reminders:**
   - Users can set reminders for individual todo items, receiving notifications or alerts based on their preferences.
   - Reminders can be customized to suit the user's schedule and preferences.

4. **Recurring Tasks:**
   - Todo items can be configured to be recurring in nature, allowing users to set daily, weekly, or custom recurring patterns.
   - Recurring tasks will automatically generate new instances based on the specified recurrence rules.

## Technologies Used
- **Frontend:** ReactJS
- **Backend:** ExpressJS
- **Database:** MongoDB
- **Notifications:** Novu
- **Authentication and Authorization:** Descope
- **Others:** Axios for HTTP requests, Bootstrap for styling

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/username/todo-app.git
    cd todo-app
    ```

2. Install dependencies for the backend:
    ```sh
    cd todox-server
    npm install
    # or
    yarn install
    ```

3. Install dependencies for the frontend:
    ```sh
    cd ../todox-ui
    npm install
    # or
    yarn install
    ```

4. Set up environment variables:

#### Backend Environment Variables
- Create a `.env` file in the `todox-server` directory with the following content:
    ```env
    PORT=5000
    MONGODB_URL='your_mongodb_url_here'
    DESCOPE_PROJECT_ID='your_descope_project_id_here'
    NOVU_API_KEY='your_novu_api_key_here'
    ENABLE_RECURRANCE_SCHEDULER=false
    ENABLE_REMINDER_SCHEDULER=false
    RECURRANCE_SCHEDULER_CRON_EXP='*/10 * * * * *'
    REMINDER_SCHEDULER_CRON_EXP='*/10 * * * * *'
    ```

#### Frontend Environment Variables
- Create a `.env` file in the `todox-ui` directory with the following content:
    ```env
    REACT_APP_SERVER_URL=http://localhost:5000/todo
    REACT_APP_DESCOPE_PROJECT_ID='your_descope_project_id_here'
    REACT_APP_APPLICATION_IDENTIFIER='your_application_identifier_here'
    ```

5. Start the backend server:
    ```sh
    cd todox-server
    npm start
    # or
    yarn start
    ```

6. Start the frontend server:
    ```sh
    cd ../todox-ui
    npm start
    # or
    yarn start
    ```

## Usage
Once both the backend and frontend servers are running, you can access the application by navigating to `http://localhost:3000` in your web browser.

### Example
- **Add a new task:** Enter the task details (title, description, due date, priority) and click "Add".
- **Update a task:** Click on a task to edit its details.
- **Delete a task:** Click the delete button next to a task.
- **Mark a task as completed:** Check the checkbox next to a task.
- **Cancel a task:** Mark the task as canceled.
- **Set reminders:** Configure reminders for tasks based on your schedule.
- **Recurring tasks:** Set tasks to recur daily, weekly, or according to a custom schedule.

## Contributing
We welcome contributions! Please follow these steps to contribute:

### How to Contribute
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a Pull Request

### Code of Conduct
Please adhere to the project's code of conduct.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or suggestions, feel free to contact:
- Email: vishwakarmabalram2@gmail.com
