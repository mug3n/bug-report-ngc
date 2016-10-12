var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourceMaps = require('gulp-sourcemaps'),
    _ = require('lodash');

function sassTask(opts) {
    if (opts === undefined) {
        throw new Error(
            "Basic options must be provided and include 'browserSync' property."
        );
    }
    var defaultOptions = {
            /** BrowserSync instance created in consumer module */
            browserSync: null,
            src: ['./app.component.scss'],
            dest: './iframe'
        },
        options = _.merge(defaultOptions, opts);

    gulp.src(options.src)
        .pipe(sass())
        .pipe(sourceMaps.init())
        .on('error', function (err) {
            console.error(err.message);
            this.emit('end');
        })
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(options.dest))
        .pipe(options.browserSync.stream());
}

module.exports = sassTask;