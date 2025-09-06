
# Voxto – Real-Time Chat Application 💬

A **full-stack real-time chat application** built with the **MERN stack** and **Socket.IO**, allowing seamless one-to-one messaging with text and image sharing.  
Designed with a modern, responsive UI using **Tailwind CSS**, featuring dynamic user presence, unseen message tracking, and smooth real-time updates.

---

## ✨ Features

- **Authentication & Security**
  - User **sign-up, login, and logout** with **JWT-based authentication**.
  - Secure profile management and data handling.

- **Real-Time Messaging**
  - Instant **one-to-one messaging** powered by Socket.IO.
  - **Online/Offline user status** detection.
  - Unseen messages are **dynamically highlighted** until viewed.

- **Media Support**
  - Send and receive **images** using Cloudinary integration.
  - Smooth file uploads with responsive display.

- **Modern UI**
  - **Searchable sidebar** for easy user navigation.
  - Clean **chat bubbles** with timestamps.
  - **Auto-scrolling chat window** for smooth conversations.

- **Scalable Backend**
  - MongoDB for **efficient data storage**.
  - REST API design for flexible and maintainable backend logic.

---

## 🛠 Tech Stack

| Layer          | Technology                     |
|----------------|--------------------------------|
| **Frontend**   | React, Tailwind CSS            |
| **Backend**    | Node.js, Express.js            |
| **Database**   | MongoDB                         |
| **Real-Time**  | Socket.IO                       |
| **Image Storage** | Cloudinary                  |
| **State Management** | React Context API        |
| **Version Control** | Git, GitHub                |

---

## 📂 Folder Structure

```
chatApp/
│
├── client/                # Frontend (React + Tailwind CSS)
│   ├── src/
│   ├── public/
│   ├── node_modules/      # Ignored by Git
│   └── .env               # Environment variables (ignored)
│
├── server/                # Backend (Node.js + Express + Socket.IO)
│   ├── src/
│   ├── node_modules/      # Ignored by Git
│   └── .env               # Environment variables (ignored)
│
└── .gitignore
```

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/chatApp.git
cd chatApp
```

---

### 2. Install Dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd ../server
npm install
```

---

### 3. Set Up Environment Variables

Create a `.env` file in both the `client/` and `server/` directories.

#### Example `.env` for server:
```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
```

#### Example `.env` for client:
```
REACT_APP_API_URL=http://localhost:5000
```

---

### 4. Run the Application

#### Start the Backend
```bash
cd server
npm run dev
```

#### Start the Frontend
```bash
cd client
npm start
```

---

## 🚀 Usage

1. **Sign up** for a new account or **log in** with existing credentials.  
2. Search for users in the sidebar.  
3. Start a **one-to-one conversation**:
   - Send text messages.
   - Upload and send images.
4. View **real-time online/offline status** of other users.
5. Unseen messages will be **highlighted dynamically** until read.

---

## 📸 Screenshots

| **Login Page** | **Chat Interface** |
|----------------|--------------------|
| ![Login](https://via.placeholder.com/300x200.png?text=Login+Page) | ![Chat](https://via.placeholder.com/300x200.png?text=Chat+Interface) |

> *(Replace the placeholder links with actual screenshots once available.)*

---

## 📝 Scripts

| Command             | Description                      |
|---------------------|----------------------------------|
| `npm start`         | Start the client app             |
| `npm run dev`       | Start the backend in dev mode    |
| `npm run build`     | Build the client for production  |

---

## 🔐 .gitignore Configuration

Already configured to ignore sensitive and unnecessary files:
```
client/node_modules/
server/node_modules/
client/.env
server/.env
dist/
build/
logs/
```

---

## 🤝 Contributing

Contributions are welcome!  
1. Fork the repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Added new feature"
   ```
4. Push to your branch:  
   ```bash
   git push origin feature-name
   ```
5. Submit a Pull Request.

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to use and modify as per your needs.

---

## 👨‍💻 Author

**Meiyarasan P**  
- LinkedIn: [linkedin.com/in/mei-prakash-08975b292](https://linkedin.com/in/mei-prakash-08975b292)  
- GitHub: [github.com/Meiprakash](https://github.com/Meiprakash)

