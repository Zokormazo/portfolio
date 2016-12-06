module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      validate: ['Gruntfile.js', 'src/js/**.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    concat: {
      build: {
        src: ['src/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      production: {
        src: ['src/js/*.js'],
        dest: 'tmp/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['dist/js/<%= pkg.name %>.js']
        }
      },
      production: {
        files: {
          'production/js/<%= pkg.name %>.min.js': ['tmp/js/<%= pkg.name %>.js']
        }
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      build: {
        files: {
          'dist/css/<%= pkg.name %>.css': 'src/scss/<%= pkg.name %>.scss'
        }
      },
      production: {
        files: {
          'tmp/css/<%= pkg.name %>.css': 'src/scss/<%= pkg.name %>.scss'
        }
      }
    },
    cssmin: {
      build: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
        }
      },
      production: {
        files: {
          'production/css/<%= pkg.name %>.min.css': 'tmp/css/<%= pkg.name %>.css'
        }
      }
    },
    pug: {
      build: {
        options: {
          data: function(dest, src) {
            return require('./src/pug/' + String(src).split(/[\\/]/).pop().slice(0,-4) + '.json');
          }
        },
        files: {
          'dist/index.html': 'src/pug/index.pug',
          'dist/skills.html': 'src/pug/skills.pug',
          'dist/contact.html': 'src/pug/contact.pug',
          'dist/legal.html': 'src/pug/legal.pug'
        }
      },
      production: {
        options: {
          data: function(dest, src) {
            return require('./src/pug/' + String(src).split(/[\\/]/).pop().slice(0,-4) + '.json');
          }
        },
        files: {
          'tmp/index.html': 'src/pug/index.pug',
          'tmp/skills.html': 'src/pug/skills.pug',
          'tmp/contact.html': 'src/pug/contact.pug',
          'tmp/legal.html': 'src/pug/legal.pug'
        }
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhiteSpace: true
      },
      production: {
        files: {
          'production/index.html': 'tmp/index.html',
          'production/skills.html': 'tmp/skills.html',
          'production/contact.html': 'tmp/contact.html',
          'production/legal.html': 'tmp/legal.html'
        }
      }
    },
    copy: {
      build: {
        files: [{
            expand: true,
            cwd: 'src/images',
            src: '**',
            dest: 'dist/images/'
          },{
            expand: true,
            cwd: 'src',
            src: 'robots.txt',
            dest: 'dist/'
          },{
            expand: true,
            cwd: 'src',
            src: 'sitemap.xml',
            dest: 'dist/'
          }
        ]
      },
      production: {
        files: [
          {
            expand: true,
            cwd: 'src/images',
            src: '**',
            dest: 'production/images/'
          },{
            expand: true,
            cwd: 'src',
            src: 'robots.txt',
            dest: 'production/'
          }
        ]
      }
    },
    replace: {
      production_html: {
        src: ['tmp/*.html'],
        dest: 'tmp/',
        replacements: [{
          from: 'normalize.css',
          to: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css'
        },{
          from: 'jquery.min.js',
          to: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
        },{
          from: 'jquery.scrollify.min.js',
          to: 'https://cdnjs.cloudflare.com/ajax/libs/scrollify/1.0.7/jquery.scrollify.min.js'
        },{
          from: 'js.cookie.js',
          to: 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.3/js.cookie.min.js'
        },{
          from: '/skills.html',
          to: '/skills'
        },{
          from: '/contact.html',
          to: '/contact'
        },{
          from: '/legal.html',
          to: '/legal'
        }]
      },
      production_sitemap: {
        src: ['src/sitemap.xml'],
        dest: 'production/',
        replacements: [{
          from: '/skills.html',
          to: '/skills'
        },{
          from: '/contact.html',
          to: '/contact'
        },{
          from: '/legal.html',
          to: '/legal'
        }]
      }
    },
    clean: {
      production_pre: ['tmp/', 'production/'],
      production_post: ['tmp/']
    },
    watch: {
      javascript: {
        files: ['src/js/*.js'],
        tasks: ['jshint:validate', 'concat:build']
      },
      uglify: {
        files: ['dist/js/<%= pkg.name %>.js'],
        tasks: ['uglify:build'],
        options: {
          livereload: true
        }
      },
      sass : {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass:build']
      },
      css: {
        files: ['dist/css/<%= pkg.name %>.css'],
        tasks: ['cssmin:build'],
        options: {
          livereload: true
        }
      },
      pug: {
        files: ['src/pug/**/*.pug'],
        tasks: ['pug:build'],
        options: {
          livereload: true
        }
      }
    },
    express: {
      develop: {
        options: {
          hostname: 'localhost',
          port: '3000',
          bases: ['dist', 'node_modules/jquery/dist', 'node_modules/normalize.css', 'node_modules/jquery-scrollify', 'node_modules/js-cookie/src/'],
          livereload: true
        }
      }
    },
    open: {
      develop: {
        path: 'http://localhost:<%= express.develop.options.port %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('validate', ['jshint:validate']);
  grunt.registerTask('build', ['concat:build', 'uglify:build', 'sass:build', 'cssmin:build', 'pug:build',
                               'copy:build']);
  grunt.registerTask('default', ['validate', 'build', 'express:develop', 'open:develop', 'watch']);
  grunt.registerTask('production', ['clean:production_pre', 'validate', 'concat:production', 'uglify:production', 'sass:production',
                                    'cssmin:production', 'pug:production','replace:production_html', 'htmlmin:production', 'replace:production_sitemap',
                                    'copy:production', 'clean:production_post']);
};
