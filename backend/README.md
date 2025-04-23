# E-Commerce Microservices Backend

This directory contains the microservices that make up the e-commerce platform backend.

## Microservices Architecture

The system consists of the following microservices:

1. **API Gateway Service** - Entry point for client requests
2. **User Service** - Handles user management
3. **Product Service** - Manages product catalog
4. **Order Service** - Processes orders
5. **Payment Service** - Handles payment processing
6. **Notification Service** - Sends notifications

## Message Broker Configuration (AWS SNS)

The microservices communicate with each other using an event-driven approach with AWS SNS.

### AWS Setup

1. Create an AWS account if you don't have one
2. Create an IAM user with programmatic access and SNS permissions
3. Get your AWS Access Key ID and Secret Access Key
4. Create a `.env` file in each microservice directory based on the `.env.example` files

### Development Setup

1. Install dependencies for all services:

```bash
# From the backend directory
cd api-gateway && npm install
cd ../user-service && npm install
cd ../product-service && npm install
cd ../order-service && npm install
cd ../payment-service && npm install
cd ../notification-service && npm install
```

2. Configure environment variables:
   - Copy each `.env.example` file to `.env` in each microservice directory
   - Fill in your AWS credentials

3. Start the microservices:

```bash
# Start the API Gateway
cd api-gateway && npm run start:dev

# In a new terminal, start the User Service
cd user-service && npm run start:dev

# Start other services similarly
```

## Testing Event Communication

### Send an event from API Gateway

1. Make sure both API Gateway and User Service are running
2. Send a POST request to publish an event:

```bash
curl -X POST http://localhost:3001/events/publish \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "user-created-topic",
    "type": "USER_CREATED",
    "data": {
      "userId": "123",
      "email": "user@example.com",
      "name": "Test User"
    }
  }'
```

3. Check the logs in both services to see the event being published and received

## Running in Production

For production deployment, consider:

1. Using Amazon ECS or EKS for container orchestration
2. Setting up proper IAM roles and security
3. Using AWS Secrets Manager for sensitive configuration
4. Implementing a proper health check system
5. Setting up monitoring with CloudWatch

## Architecture Diagram

```
┌─────────────┐      ┌─────────────────┐
│             │      │                 │
│  Clients    │─────▶│   API Gateway   │
│             │      │                 │
└─────────────┘      └────────┬────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │              │
                      │   AWS SNS    │
                      │              │
                      └──────┬───────┘
                             │
       ┌───────────┬─────────┼─────────┬───────────┐
       │           │         │         │           │
       ▼           ▼         ▼         ▼           ▼
┌─────────────┐ ┌─────────┐ ┌─────┐ ┌─────────┐ ┌─────────────┐
│             │ │         │ │     │ │         │ │             │
│ User        │ │ Product │ │Order│ │ Payment │ │ Notification│
│ Service     │ │ Service │ │Svc  │ │ Service │ │ Service     │
│             │ │         │ │     │ │         │ │             │
└─────────────┘ └─────────┘ └─────┘ └─────────┘ └─────────────┘
```