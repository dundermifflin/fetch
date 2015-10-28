module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: [
          'public/**/app.js',
          'public/**/services.js'
          'public/**/*.js'
        ],
        dest: 'public/dist/concatted.js'
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      build: {
        src: 'public/dist/concatted.js',
        dest: 'public/dist/uglified.js'
      }
    },

    jshint: {
      files: [
        'Gruntfile.js', 'app/**/*.js', '**/*.js'
      ],
      options: {
        force: 'false',
        ignores: 'public/dist/**/*.js'
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/dist/prodMin.css': 'public/**/*.css'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: [
          'app/public/**/*.js',
          'app/public/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/**/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      herokuDeployPush: {
        command: 'git push heroku master'
      },
      herokuLogs: {
        command: 'heroku logs --tail --app fetch-app'
      },
      herokuOpen: {
        command: 'heroku open --app fetch-app'
      },
      clean: {
        command: 'rm -rf app/public/dist'
      }
    },


  }); // end init config

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('test', []);

  grunt.registerTask('deploy', function() {
    if (grunt.option('live-test')) {

    } else if (grunt.option('live-for-real')) {

    } else {

    }
  });

}; // end of gruntfile
