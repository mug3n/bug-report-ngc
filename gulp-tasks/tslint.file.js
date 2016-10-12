var gulp = require('gulp'),
    notify = require('gulp-notify'),
    tslint = require('gulp-tslint');

/**
 * TSLint callback to app on saved file
 *
 * @param file {Vinyl}
 * @return {*}
 */
function tsLintCb(file) {
    return gulp.src(file.path)
        .pipe(notify({
            title: "tsLint",
            message: "Starting"
        }))
        .pipe(tslint({
            configuration: global.gulpOpts.getProjectRoot() + '/tslint.json',
            formatter: "prose"
        }))
        .pipe(tslint.report({
            emitError: false
        }))
        .pipe(notify({
            title: "tsLint",
            message: "Finished"
        }));
}

module.exports = tsLintCb;