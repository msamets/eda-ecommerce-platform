# Event-Driven E-commerce Platform

A modern, scalable e-commerce platform built with microservices architecture, event-driven communication, and containerized deployment.

## Project Overview

This project implements a full-stack e-commerce platform using event-driven architecture with microservices. The system is designed to be scalable, maintainable, and resilient, leveraging modern technologies and best practices.

### Key Features

- **Microservices Architecture**: Independent services for different business domains
- **Event-Driven Communication**: Asynchronous messaging between services using AWS SNS
- **Containerized Deployment**: Docker for consistent development and production environments
- **CI/CD Pipelines**: Automated build, test, and deployment workflows
- **Modern Frontend**: Responsive and interactive UI built with React and TypeScript
- **Persistent Storage**: PostgreSQL databases for each microservice

## Technology Stack

### Frontend
- **React**: UI library for building interactive user interfaces
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Redux/Context API**: State management
- **Styled Components/Material UI**: Styling and component library

### Backend
- **NestJS**: Progressive Node.js framework for building server-side applications
- **TypeORM**: ORM for database interactions
- **PostgreSQL**: Relational database for persistent storage
- **AWS SNS**: Pub/Sub messaging service for event-driven communication
- **JWT**: Authentication and authorization

### DevOps
- **Docker**: Containerization for consistent environments
- **Docker Compose**: Multi-container application orchestration
- **GitHub Actions**: CI/CD pipelines for automated workflows
- **ESLint/Prettier**: Code quality and formatting

## Architecture

The application follows a microservices architecture with event-driven communication:

                   ┌─────────────┐     ┌─────────────┐
                   │             │     │             │
                   │  Frontend   │◄───►│  API Gateway│
                   │  (React)    │     │  (NestJS)   │
                   │             │     │             │
                   └─────────────┘     └──────┬──────┘
                                              │
                                              ▼
                                      ┌──────────────┐
                                      │   AWS SNS    │
                                      │  (Pub/Sub)   │
                                      └───────┬──────┘
                                              │
                            ┌─────────────────┼─────────────────┐
                            │                 │                 │
                            ▼                 ▼                 ▼
                    ┌─────────────────┐ ┌─────────────┐ ┌─────────────────┐
                    │                 │ │             │ │                 │
                    │ User Service    │ │ Product     │ │ Order Service   │
                    │ (NestJS +       │ │ Service     │ │ (NestJS +       │
                    │  PostgreSQL)    │ │ (NestJS +   │ │  PostgreSQL)    │
                    │                 │ │ PostgreSQL) │ │                 │
                    └─────────────────┘ └─────────────┘ └─────────────────┘

## Microservices

The backend consists of several microservices, each responsible for a specific domain:

1. **User Service**: Handles user registration, authentication, and profile management
2. **Product Service**: Manages product catalog, inventory, and pricing
3. **Order Service**: Processes orders, payments, and fulfillment
4. **Notification Service**: Sends emails, SMS, and push notifications
5. **API Gateway**: Routes client requests to appropriate services

## Event-Driven Communication

Services communicate asynchronously through events published to AWS SNS topics:

- **UserCreatedEvent**: Triggered when a new user registers
- **ProductUpdatedEvent**: Triggered when product details or inventory changes
- **OrderPlacedEvent**: Triggered when a customer places an order
- **PaymentProcessedEvent**: Triggered when payment is successful

## Development Setup

## From here on it's under construction

### Prerequisites

- Node.js (v14+)
- Docker and Docker Compose
- AWS Account (for SNS)
- PostgreSQL (local or containerized)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eda-ecommerce-platform.git
   cd eda-ecommerce-platform
   ```

2. Start the development environment:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:3001
   - Service endpoints: See service documentation

## CI/CD Pipelines

The project includes several GitHub Actions workflows:

- **Build Pipeline**: Builds Docker images for all services
- **Test Pipeline**: Runs unit and integration tests
- **Lint Pipeline**: Ensures code quality with ESLint and Prettier
- **Deployment Pipeline**: Deploys to staging/production environments
