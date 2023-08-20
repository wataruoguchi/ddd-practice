# DDD Practice

**_Disclaimer: I am in the middle of learning DDD. Do not think this is the best DDD/SOLID example._**

1. Following DDD practice.
1. Building in two approaches - Functional Programming (FP) / Object Oriented Programming (OOP).
1. Empowering Dependency Injection for DIP (Dependency Inversion Principle) from Clean Architecture.

## Preparation

```sh
npm install && npm run install
```

## Run app

The following command launches two servers.

```sh
npm run start
```

1. `http://localhost:3001` - OOP package
1. `http://localhost:3002` - FP package

You can try the app with the following example:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Luke", "lastName": "Skywalker"}' http://localhost:3001/issue
```

## TODOs

I left one thing in the codebase (just because I am too lazy.)

- Get DTO of Value Objects when getting DTO of Entities.
