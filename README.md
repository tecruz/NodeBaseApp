# NodeBaseApp
![Node.js CI](https://github.com/tecruz/NodeBaseApp/workflows/Node.js%20CI/badge.svg) 
[![codecov](https://codecov.io/gh/tecruz/NodeBaseApp/branch/master/graph/badge.svg)](https://codecov.io/gh/tecruz/NodeBaseApp)

Base application for modern web development. Backend made in NodeJs and frontend in React.

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


