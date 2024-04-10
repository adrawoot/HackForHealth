# Minimal Google Maps API

### By **Phil Mass**

## Description
_This is a minimal JavaScript Webpack project for setting up and incorporating the google maps API in a website._

_It uses the great [load-google-maps-api package](https://www.npmjs.com/package/load-google-maps-api) npm package to initialize the google maps API. The package's loadGoogleMapsApi() function returns a promise which resolves to the google maps object required to create google maps. This project also uses dotenv-webpack to protect the google maps API key_

## Setup and Installation

To build the project
* Clone the project from https://github.com/philrmass/minimal-google-maps-api.git to a local directory
* In a terminal, go into the root project directory and install the dependencies with:
```console
npm install
```
* Get an API key from the [Google Maps JavaScript API site](https://developers.google.com/maps/documentation/javascript/get-api-key)
* Create a file named .env in the root project directory of your project with the following content (replacing the X's with your actual API key)
```console
GOOGLEMAPS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
```
* Build the project with:
```console
npm run build 
```
* Build and start up the project on a development server with:
```console
npm run start
```
* Or, if you are on Windows, use:
```console
npm run winstart
```
It should open the application in a browser window at the address **localhost:8080**, where you can test out the app. You should see something like this:

![ScreenShot](/img/screenShot.png)

## Support and Contact Details

If you have any issues or questions, please email me at philrmass@gmail.com

## Technologies

_Created using JavaScript. Built with Webpack, Babel, ESLint, DotEnv, and the load-google-maps-api package_

## Legal

Copyright (c) 2019 Phil Mass
