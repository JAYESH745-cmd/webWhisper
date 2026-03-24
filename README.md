🚀 WebWhisper

An AI-powered web interaction platform that delivers intelligent responses and enhances user productivity.

📌 Overview

WebWhisper is a full-stack AI-driven application that improves how users interact with web content. It uses modern technologies like Next.js, PostgreSQL, and serverless APIs to provide fast, scalable, and intelligent experiences.

✨ Features
🤖 AI-powered responses
⚡ Fast and responsive UI (Next.js)
🔐 Secure authentication (JWT + bcrypt)
📡 REST API architecture
🗄️ PostgreSQL with Prisma ORM
☁️ Serverless deployment (Vercel)
📊 Scalable architecture
🏗️ Tech Stack

Frontend

Next.js
TypeScript
Tailwind CSS

Backend

Next.js API Routes (Serverless)
Node.js

Database

PostgreSQL
Prisma ORM

Authentication

JWT (JSON Web Tokens)
bcrypt

Deployment

Vercel
📁 Project Structure

webwhisper/
│
├── ui/ # Next.js app (frontend + backend)
│ ├── src/
│ ├── prisma/
│ ├── public/
│ └── ...
│
├── README.md
└── ...

⚙️ Installation & Setup
1. Clone the repository

git clone https://github.com/your-username/webwhisper.git

cd webwhisper

2. Install dependencies

cd ui
npm install

3. Setup environment variables

Create a .env.local file inside /ui:

DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key

4. Setup database

npx prisma generate
npx prisma migrate dev

5. Run the development server

npm run dev



🚀 Deployment (Vercel)
Set Root Directory = ui
Add environment variables
Deploy 🚀
🧠 How It Works
User interacts with frontend
Requests go to Next.js API routes
Backend processes logic + database
AI response is generated
Result displayed instantly
🔐 Security
Password hashing with bcrypt
JWT-based authentication
Secure environment variables
📌 Future Improvements
🔄 Real-time AI streaming
📱 Mobile optimization
📊 Analytics dashboard
🔌 Plugin system
🤝 Contributing
Fork the repo
Create a branch
Make changes
Submit a PR
📄 License

MIT License

👤 Author

Jayesh Arora
