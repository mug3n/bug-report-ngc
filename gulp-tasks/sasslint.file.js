var gulp = require('gulp'),
    notify = require('gulp-notify'),
    sassLint = require('gulp-sass-lint');

function sassLintCb(file) {
    return gulp.src(file.path)
        .pipe(notify({
            title: "sassLint",
            message: "Starting"
        }))
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(notify({
            title: "sassLint",
            message: "Finished"
        }));
}

module.exports = sassLintCb;