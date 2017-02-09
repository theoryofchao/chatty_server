# Chatty (Doge-y) Project

Single page chat client built using Express React and WS websockets. Includes doge(s) and cool cat(s).

## Technical Approach & Objectives

Develop understanding of how data flows and how functions are called via React to create a one-page application. This builds
our understanding of this JS framework and allows us to build apps that no longer need to refresh. On top of that, we use the websocket protocol in order to allow users to talk to each other live (as opposed to HTTP, which would've required us to do high rates of polling
or simply refresh to see new messages.)

## Getting Started

1. Fork and clone your fork of this repository. Do the same for the Chatty server.
2. Install dependencies: `npm install` or `npm i` for short.
3. Start the web server from the command line: `npm start`, also do the same for the `webserver`.
4. Open the app on <http://localhost:3000/> and make sure that it's loading.

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)