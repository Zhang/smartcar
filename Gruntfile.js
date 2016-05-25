'use strict';

module.exports = (grunt) => {
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
  grunt.registerTask('test', () => { grunt.task.run('mochaTest:test'); });
};
