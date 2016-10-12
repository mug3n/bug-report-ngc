var gulp = require('gulp'),
    tslint = require('gulp-tslint'),
    _ = require('lodash');

/**
 * Run tslint on all ts files and print report
 *
 * @param opts
 * @return {any}
 */
function tsLintTask(opts) {
    var defaultOptions = {
            src: ['./**/*.ts']
        },
        options = _.merge(defaultOptions, opts === undefined ? {} : opts);

    return gulp.src(options.src)
        .pipe(tslint({
            configuration: global.gulpOpts.getProjectRoot() + '/tslint.json',
            formatter: "prose"
        }))
        .pipe(tslint.report({
            emitError: false
        }));
}

module.exports = tsLintTask;