# 🛒 SkySync – E-Commerce Microservice SaaS Platform

SkySync is a modern, cloud-native e-commerce SaaS solution built with the **MERN** stack and a microservices architecture, designed to scale effortlessly on Kubernetes. The platform facilitates seamless product management, order processing, user authentication, and payment handling—empowered by robust monitoring, cloud deployment, and CI/CD pipelines.

> This repository is split into backend and frontend services for clarity.

---

## 🏗️ Architecture Overview


SkySync Architecture Diagram
![image](https://github.com/user-attachments/assets/77a12681-aa5e-4329-ab1d-9525a4cb83aa)

- Microservices: User, Product, Order, Payment Gateway  
- API Gateway + Load Balancer  
- MongoDB for service-specific data handling  
- Kubernetes for orchestration  
- CI/CD via GitHub + Cloud Router  
- Monitoring via CloudWatch & Cloud Monitoring  

---

# 🔧 Backend – `@skysync/backend`

## 🚀 Tech Stack

- **Node.js** + **Express** – Core API logic  
- **MongoDB** + **Mongoose** – Database layer  
- **JWT** – Auth & session management  
- **Serverless Framework** – Deploys to AWS Lambda-compatible environments  
- **Kubernetes** – Container orchestration  
- **Winston** – Structured logging  
- **Docker** – Containerization  
- **CI/CD** – GitHub Actions → Cloud Router → Kubernetes rolling updates  


