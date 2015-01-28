'use strict';

module.exports = function(grunt) {
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			css: {
				 // your sass files that will be watched
				 // one file ['assets/sass/style.scss']
				 // all files ['assets/sass/**/*'] 
				files: ['sass_files'], 
				tasks: ['compass', 'cssmin']
			},
			js: {
				 // your js files that will be watched
				 // one file ['assets/js/scripts.js']
				 // all files ['assets/js/**/*'] 
				files: ['js_files'],
				tasks: ['uglify']
			}
		},
		// The task compass will compile all sass files in css, and will read config.rb
		compass: {
			dist: {
				options: {
					force: true,
					config: 'config.rb'
				}
			}
		},
		cssmin: {
			options: {
				banner: '<%= banner %>'
			},
            
			build: {
				// Takes all css files and minify
				// You can set up all files [assets/css/**/*]
				src: 'css_directory/**/*',
				// Set up where the new file will be created [dir/style.css]
				dest: 'directory/style.css'
			}
		},
		uglify: {
			options: {
				mangle: false,
				banner: '<%= banner %>'
			},
            
			dist: {
				files: {
					// Takes all libraries files as jquery, backbone, angular and others and creates into one
					// Set up your js directory and your vendor directory where is all libraries
					'js_directory/plugins.js': [ 'vendor_direcotry/*.js' ],
					// Takes all js files and creates into one
					// Set up your js directory and your js directory and the directory that will takes all js files
					'js_directory/scripts.js': [ 'js_directory/*.js' ]
				}
			}
		},
		// Create a banner to insert within css and js files
		banner:
			"/** \n" +
			"* Theme Name: <%= pkg.title %> \n" +
			"* Theme URI: <%= pkg.homepage %> \n" +
			"* Description: <%= pkg.description %> \n" +
			"* Author: <%= pkg.author.name %> \n" +
			"* Author URI: <%= pkg.author.url %> \n" +
			"* Version: <%= pkg.version %> \n" +
			"**/" +
			"\n"        

	});
	
	// Default task will execute watch task
	grunt.registerTask( 'default', [ 'watch' ] );

	// Init task waill execute compass, cssmin and uglify
	grunt.registerTask( 'init', [ 'compass', 'cssmin', 'uglify' ] );
};