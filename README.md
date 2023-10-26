# AI Notepad Tutorial from Elliot Chong's Youtube Channel

## Status

2:22:32 Finish dashboard and set up firebase to store image

## Shadcn UI library

1. requires initialization with components.json and override of globals.css
2. install components directly and customize as needed

## Clerk Auth

1. To make the route accessible to both signed in and signed out users, pass `publicRoutes: ["/"]` to authMiddleware
2. To prevent Clerk authentication from running at all, pass `ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/"]` to authMiddleware
3. Pass a custom `afterAuth` to authMiddleware, and replace Clerk's default behavior of redirecting unless a route is included in publicRoutes
4. Add env vars for signIn, signUp, afterSignIn, and afterSignup to control behavior of components and navigation

## NextJS

1. catch-all routes: app/sign-up/[[...sign-up]]/page.tsx => add ellipsis inside brackets to extend dynamic segment
2. Pages can access dynamic segment content through destructuring the params prop

## Tailwind

1. apply tailwind styles to globals.css using the apply annotation (@apply)

## Drizzle-ORM

1. Typescript library for managing databases
2. schemas can be organized into one file src/db/schema.ts or grouped src/db/schema/[file.ts]

## Drizzle-Kit

1. migrations toolkit for schema updates and a database browser - Drizzle Studio
2. Drizzle Studio requires a configuration file (drizzle.config.ts) with specs for driver, schema, and dbConnection
3. requires ES6 target in compiler options for tsconfig
4. [push] command lets you push schema changes directly to the databse without managing SQL migration files

- requires a configuration file path (config option, default=drizzle.config.ts) and the config includes a connectionString

5. NextJs only reads env vars from files within /src. Since default config path for drizzle-kit config file is "@/drizzle.config.ts" it can't access env vars

- install dotenv for access outside of src

6. [studio] command launches the database browser locally from the drizzle config

- requires the pg package for a PostgreSQL client to manage the database

## React-Query

1. Helps manage client state with server side mutations to the database and data sync from api endpoints
2. client uses axios for data requests to api endpoints
3. TODO: investigate whethere either libraries are needed with Next13 server actions

## Debounce

1. custom hook to add time delay to auto-save capability
2. Instead of writing to db after each change to editor state, add a time delay before each save

## OpenAI

1. DALLE2 image urls expire after one hour
