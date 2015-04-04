# ACID-RESTful-OA

Webapp for testing [OpenAnnotation (OA) / JSON-LD servers](http://restful-open-annotation.github.io/spec/)

**How to use**: https://acid-restful-oa.herokuapp.com/

**Status**: very premature stuff

**Features**:

* Simple JSON-LD Schema validation using [this schema](https://raw.githubusercontent.com/restful-open-annotation/schema/master/json-schema-basic.json)

## Development

The dev stack is [Node.js](https://nodejs.org/), [React](http://facebook.github.io/react/), and [Express.js](http://expressjs.com/). The application is written in vanilla JavaScript.

The `master` branch contains deployables under `public/dist` and works out of the box to work locally or to deploy on Heroku. Just execute:

```bash
npm start
```

The `develop` branch contains no deployables. Start the application with:

```bash
npm run watch
```
