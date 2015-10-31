/***********[ Testing and running grunt! ]************

Dundermiff menu:
 *  'grunt test' : Runs jshint, starts a local nodemon using server.js

 *  'grunt test -testOnline' :  Runs jshint, concats and uglifies and mins your files, pushes to heroku-test1.
                                Opens the app in a new chrome windows, and shows you logs in shell.
    !!! --> crtl+c to cancel out of heroku logs!

 *  'grunt test -scrumMaster' :  Does all the same as above, but for real on the live server.



Future users:
1. Please make sure you have the heroku toolbelt installed.
2. Log into your heroku server, and make sure the pointers
   to heroku apps in the 'shell' config are correct.

******************************************************/
'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'app/public/**/app.js',
                    'app/public/**/services.js',
                    'app/public/**/*.js'
                ],
                dest: 'app/public/dist/concatted.js'
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        uglify: {
            build: {
                src: 'app/public/dist/concatted.js',
                dest: 'app/public/dist/uglified.js'
            }
        },

        jshint: {
            files: [
                'Gruntfile.js', 'app/**/*.js', '**/*.js'
            ],
            options: {
                force: 'false',
                ignores: ['app/public/dist/**/*.js', 'node_modules/**/*.js']
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'app/public/dist/prodMin.css': ['app/public/**/*.css']
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
                    'app/public/**/*.js'
                ],
                tasks: [
                    'jshint',
                    'concat',
                    'uglify'
                ]
            },
            css: {
                files: 'app/public/**/*.css',
                tasks: ['cssmin']
            }
        },

        shell: {
            herokuTestAddRemote: {
                command: ['git remote remove testOnline -f', 'git remote add testOnline https://git.heroku.com/fetch-test1.git'],
            },
            herokuTestPush: {
                command: 'git push testOnline master'
            },
            herokuTestLogs: {
                command: 'heroku logs --tail --app fetch-test1'
            },
            herokuTestOpen: {
                command: 'heroku open --app fetch-test1'
            },
            herokuDeployPush: {
                command: 'git push heroku master'
            },
            herokuDeployLogs: {
                command: 'heroku logs --tail --app fetch-app'
            },
            herokuDeployOpen: {
                command: 'heroku open --app fetch-app'
            },
            clean: {
                command: 'rm -rf app/public/dist'
            },
            localServer: {
                command: 'nodemon server.js'
            }
        }

    }); // end init config

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('testLocal', [
        'jshint', 'shell:localServer'
    ]);

    grunt.registerTask('build', [
        'shell:clean', 'jshint', 'concat', 'uglify', 'cssmin'
    ]);

    grunt.registerTask('scrumMaster', [
        'shell:herokuDeployPush', 'shell:herokuDeployOpen', 'shell:herokuDeployLogs'
    ]);

    grunt.registerTask('testOnline', [
        'shell:herokuTestPush', 'shell:herokuTestOpen', 'shell:herokuTestLogs'
    ]);







    grunt.registerTask('test', function() {
        if (grunt.option('testOnline')) {
            grunt.task.run(['build']);
            grunt.task.run(['testOnline']);

        } else if (grunt.option('scrumMaster')) {
            grunt.task.run(['build']);
            grunt.task.run(['scrumMaster']);

        } else {
            grunt.task.run(['testLocal']);
        }
    });

}; // end of gruntfile
