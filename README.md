Honours Project Back-End
=========
Location-based group and activity finder.

Install
-----------
```sh
git clone http://github.com/Ikuu/findagroupforme
npm install
Fill in server/config/auth.js Social Network details
```

Requires MongoDB to be installed.

Test
-----------
Currently there are three different test commands. 

To test the server run:
```sh
mocha
```

To run the AngularJS unit tests run:
```sh
npm test
```

To run the AngularJS e2e tests run:
```sh
npm run webdriver
npm run protractor
```

Tech
-----------
This project makes use of a number of open source projects:

* [Mongoose] - Elegant mongodb object modeling for node.js
* [Express] - Fast node.js network app framework
* [AngularJS] - Superheroic JavaScript MVW framework
* [node.js] - Evented I/O for the backend

[node.js]:http://nodejs.org
[express]:http://expressjs.com
[mongoose]:http://mongoosejs.com/
[AngularJS]:https://angularjs.org/
