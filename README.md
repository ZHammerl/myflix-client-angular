# MyFlixAngularClient

## Description

This project uses **Angular**, **Angular Material** and **TypeScript** to create the client-side, which interacts with the server-side [REST API and database](https://github.com/ZHammerl/movie_api) on the backend.

## Objective

This project was built to experience the differences between Angular and React (previously built client-side, see [here](https://github.com/ZHammerl/myFlix-client))

## Learnings

### ...from using Angular (vs. React)
I enjoyed setting up and working through the project with Angular. Although at first it might feel overwhelming seeing the amount of files and the determined file structer when setting up the project (and it takes its time to understand the different parts and files), once you get an overview it is easier to follow the code then in React. The clear separation of concerns in Angular just makes it easier understandable, whereas in React you need to work towards it.

Another very comfortable point is the easy access to UI libraries (here I used Angular Material) and other third party integrations, which were easy to integrate since either built-in or built-for Angular. This way you don't run into dependency incompatibility issues as often as in React. This way it was more fun and I like the outcome a lot better than the React version.

### ...from using Typedoc
following the instruction from the Typedoc documentation I quickly ran into the problem that typedoc would only generate documentation from my readme file but not the actual app. I tried with a typedoc config file and adding entrypoints into the tsconfig, but it didn't change anything. My search on google didn't give me a solution to my problem and I asked a colleague who gave me the best tipp. Using the command 

```bash
  npx typedoc --entryPointStrategy expand ./src 
```
did the trick. Eventhough I had defined this entrypoint strategy previously in the config file, this made the difference.

## User Stories
* As a user, I want to be able to receive information on movies, directors, and genres so that I
can learn more about movies I’ve watched or am interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Key Features
* Welcome view with login form and registration form for new users
* Once authenticated, the user can view all movies
* on button click ​director dialog opens,​ where details about the director of that particular movie will be displayed
* on button click genre dialog opens,​ where details about that particular genre of the movie will be displayed
* on button click synopsis dialog opens,​ where details about that particular movie will be displayed
* on button click add or remove movie to or from the favorite movies list
* profile view with:
    * user data
    * button to open form to change user data
    * button to delete profile
    * list of favorite movies with button to remove movie from the favorite movies list

## User Flow Chart

![flowchart](https://user-images.githubusercontent.com/108287700/216327264-ef7a9d46-5cb7-4a3c-8309-ea87f43d732a.png)



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
#
