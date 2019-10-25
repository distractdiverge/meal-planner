# Meal Planner
A simple application to help plan meals for the week.

## Features
 * Make use of what is available in the pantry.
 * Create balanced healthy meals.
 * Make use of an existing inventory of available meals.
 * Select certain dinners based on if lunch is needed the next day.
 * Integrate with online services for existing meals and nutrition details:
    * [Wegmans](https://dev.wegmans.io/)
    * [MyFitnessPal](https://www.myfitnesspal.com/api)

## Components
 * Infrastructure (via [Pulumi](https://www.pulumi.com/))
    * Production [AWS](https://aws.amazon.com/)
    * Local [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
 * Application ([Typescript](https://www.typescriptlang.org/))

## Getting Started (local development)
 1. Clone this Repo
    ```
    git clone git@github.com:alexlapinski/meal-planner.git
    ```
 2. Install Dependencies
    ```
    cd ./meal-planner/
    npm install
    ```
 3. Start Local Infrastructure
    ```
    docker-compose up -d
    ```
 4. Start Application
    ```
    npm start
    ```

## Running Tests
There are three types of tests for this project.

1. Unit Tests
   ```
   npm test
   ```
2. Integration Tests
   ```
   npm run test:int
   ```
3. Infrastructure Tests
   ```
   cd ./infrastructure/
   npm test
   ```

## Infrastrcture
TBD
