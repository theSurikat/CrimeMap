// set up gulp and packages
var gulp 				= require('gulp'),
	sass 				= require('gulp-sass'),
	concat 				= require('gulp-concat'),
	jshint              = require('gulp-jshint'),
    uglify 				= require('gulp-uglify'),
    notify              = require('gulp-notify'),
    html_replace        = require('gulp-html-replace');


// location constants
var ALL_SCSS 			= './assets/styles/sass/*.scss',
	ALL_CSS 			= './assets/styles/css/*.css',
	DEST_CSS			= './assets/styles/css/',

	ALL_JS_LIB			= './assets/js/lib/*.js',
	ALL_JS_CORE			= './assets/js/*.js',
	DEST_JS_CORE		= './assets/js',

    ALL_HTML            = './**/*.html';
    DEST_HTML           = './';

// convert sass to css
gulp.task('sass', function(){
	gulp.src(ALL_SCSS)
        .pipe(sass())
        .pipe(gulp.dest(DEST_CSS))
        .pipe(notify({ message: 'sass complete' }));
});

// jshint js
gulp.task('jshint', function(){
    gulp.src([ALL_JS_CORE, '!./assets/js/plugins.js', '!./assets/js/audio.js']) // UNTIL AUDIO IS DONE
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'jshint complete' }));
});

// concat & uglify js
gulp.task('js', ['jshint',], function(){
	gulp.src([ALL_JS_CORE, '!./assets/js/audio.js'])     // UNTIL AUDIO IS DONE
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DEST_JS_CORE));
});

// corrects imports
gulp.task('html-imports', function(){
    gulp.src(ALL_HTML)
        .pipe(html_replace({
            'dev_js_index': './assets/js/bundle.min.js',
        }))
        .pipe(gulp.dest(DEST_HTML));
});

// watch and compile sass
gulp.task('watch', function(){
    gulp.watch('./assets/styles/sass/**/*.scss',['sass']);
});

// compile sass and minify js
gulp.task('build', ['sass', 'js']);

gulp.task('default', function(){});