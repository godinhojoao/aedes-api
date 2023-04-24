<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description
A GraphQL API consumed in two applications, one mobile and the other web, that the main purpose is to
control the cases of Aedes aegypti mosquitoes in the city of Bagé in Rio Grande do Sul, Brazil.

### This API has some features, for example:
- Authentication (under development)
  - Sign up
  - Sign in
- CRUD on some domain models: (under development)
  - Accounts
  - Reports
- Storing data on PostgreSQL database.

### Architecture and folder structure
- Following clean architecture principles, developing the layers separately from each other.
- Core: The "domain" layer.
- Application: The "application" layer.
- Infra: The "infrastructure" layer.
- Controllers: The "presentation" layer.

## Installation

```bash
$ nvm install 18.13
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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
