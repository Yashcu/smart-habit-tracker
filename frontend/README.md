# Smart Habit Tracker

A modern, full-stack habit tracking app with streak analytics, built with React (Vite) frontend and Node/Express/MongoDB backend.

## Features
- User registration & login (JWT auth)
- Create, view, and delete habits
- Daily/weekly habit tracking
- Streak tracking and check-in history
- Visual analytics (streak chart)
- Responsive, modern UI (Tailwind CSS, Framer Motion)
- Secure backend (rate limiting, helmet, validation)
- API documentation (Swagger/OpenAPI)

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Winston, Helmet, express-validator, Swagger

## Getting Started

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file with `MONGO_URI=your_mongodb_uri` and `JWT_SECRET=your_secret`
4. `npm run dev` (or `npm start`)
5. API docs at [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Testing
- Backend: `npm test` (Jest)
- Frontend: (add tests with Jest/React Testing Library)

## License
MIT
