# Title: Task list App - Challenge
## Goal
Create a web app that allows to create tasks with a form and display them on a list.

## Functionalities
  - Allows you to edit, delete, and mark as completed tasks created in the list.
  - It has filters: completed, uncompleted, and all.
  - It has tabs to navigate between pages: create task and task list.
![image](https://github.com/user-attachments/assets/b381a589-011b-43b1-aaf5-f805f542c953)
![image](https://github.com/user-attachments/assets/d4a86a78-4532-4cd4-96a3-a0f8be250879)

## Technologies used
### Frontend
- React + Vite
- TypeScript
- TailwindCSS
- ReactRouter
- FontAwesome
### Backend
- Express
- Cors
- Json file as Data Base
- DotEnv

## Instructions for installing
- Clone the repository: 
   ```bash
    git clone https://github.com/ariix00/challenge-ForIT-2025
    ```
- Navigate to the project directory:
   ```bash
    cd challenge-ForIT-2025
    ```
- Install the dependencies on each folder with different terminals (backend and frontend):
   ```bash
    cd backend // cd frontend
    npm install
   ```
-Create a .env file on each folder (backend and frontend) and add the environment variables inside the file:  
  for backend:
    ```
      PORT=3000
        TASKS_PATH=data/tasks.json
    ```
  for frontend:
   ```
      VITE_API=http://localhost:3000/api/tasks
   ```

- Run the server on backend:
    ```bash
    npm start
    ```
- Run the app on frontend:
    ```bash
    npm run dev
    ```
- Open your browser and visit `http://localhost:5173`:





