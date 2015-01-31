'use strict';

module.exports = function(grunt) {
  var path = require('path');

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    vite: {
      app: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },
    express: {
      options: {
        port: process.env.PORT || 9000,
        hostname: 'localhost'
      },
      dev: {
        options: {
          script: './server/index.js',
          livereload: true,
          serverreload: true,
          bases: ['<%= vite.app %>'],
          // debug: true,
          open: 'http://<%= express.options.hostname %>:<%= express.options.port %>'
        }
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: require('./server/config/local.env')
    },
    wiredep: {
      app: {
        src: ['<%= vite.app %>/home.html'],
        ignorePath: '<%= vite.app %>'
      }
    },
    // watch tasks
    watch: {
      options: {
        livereload: true
      },
      express: {
        files: 'server/{,/*,**/}*.js',
        tasks: ['express:dev'],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      scripts: {
        files: ['<%= vite.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint:client']
      },
      styles: {
        files: [
          '<%= vite.app %>/styles/{,*/}*.css'
        ],
        tasks: ['copy:styles', 'autoprefixer']
      }
      // injectCss: {
      //   files: ['<% vite.app %>/styles/{,*/}*.css'],
      //   tasks: ['injector:css']
      // }
    },
    jshint: {
      client: ['<%= vite.app %>/scripts/{,*/}*.js']
    },
    // inject files deps
    injector: {
      options: {
        template: '<%= vite.app %>/home.html',
        ignorePath: '<%= vite.app %>'
      },
      css: {
        files: {
          '<%= vite.app %>/home.html': [
            '<%= vite.app %>/styles/{,*/}*.css',
            // '!<%= vite.app %>/styles/main.css',
            '!<%= vite.app %>/styles/main.old.css',
            '!<%= vite.app %>/styles/editor.old.css' // main css is for static home page
          ]
        }
      },
      js: {
        options: {
          sort: (function() {
            var priority = function(path) {
              var match = path.match(/module.js/);
              return (match && match['index']) ? parseInt(match['index']) || 0 : 0;
            };
            return function(a, b) {
              return priority(b) - priority(a);
            };
          })()
        },
        files: {
          '<%= vite.app %>/home.html': [
            '<%= vite.app %>/scripts/{,*/,**/}*.js',
            '!<%= vite.app %>/scripts/app.js',
            '!<%= vite.app %>/scripts/account/{,*/,**/}*.js',
            '!<%= vite.app %>/scripts/editor/{,*/,**/}*.js',
            '!<%= vite.app %>/scripts/shared/{,*/,**/}*.js'
          ]
        }
      }
    },
    copy: {
      styles: {
        expand: true,
        cwd: '<%= vite.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'copy:styles'
      ]
    },
    clean: {
      server: '.tmp'
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },
  });

  grunt.registerTask('serve', function(target) {
    grunt.task.run([
      'clean:server',
      'env:all',
      'concurrent:server',
      'injector',
      'wiredep',
      'autoprefixer',
      'express:dev',
      'watch'
    ]);
  });
}
