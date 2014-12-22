module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'client/assets/libs/angular.js',
      'client/assets/libs/lodash.js',
      'client/assets/libs/angular-*.js',
      'client/assets/libs/angular-mocks.js',
      'client/app/app.js',
      'client/app/modules/**/*.module.js',
      'client/app/**/*.js',
      'ngTest/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ]

  });
};
