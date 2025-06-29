# 💼 Chama Management System

The **Chama Management System** is a full-stack web application built for managing group memberships and tracking member payments within a chama (informal savings group).

## 🛠️ Technologies Used

### 📦 Backend
- [Python 3.8+](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Flask-CORS](https://flask-cors.readthedocs.io/)
- [Flask-RESTful](https://flask-restful.readthedocs.io/) *(optional)*
- [Gunicorn (for production)](https://gunicorn.org/) *(optional)*

### 🖥️ Frontend
- [React (Vite)](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Material UI (MUI)](https://mui.com/)

## 📁 Project Structure

chama-app/
├── client/ # React frontend (Vite)
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── App.jsx
│ └── package.json
├── server/ # Flask backend
│ ├── routes.py
│ ├── app.py
│ ├── config.py
│ └── requirements.txt
└── README.md

# How to Run The Backend
 - export FLASKAPP=server.app
 - flask db init
 - flask db migrate -m"initial migration"
 - flask upgrade head 
 - Python seed.py
 - flask run

 # How to run Frontend 
 - cd client 
 - npm install
 - npm run dev #React Dev Server 

 # Features
 - Admin login system

 - Add new members

 - View all registered members

 - Delete members

 -  Loan features future update 

 # Future Improvements

 - Add member contribution tracking

 - Monthly reports or charts

 - SMS or email notification for payments

 - JWT-based authentication (beyond mock token)