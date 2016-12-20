# Megaphone App

The official app for Megaphone Magazine, helps customers find and pay vendors on the streets of Vancouver and Victoria, BC. You can use this code under MIT license and make the necessary changes to make it work with your street paper and your city.

This app is built with Ember and can be packaged for iOS and Android using Cordova.

## Prerequisites

You will need the following things properly installed on your computer:

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [Cordova](https://cordova.apache.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Building the Ember App

* `ember build` (development)
* `ember build --environment production` (production)

### Building the Cordova App

* Create a new Cordova project
* You'll need the following plugins:
  * CardIO: `card.io.cordova.mobilesdk`
  * Notification: `cordova-plugin-dialogs`
  * Geolocation: `cordova-plugin-geolocation`
  * Google Universal Analytics Plugin: `cordova-plugin-google-analytics`
  * Mixpanel: `cordova-plugin-mixpanel`
  * Splashscreen: `cordova-plugin-splashscreen`
  * StatusBar: `cordova-plugin-statusbar`
  * Whitelist: `cordova-plugin-whitelist`
  * PushPlugin: `phonegap-plugin-push`
* Copy the built ember app to the root of the cordova project (www folder)
* Build the app for your desired platform:
  * `cordova build ios --release`
  * `cordova build android --release`

## Further Reading / Useful Links

* [Megaphone Magazine](http://www.megaphonemagazine.com/)
