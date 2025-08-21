# 🏋️‍♂️ Full-Stack AI-Powered Fitness App

Welcome to the **AI-Powered Fitness App**, a cutting-edge platform designed to revolutionize fitness tracking and recommendations. This project combines **AI-driven insights**, **microservices architecture**, and a sleek **React + TypeScript frontend** to deliver a seamless user experience.

---

## 🚀 Features

### 🌟 Frontend (React + TypeScript + Vite)

- **Dynamic UI Animations**: Powered by `gsap` for smooth transitions and engaging user interactions.
- **Responsive Design**: Fully optimized for mobile and desktop users.
- **AI-Powered Recommendations**: Get personalized fitness insights directly on your dashboard.
- **Modern Tooling**: Built with Vite for blazing-fast development and HMR.

### 🛠️ Backend (Spring Boot Microservices)

- **Microservices Architecture**: Decoupled services for scalability and maintainability.
  - **Activity Service**: Tracks and manages user activities.
  - **AI Service**: Generates fitness recommendations using advanced AI models.
  - **User Service**: Handles user profile management.
  - **Keycloak**: OAuth2 authentication for secure access.
  - **Gateway**: Centralized API gateway with WebFlux security.
  - **Eureka**: Service discovery for seamless communication.
  - **Config Server**: Centralized configuration management.
- **MongoDB Integration**: Efficient data storage for activity tracking.
- **RabbitMQ**: Event-driven architecture for real-time updates.

---

## 🧠 How It Works

1. **User Activity Tracking**: Log your fitness activities via the frontend.
2. **AI-Powered Insights**: The AI service analyzes your data and provides actionable recommendations.
3. **Seamless Communication**: Microservices communicate via Eureka and RabbitMQ for real-time updates.
4. **Secure Access**: OAuth2 and WebFlux security ensure your data is safe.

---

## 🛠️ Tech Stack

### Frontend

- **React** + **TypeScript**
- **Vite** for fast builds
- **GSAP** for animations
- **TailwindCSS** for styling

### Backend

- **Spring Boot** (WebFlux, Data MongoDB, AMQP)
- **Spring Cloud** (Eureka, Config Server, Gateway)
- **PostgreSQL**, **MongoDB** for data storage
- **RabbitMQ** for messaging

---

## 🏗️ Architecture Overview

```plaintext
Frontend (React + Vite)
       |
       v
Gateway (Spring Cloud Gateway)
       |
       +--------------------+
       |                    |
  Eureka (Discovery)   Config Server
       |
       v
+----------------+   +----------------+   +----------------+
| ActivityService|   |   AIService    |   |  UserService   |
+----------------+   +----------------+   +----------------+
       |---------------------+                   |
       v                                         v
   MongoDB + RabbitMQ                         PostgreSQL
```

---

## 🛠️ Local Development

### Prerequisites

- **Node.js** (for frontend)
- **Java 24** (for backend)
- **PostgreSQL**, **MongoDB** and **RabbitMQ** running locally

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fitness-app.git
   cd fitness-app
   ```

2. Start the backend:

   - Open the project in IntelliJ IDEA or your preferred IDE.
   - Run keycloak server on port 8181.
   - Run rabbitmq server on port 5672.
   - Run the backend services in the following order:
     - `eureka`
     - `configserver`
     - `gateway`
     - `activityservice`
     - `userservice`
     - `aiservice`

   Ensure all services are running and connected to database and RabbitMQ.

3. Start the frontend:

   ```bash
   cd fitness-app-frontend
   npm install
   npm run dev
   ```

4. Access the app at `http://localhost:5173`.

---

## 🤖 AI-Powered Insights

The **AI Service** uses Gemini-2.0-Flash API to analyze your fitness data and provide:

- Personalized workout recommendations
- Insights into your progress
- Suggestions to optimize your routine

---

## 📂 Project Structure

### Frontend

- `src/components`: Core React components
- `src/style_components`: Styled components with animations

### Backend

- `activityservice`: Manages user activities
- `aiservice`: AI-driven recommendations
- `userservice`: User profile management
- `gateway`: API gateway with security
- `eureka`: Service discovery
- `configserver`: Centralized configuration

---

## 🛡️ Security

- **OAuth2 Resource Server**: Secure API endpoints.
- **CORS Configuration**: Ensures safe cross-origin requests.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Contributing

We welcome contributions! Feel free to open issues or submit pull requests.

---

## 📧 Contact

For questions or feedback, reach out at `heesy2024@gmail.com`.

---

### ⭐ If you find this project useful, give it a star on GitHub!
