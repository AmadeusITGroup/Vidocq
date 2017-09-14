# Vidocq

[![Build Status](https://secure.travis-ci.org/AmadeusITGroup/Vidocq.svg?branch=master)](http://travis-ci.org/AmadeusITGroup/Vidocq)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
[![GitHub Issues](https://img.shields.io/github/issues/AmadeusITGroup/Vidocq.svg)](https://github.com/AmadeusITGroup/Vidocq/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Vidocq is a Web-based UI to explore MongoDB. 

## Pre-requisites

1. This requires latest version of node and npm to be installed.

2. You also need to have a local mongo server installed and running on the default port.
https://docs.mongodb.com/manual/installation/

3. Install angular-cli (https://cli.angular.io/)

## Starting steps

### Install dependencies

```npm install```

### Start the mongo server (if connection in local needed)

```sudo service mongod start``` 

### Start the rest server

```node server/index.js --watch server```

### Run the UI

```npm start```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help for Angular CLI

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Proxy

We use the angular cli proxy (proxy.conf.json) to redirect to the express server.

```
{
  "/databases": {
    "target": "http://localhost:3000/"
  },
  "/collections": {
    "target": "http://localhost:3000/"
  },
  "/count": {
    "target": "http://localhost:3000/"
  },
  "/find": {
    "target": "http://localhost:3000/"
  },
  "/aggregate": {
    "target": "http://localhost:3000/"
  },
  "/server": {
    "target": "http://localhost:3000/"
  },
  "/export": {
    "target": "http://localhost:3000/"
  }
}
```

## License
MIT



