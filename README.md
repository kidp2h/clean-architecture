# Clean Architecture With NestJS

## Information

![CI](https://github.com/kidp2h/clean-architecture/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/kidp2h/clean-architecture/graph/badge.svg?token=MR0T1Q3VO3)](https://codecov.io/gh/kidp2h/clean-architecture)

## Description

This repo implemented clean architecture with unit test, e2e test, ci, etc. You can use it as a template

Besides, this still implemented SOLID principle

![Clean architecture](https://github.com/kidp2h/clean-architecture/blob/main/.assets/clean-architecture.png?raw=true)
![Clean architecture](https://github.com/kidp2h/clean-architecture/blob/main/.assets/clean-architecture-2.png?raw=true)

### Some docs maybe useful (Updating ...)

![Example 1](https://github.com/kidp2h/clean-architecture/blob/main/.assets/example1.png?raw=true)
I implemented this architecture base on this book
[Book Bob Martin](https://github.com/kidp2h/clean-architecture/blob/main/.assets/book.pdf?raw=true)

## In Progress

- [ ] Add prisma database, so we can easily between typeorm to prisma and vice versa without change code or business layer
- [ ] Add Dockerfile
- [ ] Apply some patterns and more example SOLID
- [ ] Add repo frontend (Next.JS), which will apply clean architecture (maybe)

## Installation

```bash
$ pnpm install
$ cp .env.development.example .env.development
$ pnpm run docker:up
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
