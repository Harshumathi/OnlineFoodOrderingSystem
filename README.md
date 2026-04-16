# FDA (Food Delivery Application)

Full-stack **Online Food Ordering System** built with **Spring Boot + MySQL** (backend) and **Next.js + React + TypeScript** (frontend).

## Features
- **Auth**: register + login
- **Menu browsing**: fetch menu items by restaurant
- **Checkout**: place an order

## Tech stack
- **Frontend**: Next.js, React, TypeScript
- **Backend**: Spring Boot (Gradle), Spring Data JPA
- **DB**: MySQL

## Repo structure
- `bd/FoodDeliveryApplicationPro/` — backend (Spring Boot)
- `fd/food-delivery-frontendpro/` — frontend (Next.js)

## GitHub / single-repo setup
This repository contains **both frontend and backend in one repo** (a simple monorepo layout). Run commands from the repo root using the paths shown above.

### .gitignore (recommended)
Make sure you have a **root** `.gitignore` that ignores generated build artifacts for both apps (examples: `node_modules/`, `.next/`, `.gradle/`, `**/build/`).

If you already pushed build output (for example `.next/` or `build/`), add the ignore rules and then untrack them:

```bash
git rm -r --cached fd/food-delivery-frontendpro/.next
git rm -r --cached bd/FoodDeliveryApplicationPro/build
git rm -r --cached bd/FoodDeliveryApplicationPro/.gradle
```

## Run locally

### Prerequisites
- **Node.js** (LTS recommended) + **npm**
- **Java 21** (backend uses a Java 21 toolchain)
- **MySQL** running locally

### 1) Database (MySQL)
Create a database named:
- `fooddeliverydb`

Backend DB config is in `bd/FoodDeliveryApplicationPro/src/main/resources/application.properties`:
- `spring.datasource.url=jdbc:mysql://localhost:3306/fooddeliverydb`
- `spring.datasource.username=root`
- `spring.datasource.password=root`

Update these values to match your local MySQL credentials.

### 2) Backend (Spring Boot)
From the repo root:

```bash
cd bd/FoodDeliveryApplicationPro
./gradlew bootRun
```

Windows PowerShell:

```bash
cd bd/FoodDeliveryApplicationPro
.\gradlew.bat bootRun
```

The backend typically runs on `http://localhost:8080` (default Spring Boot port).

### 3) Frontend (Next.js)
From the repo root:

```bash
cd fd/food-delivery-frontendpro
npm install
npm run dev
```

Open `http://localhost:3000`.

## API endpoints (current)
Base URL: `http://localhost:8080`

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login a user |
| GET | `/api/menu/{restaurantId}` | Get menu by restaurant id |
| POST | `/api/orders/checkout` | Place an order |

## Notes
- **CORS**: backend controllers currently allow requests from `http://localhost:3000`.
- **Auth implementation**: current login compares passwords directly (demo-style). For production, use hashed passwords + proper auth (JWT/session).

## Useful commands

### Frontend
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

### Backend
- `./gradlew test`
- `./gradlew bootRun`

