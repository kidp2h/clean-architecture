![CI](https://github.com/kidp2h/clean-architecture/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/kidp2h/clean-architecture/graph/badge.svg?token=MR0T1Q3VO3)](https://codecov.io/gh/kidp2h/clean-architecture)

## Description

This repo implemented clean architecture with unit test, e2e test, ci, etc. You can use it as a template

![Clean architecture](https://github.com/kidp2h/clean-architecture/blob/main/.assets/clean-architecture.png?raw=true)

## In Progress

- [ ] Add prisma database, so we can easily between typeorm to prisma and vice versa without change code or business layer

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
