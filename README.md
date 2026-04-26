# Church Website (HKBP Kernolong) - Sprint 1

This project is the implementation of Sprint 1 for the Church Website, focusing on the Home Page with dynamic site configuration.

## Features
- **Frontend**: React (Vite) + Tailwind CSS.
- **Backend**: Golang (Gin) + MySQL.
- **Design System**: "The Reverent Echo" - Premium, formal, and spiritual aesthetic.
- **Dynamic Data**: Church name, logo, and navigation menus are fetched from the backend.

## Project Structure
- `/frontend`: React application.
- `/backend`: Go application.
- `/prd`: Product Requirements Document.
- `/uidesign`: Design guidelines and reference HTML.

## Prerequisites
- Node.js (v18+)
- Go (v1.20+)
- MySQL

## How to Run

### 1. Database Setup
Create a database named `church_db` and run the migration script:
```bash
mysql -u root -p church_db < backend/migrations/001_init_schema.sql
```

### 2. Backend
```bash
cd backend
export DB_DSN="user:password@tcp(127.0.0.1:3306)/church_db?parseTime=true"
go run cmd/main.go
```
The backend will run on `http://localhost:8080`.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Implementation Details
- **The Reverent Echo**: Implemented using custom Tailwind tokens, glassmorphism for the header, and tonal layering for cards.
- **Dynamic Site Config**: The frontend consumes `GET /api/v1/public/site-config` to render the church identity and navigation menu.
- **Responsive Design**: Fully mobile-friendly layout.
