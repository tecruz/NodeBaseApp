# NodeBaseApp
![Node.js CI](https://github.com/tecruz/NodeBaseApp/workflows/Node.js%20CI/badge.svg) 
[![codecov](https://codecov.io/gh/tecruz/NodeBaseApp/branch/master/graph/badge.svg)](https://codecov.io/gh/tecruz/NodeBaseApp)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/e812052c85ad478d9322a69d6a5638ee)](https://www.codacy.com/manual/tecruz/NodeBaseApp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tecruz/NodeBaseApp&amp;utm_campaign=Badge_Grade)

Base application for modern web development. Backend made in [Express](https://expressjs.com/) and frontend in [React](https://reactjs.org/).

Add .env file to backend directory with your configurations:

```.env
MONGODB_URI='mongodb+srv://your_database_server'
PORT=3003
TEST_MONGODB_URI='mongodb+srv://your_test_database_server'
SECRET = 'your_secret'
```

Open terminal:
- cd backend
- npm install
- npm start dev

Backend running on http://localhost:3003/.

Now in other terminal run the frontend:
- cd frontend
- npm install
- npm start

Application running on http://localhost:3000/.


