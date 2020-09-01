This is a working project. If you want to use it, please contact dfixel@santandertecnologia.com.ar

Also, this is a whole React project. To start a MICRO-FE project, go to https://gitlab.ar.bsch/santander-arq/react-micro-fe

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

First of all: 


`npm config set registry https://nexus-install-test-dev-nexus.apps.ocp.ar.bsch/repository/npm-public/`


`npm config set strict-ssl false`


## Available Scripts
--SEE PACKAGE.JSON--
In the project directory, you can run:


### `npm run start-development`

Runs the app in the development mode.<br />
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Lunch jest tests


### `npm build-development`
### `npm build-staging`
### `npm build-production`

Builds the app for selected enviroment. The pipeline build the project depending on which branch runs the pipeline<br />
Remember to put your enviroment variables in the .env files 

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

