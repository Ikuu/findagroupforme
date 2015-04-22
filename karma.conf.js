module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'client/assets/libs/angular.js',
      'client/assets/libs/lodash.js',
      'client/assets/libs/angular-*.js',
      'client/assets/libs/datetimepicker.js',
      'tests/client/unit/libs/angular-mocks.js',
      'client/app/**/*.module.js',
      'client/app/app.js',
      'client/app/**/*.js',
      'tests/client/unit/modules/**/*.spec.js',

      // Mock Data
      'tests/client/unit/mocks/**/*.js'
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
