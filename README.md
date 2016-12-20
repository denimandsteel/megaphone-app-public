# Megaphone App

The official app for Megaphone Magazine, helps customers find and pay vendors on the streets of Vancouver and Victoria BC. You can use this code under MIT license and make the necessary changes to make it work with your street paper and your city.

This app is built with Ember and can be packaged for iOS and Android using Cordova.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

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
  * CardIO: card.io.cordova.mobilesdk 2.0.2 
  * Notification: cordova-plugin-dialogs 1.2.1
  * Geolocation: cordova-plugin-geolocation 2.1.0
  * Google Universal Analytics Plugin: cordova-plugin-google-analytics 0.8.1
  * Mixpanel: cordova-plugin-mixpanel 2.1.0
  * Splashscreen: cordova-plugin-splashscreen 3.1.0
  * StatusBar: cordova-plugin-statusbar 2.1.3
  * Whitelist: cordova-plugin-whitelist 1.2.2
  * PushPlugin: phonegap-plugin-push 1.6.4
* Copy the built ember app to the root of the cordova project (www folder)
* Build the app for your desired platform:
  * `cordova build ios --release`
  * `cordova build android --release`

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* [Cordova](https://cordova.apache.org/)
* [Megaphone Magazine](http://www.megaphonemagazine.com/)
