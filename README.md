# Addis Software Songs App - Frontend

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file in the `Frontend/` directory:
     ```env
     REACT_APP_BACKEND_URL=http://localhost:5002
     ```
   - Make sure the backend server is running on the specified port (default: 5002).

3. **Start the development server:**
   ```bash
   npm start
   ```
   - The app will run at [http://localhost:3001](http://localhost:3001) by default.

4. **Build for production:**
   ```bash
   npm run build
   ```

## Running Tests

This project uses **Jest** and **React Testing Library** for unit and component tests.

### Setup (if not already installed)

Install the required dev dependencies:
```bash
npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react @testing-library/react @testing-library/jest-dom
```

### Run all tests
```bash
npm test
```
Or, if you want to run Jest directly:
```bash
npx jest
```

### Test files
- Component and unit tests are located alongside their components, e.g.:
  - `src/pages/Homepage.test.js`
  - `src/pages/PostSongs.test.js`

### Example
- The `Homepage` test checks that the search bar and song list render, and that filtering works.
- The `PostSongs` test checks that the form renders and accepts input.

### Troubleshooting
- If you see errors about `import` statements or JSX, make sure your `.babelrc` includes both `@babel/preset-env` and `@babel/preset-react`.
- If you need a sample Jest config, add a `jest.config.js`:
  ```js
  module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };
  ```

## Webpack Configuration
- The app uses a custom `webpack.config.js` for development and production builds.
- Key features:
  - **Entry point:** `src/index.js`
  - **Output:** Bundles to `dist/` with content hashes for cache busting.
  - **Dev Server:**
    - Runs on port 3001
    - `historyApiFallback: true` for React Router support (enables client-side routing)
    - Hot Module Replacement enabled
  - **Loaders:**
    - Babel for JS/JSX (with Emotion support)
    - CSS and asset loaders for images
  - **Plugins:**
    - `HtmlWebpackPlugin` for HTML template
    - `dotenv-webpack` for environment variables

## AI Usage
- **No AI is used in the runtime application.**
- If you are reading this as part of a code review or project setup, AI (such as ChatGPT) may have been used to assist in code generation, refactoring, or documentation, but the deployed app itself does not use AI for its features.

## Features
- Song list with search, add, edit (modal), delete, and detail view
- State management with Redux Toolkit and Redux Saga
- Styling with Emotion
- Routing with React Router v6
- Toast notifications for user feedback

---

# Addis Software Songs App - Backend

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables (optional):**
   - By default, the backend runs on port 5002. You can set a custom port by creating a `.env` file:
     ```env
     PORT=5002
     ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node index.js
   ```
   - The server will run at [http://localhost:5002](http://localhost:5002) by default.

## API Endpoints

- **Base URL:** `/songs`

| Method | Endpoint         | Description           |
|--------|------------------|----------------------|
| GET    | `/songs`         | Get all songs        |
| POST   | `/songs`         | Create a new song    |
| PUT    | `/songs/:id`     | Update a song        |
| DELETE | `/songs/:id`     | Delete a song        |

- All data is stored in-memory (see `models/songModel.js`).
- Example song fields: `title`, `artist`, `album`, `year`, `genre`, `coverUrl`, etc.

## CORS
- CORS is enabled for `http://localhost:3001` and `http://localhost:3000` by default (see `index.js`).
- If you need to allow other origins, update the `corsOptions` in `index.js`.

## Environment Variables
- `PORT`: The port the server runs on (default: 5002).

---
    HomePage Tests:

        Render with mock Redux store containing sample songs

        Test search functionality

        Test favorite toggle

        Test navigation

        Test empty state

    PostSongs Tests:

        Test form rendering

        Test form validation

        Test successful submission

        Test navigation after submission