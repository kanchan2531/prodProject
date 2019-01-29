## Frontend
> Frontend is developed with [AngularJS](https://angularjs.org/) & [Bootstrap 4](https://getbootstrap.com/)

Command to run in dev:
``` bash
# serve with hot reload at localhost:8080
grunt ui --target=frontend
```

## Backend
Command to run in dev:
``` bash
# will run backend at localhost:8081
grunt ui --target=backend
```

## Server
Command to run in dev:
``` bash
# runs server at localhost:1337
nodemon app.js
```

## Production
Commands to build 
``` bash
# build for backend
grunt ui --target=backend --production

# build for frontend
grunt ui --target=frontend --production
```
# prodProject
