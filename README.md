# AI Notepad Tutorial from Elliot Chong's Youtube Channel

## Status

TODOs: investigate whether React-Query is needed with Next14 server actions

## Shadcn UI library

1. requires initialization with components.json and globals.css
2. install components directly and customize as needed

## Clerk Auth

1. To make the route accessible to both signed in and signed out users, pass `publicRoutes: ["/"]` to authMiddleware
2. Add env vars for signIn, signUp, afterSignIn, and afterSignup to control behavior of components and navigation

## NextJS

1. catch-all routes: app/sign-up/[[...sign-up]]/page.tsx => add ellipsis inside brackets to extend dynamic segment
2. Pages can access dynamic segment content through destructuring the params prop

## Tailwind

1. apply tailwind styles to globals.css using the apply annotation (@apply)

## Drizzle-ORM

1. Typescript ORM library for managing databases
2. schemas can be organized into one file src/db/schema.ts or grouped src/db/schema/[file.ts]

## React-Query

1. Helps manage client state with server side mutations to the database and data sync from api endpoints
2. client uses axios for data requests to api endpoints

## Debounce

1. custom hook to add time delay to auto-save capability
2. Instead of writing to db after each change to editor state, add a time delay before each save

## OpenAI

1. DALLE2 image urls expire after one hour
