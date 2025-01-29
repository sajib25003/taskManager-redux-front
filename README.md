# Task Manager

## Live Demo
[Task Manager](https://task-manager-redux.surge.sh)

## Getting Started
### Run Locally
To run the project locally, use the following command:
```sh
npm run dev
```

### Deploy to Production
1. Build the project:
   ```sh
   npm run build
   ```
2. Copy `index.html` in the `dist` folder and rename it to `200.html`:
   ```sh
   cp dist/index.html dist/200.html
   ```
3. Deploy using Surge:
   ```sh
   surge ./dist
   ```

## Tech Stack
- **React + TypeScript** - Frontend framework & language
- **Redux Toolkit** - State management
- **Axios Interceptor** - API data fetching
- **Tailwind CSS, DaisyUI, ShadCN** - Styling and UI components

## Pages
1. **Login:** Users can log in to their account.
2. **Register:** Users can create a new account.
3. **Tasks:** Displays all tasks created by the logged-in user.

## Features
- **User Authentication:** Create and manage user accounts.
- **Task Management:**
  - Add new tasks
  - Edit existing tasks
  - Delete tasks
  - Mark/unmark tasks to track completion status

## License
This project is licensed under the MIT License.

