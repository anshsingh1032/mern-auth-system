# 🔐 AuthFlow: Advanced MERN Authentication System

AuthFlow is a modern, full-stack authentication system built with the **MERN stack**, featuring secure user authentication, email verification, and password recovery workflows. **Authify** is designed to be scalable, secure, and production-ready using best practices.

---
## ⚡ The Live Application
<div align="center">

<p>Experience the fluid animations, glassmorphism UI, and responsive grid layout directly in your browser.</p>

<a href="https://authflow-6qew.onrender.com/" target="_blank">
  <img src="https://img.shields.io/badge/Experience_AuthFlow-FFFFFF?style=for-the-badge&logo=react&logoColor=black" alt="Experience AuthFlow" />
</a>

<br/>

</div>

---

### ✨ Key Features

* 🔐 User Registration with Email Verification
* 🔑 Secure Login & Logout
* 🔄 Password Reset via Email
* 🛡 JWT-based Authentication
* 📧 Nodemailer Email Integration
* 🧠 Redux Toolkit State Management
* 🔒 Protected Routes (Frontend + Backend)
* ⚡ Persistent Sessions
* 📱 Responsive UI-ready backend

---

# 🧰 Tech Stack

### Frontend

* **React**
* **Redux Toolkit**
* **React Router**
* **Axios**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**

### Authentication & Security

* **JWT (jsonwebtoken)**
* **bcrypt (^6.0.0)**
* **cookie-parser**

### Email Service

* **Nodemailer/Mailtrap**

### Developer Tools

* Git
* Node.js
* npm
* Prettier
* nodemon

---

## Folder Structure

```text
authFlow/
│
├── backend/
│ ├── db/
│ │ └── index.js
│ ├── controllers/
│ │ └── user.controller.js
│ ├── middleware/
│ │ └── auth.middleware.js
│ ├── models/
│ │ └── user.model.js
│ ├── routes/
│ │ └── user.routes.js
│ ├── nodemailer/
│ │ └── email.js
│ │ └── emailTemplate.js
│ │ └── nodemailer.config.js
│ ├── mailtrap/
│ │ └── email.js
│ │ └── emailTemplate.js
│ │ └── mailtrap.config.js
│ ├── utils/
│ │ └── ApiError.js
│ │ └── ApiResponse.js
│ │ └── AsyncHandler.js
│ │ └── generateTokenAndSetCookie.js
│ ├── app.js
│ ├── index.js
│ └── constants.js
│
├── frontend/
│ ├── src/
│ │ ├── store/
│ │ │ ├── store.js
│ │ │ └── authSlice.js
│ │ ├── pages/
│ │ │   ├── DashboardPage.jsx
│ │ │   ├── EmailVerificationPage.jsx
│ │ │   ├── ForgotPasswordPage.jsx
│ │ │   ├── ResetPasswordPage.jsx
│ │ │   ├── SignUpPage.jsx
│ │ │   └── LoginPage.jsx
│ │ ├── components/
│ │ │   ├── FloatingShape.jsx
│ │ │   ├── Input.jsx
│ │ │   └── PasswordStrengthMeter.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
├── README.md
├── .env
└── package.json (optional root config)
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/anshsingh1032/mern-auth-system
cd authFlow
```
###  2️⃣  Create .env file
```
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
VERIFICATION_TOKEN_SECRET=
VERIFICATION_TOKEN_EXPIRY=
TOKEN_SECRET=
TOKEN_EXPIRY=
SMTP_USER=your_email_address@example.com
SMTP_PASS=your_email_app_password
MAILTRAP_TOKEN=your_token
```
### 2. Root Configuration:
This project utilizes a root-level package.json to manage both the backend and frontend concurrently. Ensure your root package.json includes the following scripts:
```JSON
  "scripts": {
    "dev": "NODE_ENV=development nodemon backend/index.js",
    "start": "NODE_ENV=production node backend/index.js",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
  }
```
### 3. Install All Dependencies & Build:
Thanks to the custom build script, you can install dependencies for both the root (backend) and the frontend, and compile the React app in a single command. Run this from the root directory:

```Bash
npm run build
```

## Running the Application
### Development Mode
To run the backend server in development mode (with auto-reloading via nodemon):

```Bash
npm run dev
(You will still need to run npm start or npm run dev inside your frontend directory in a separate terminal to run the React development server).
```

### Production Mode
To run the application exactly as it would behave in a production environment (serving the built frontend files through the Node.js backend):

```Bash
npm start
```

## 📡 API Endpoints

### 🔐 Authentication Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST`   | `/api/v1/users/register` | Register a new user and send verification email | Public |
| `POST`   | `/api/v1/users/login` | Authenticate user and return JWT | Public |
| `POST`   | `/api/v1/users/login` | Logout user | Public |
| `GET`    | `/api/v1/users/verify-email/` | Verify user's email address | Public |
| `POST`   | `/api/v1/users/forgot-password` | Send password reset link to user's email | Public |
| `POST`    | `/api/v1/users/reset-password/:token` | Reset password using valid token | Public |
| `GET`    | `/api/v1/users/check-auth` | Check authentication| Private |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/anshsingh1032/mern-auth-system/issues) if you want to contribute.

### Steps to Contribute

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "feat: add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---


# 📜 Code of Conduct

Please follow respectful and collaborative behavior when contributing.

---

# 📄 License

This project is licensed under the **MIT License**.

---


## 👨‍💻 Author

**Ansh Singh**

* GitHub: [@anshsingh1032](https://github.com/anshsingh1032)
* LinkedIn: [ansh-singh-9592bb329](https://linkedin.com/in/ansh-singh-9592bb329)


---
