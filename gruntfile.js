/**
	grunt插件分为两类。
	第一类是grunt团队贡献的插件，这些插件的名字前面都带有“contrib-”前缀，而且在插件列表中有星号标注。
	第二类是第三方提供的插件，不带有这两个特征。
		Contrib-jshint——javascript语法错误检查；
		Contrib-watch——实时监控文件变化、调用相应的任务重新执行；
		Contrib-clean——清空文件、文件夹；
		Contrib-uglify——压缩javascript代码
		Contrib-copy——复制文件、文件夹
		Contrib-concat——合并多个文件的代码到一个文件中
		karma——前端自动化测试工具
**/

'use strict';
// 包装函数 
module.exports = function(grunt) {
	// 使用该插件，就不需要手动grunt.loadNpmTasks其他以grunt-*开头的插件，详情请看http://www.tuicool.com/articles/yABV73
	require('load-grunt-tasks')(grunt);

	// 配置任务，所有插件的配置信息
	grunt.initConfig({

		// 获取 package.json 信息
		pkg: grunt.file.readJSON('package.json'),

		// Run 'grunt bower' in terminal to load the Bower dependencies
		bower: {
			install: {
				options: {
					targetDir: './app/vendor',
					cleanTargetDir: true,
					layout: 'byComponent'
				}
			}
		},

		clean: {
	    	//Cleaning bower_components is required to remove references to old components, which can interfere with bower being able to find
	    	//a suitable version of a component
	    	bower: [ 'bower_components' ],
	    	develop: [ 'build/develop' ],
		},

		// sass
		sass: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'app',
						src: ['features/**/*.scss', 'components/**/*.scss', 'styles/*.scss'],
						ext: '.css',
						dest: 'build/develop'
					}
				]
			}
		},

		// 配置uglify插件，压缩js
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd")%> */\n'
			},
			build: {
				src: 'app/components/*.js',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.min.js'
			}
		},

		// 配置cssmin插件，压缩css
		cssmin: {
			options: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.css <%=gurnt.template.today("yyyy-mm-dd")%> */\n'
			},
			build: {
				src: 'app/styles/default.css',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.min.css'
			}
		},

		// 配置jshint插件，js语法
		jshint: {
			build: ['gruntfile.js', 
			'server/*.js',
			'app/*.js',
			'app/components/*.js', 
			'app/features/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// 配置csslint插件，css语法
		csslint: {
			build: ['app/styles/*'],
			options: {
				csslintrc: '.csslintrc'
			}
		},

		// 配置watch插件，自动检测修改
		watch: {
			// build: {
			// 	files: ['server/server.js', 'app/scripts/*', 'app/styles/*'],
			// 	tasks: ['jshint', 'csslint'],
			// 	options: { spawn: false }
			// }
			html: {
				files: ['app/**/*.html'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['server/*.js', 
				'app/*.js', 
				'app/components/*.js', 
				'app/features/*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['app/**/*.scss'],
				tasks: ['sass:build', 'csslint'],
				options: {
					livereload: true,
					spawn: false
				}
			}
		},

		nodemon: {
			dev: {
				file: 'server/server.js',
				args: [],
				ignoreFiles: ['README.md', 'node_modules/**', '.DS_Store'],
				watchedExtensions: ['js'],
				watchedFolders: ['./'],
				debug: true,
				delayTime: 1,
				env: {
					PORT: 5000
				},
				cwd: __dirname
			}
		},

		// Typescript
		ts: {
			options: {
				compiler: 'node_modules/typescript/bin/tsc',
				module: 'amd',
				removeComments: false,
				target: 'es5',
				sourceMap: true,
				noImplicitAny: true
			},

			build: {
				src: 'app/**/*.ts',
				outDir: 'build/develop'
			},

			watch: {
				src: 'app/**/*.ts',
				watch: 'app',
				outDir: 'build/develop'
			}
		},

		concurrent: {
			tasks: ['nodemon', 'watch', 'ts:watch', 'sass:build'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	// 注册任务
	grunt.registerTask('build', ['clean:develop', 'ts:build', 'sass:build']);
	grunt.registerTask('develop', ['concurrent']);
	grunt.registerTask('update', ['bower', 'build']);
	// grunt.registerTask('compress js', ['jshint', 'uglify']);
	// grunt.registerTask('compress css', ['csslint', 'cssmin']);
};