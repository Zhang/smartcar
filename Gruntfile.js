'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: false
        },
        src: ['test/**.js']
      }
    }
  });

  grunt.registerTask('test', function() {
    grunt.task.run('mochaTest:test');
  });
};
