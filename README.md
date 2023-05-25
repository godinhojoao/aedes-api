<p align="center">
 <img src="./aedes-aegypti.png" width="200" alt="Aedes aegypti Logo"/>
</p>

## Description

- A GraphQL API consumed in two applications, one mobile and the other web. In which the main purpose is to control the cases of Aedes aegypti mosquitoes in the city of Bagé in Rio Grande do Sul, Brazil.
- Aedes-web: https://github.com/godinhojoao/aedes-web
- Aedes-app: not done yet
- About Aedes Aegypti: https://www.ecdc.europa.eu/en/disease-vectors/facts/mosquito-factsheets/aedes-aegypti

### This API has some features, for example:

- Authentication (under development)
  - Sign up
  - Sign in
- CRUD on some domain models: (under development)
  - Accounts
  - Reports
- Storing data on PostgreSQL database.

### I know that folder structure is not important for architectural reasons. But in this case will be easier to understand the architecture.

### Architecture and folder structure
- Following clean architecture principles, developing the layers separately from each other.
- Domain: The "domain" layer.
- Application: The "application" layer.
- Infra: The "infrastructure" layer.
- Controllers: The "presentation" layer.

## Installation

```bash
$ nvm install 18.15
$ nvm use
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests1
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations && seeds

```bash
# Generates a new migration based on changes detected in your Prisma schema and applies it to the database
$ npm run prisma:migrate:dev

# Reset all the database migrations based on schema and then run all migrations
$ npm run prisma:migrate:reset

# Run all seeds
$ npm run prisma:seed

# Run all migrations and seeds, verifying schema again
$ npm run reset-db
```
