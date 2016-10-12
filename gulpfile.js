var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    tslint = require("gulp-tslint"),
    notify = require("gulp-notify"),
    buildBrowserify = require('ionic-gulp-browserify-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    sass2Watch = [
        './components/*_component/*.scss',
        './components/*_component/**/*.scss',
    ],
    ts2Watch = [
        './components/*_component/*.ts',
        './components/*_component/**/*.ts',
    ];

var tsLintCb = function (file) {
    return gulp.src(file.path)
        .pipe(notify({
            title: "tsLint",
            message: "Starting"
        }))
        .pipe(tslint({
            configuration: 'tslint.json',
            formatter: "prose"
        }))
        .pipe(tslint.report({
            emitError: false
        }))
        .pipe(notify({
            title: "tsLint",
            message: "Finished"
        }));
};

/** Lint all typescript files in project */
gulp.task('tslint', function () {
    return gulp.src(ts2Watch)
        .pipe(tslint({
            configuration: 'tslint.json',
            formatter: "prose"
        }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task('copyFonts', function () {
    gulp.src([
        "node_modules/ionic-angular/fonts/*.ttf",
        "node_modules/ionic-angular/fonts/*.woff",
        "node_modules/ionic-angular/fonts/*.woff2"
    ]).pipe(gulp.dest('static/fonts'));
});

gulp.task('sass', function () {
    gulp.src('static/scss/app.scss')
        .pipe(sass({
            includePaths: [
                'node_modules/ionic-angular',
                'node_modules/ionicons/dist/scss'
            ]
        }))
        .pipe(sourcemaps.init())
        .on('error', function (err) {
            console.error(err.message);
            this.emit('end');
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('static/css'))
        .pipe(browserSync.stream());

});

gulp.task('bundle', function (done) {
    buildBrowserify({
        watch: false,
        src: ['./preview.ts', './typings/index.d.ts'],
        outputPath: './static/js/',
        outputFile: 'app.bundle.js'
    })
        .on('end', function () {
            setTimeout(function () {
                browserSync.reload();
            }, 500);

            done();
        });
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: "."
    });
});

gulp.task('default', ['copyFonts', 'sass'], function () {

    gulp.start(['bundle', 'browserSync']);

    gulp.watch(ts2Watch, function (file) {
        tsLintCb(file);
        gulp.start(['bundle']);
    });

    gulp.watch(sass2Watch, ['sass']);
    gulp.watch("index.html").on('change', browserSync.reload);
});
