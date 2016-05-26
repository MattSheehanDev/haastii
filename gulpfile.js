var gulp = require('gulp');
var less = require('gulp-less');
var ts = require('gulp-typescript');
var changed = require('gulp-changed');
var watch = require('gulp-watch');
var del = require('del');


gulp.task('default', ['copy_bootstrap', 'compile_less', 'compile_ts_node', 'compile_ts_common'], function() {
		return;
});


gulp.task('copy_bootstrap', ['copy_bootstrap_css', 'copy_bootstrap_js'], function () {
    return;
});

gulp.task('copy_bootstrap_css', function () {
    return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('copy_bootstrap_js', ['copy_jquery_js'], function () {
    return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest('./public/javascripts'));
});
gulp.task('copy_jquery_js', function () {
    return gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./public/javascripts'));
});


gulp.task('watch', function () {
    watch('./public/stylesheets/**/*.less', function () {
	gulp.start('compile_less');
    });
    watch('./public/javascripts/**/*.ts', function () {
	gulp.start('compile_ts_common');
    });
    watch(['app.ts', './routes/**/*.ts'], function () {
	gulp.start('compile_ts_node');
    });
});


gulp.task('clean', function () {
		return del([
				'app.js',
				'routes/**/*.js',
				'node_modules/**',
				'public/javascripts/**/*.js',
				'public/stylesheets/**/*.css'
		]);
});

gulp.task('compile_less', function () {
    return gulp.src('./public/stylesheets/**/*.less')
    .pipe(changed('./public/stylesheets', {extension: '.css'}))
    .pipe(less())
    .pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('compile_ts_node', function () {
    var src = gulp.src([
				'./Scripts/typings/**/*.ts',
				'app.ts',
				'./routes/**/*.ts'
    ], {base: "./"}).pipe(ts({
				typescript: require('typescript'),
				target: 'ES5',
				moduleResolution: 'node'
    }));

    src.js.pipe(gulp.dest('./'));
});


gulp.task('compile_ts_common', function () {
    var src = gulp.src([
				'./Scripts/typings/**/*.ts',
				'./public/javascripts/**/*.ts'
    ], {base: './'}).pipe(ts({
				typescript: require('typescript'),
				target: 'ES5'
    }));

		src.js.pipe(gulp.dest('./'))
});
