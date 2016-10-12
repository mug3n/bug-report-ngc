var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    exec = require('child_process').exec,

    sass2Watch = ['./**/*.scss'],
    ts2Watch = ['./**/*.ts'],

    /* -- Rollup dependencies -- */
    rollup = require('rollup').rollup,
    commonjs = require('rollup-plugin-commonjs'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    uglify = require('rollup-plugin-uglify'),

    bundleDev = require('./gulp-tasks/bundle.dev'),
    sassTask = require('./gulp-tasks/sass.task'),
    tsLintTask = require('./gulp-tasks/tslint.task'),
    sassLintCb = require('./gulp-tasks/sasslint.file'),
    tsLintCb = require('./gulp-tasks/tslint.file');


/* -------------------------------------------------------------------------- |
 |  ** General methods / tasks **                                             |
 | -------------------------------------------------------------------------- */

// TODO  for production build remove all files and leave ony iframe folder

/**
 * Symlink shared components into - dirty hack
 *
 * @param successCallback
 * @private
 */
function _symlintShared(successCallback) {
    var cmd = '$ export base=$(pwd);\ ' +
        'unlink "${base}"/shared; \ ' +
        'ln -s "${base}"/' +
        global.gulpOpts.getProjectRoot() + '/components/shared "${base}"/shared';
}

/**
 * Cleanup previous production build files
 *
 * @param successCallback {Function}
 * @private
 */
function _buildCleanUp(successCallback) {
    var _execCb = function (err, stdout, stderr) {
        if (err === null) {
            console.log("\t Previous build successfully cleaned up.");
            if (successCallback !== undefined) {
                successCallback();
            }
        } else {
            console.error(
                "TASK: ['buildAheadOfTime - before build cleanup']: ",
                err
            );
        }
    };

    exec(
        "rm -rf aot app.component.js app.component.js.map app.module.js" +
        " iframe/shim.min.js iframe/zone.js iframe/Reflect.js iframe/bundle.js.map" +
        " app.module.js.map iframe/bundle.js iframe/app.component.css" +
        " main.prod.js main.prod.js.map tsconfig.aot.json",
        _execCb
    );
}

gulp.task('copyLibs', function () {
    return gulp.src([
        global.gulpOpts.getProjectRoot() + "/node_modules/core-js/client/shim.min.js",
        global.gulpOpts.getProjectRoot() + "/node_modules/zone.js/dist/zone.js",
        global.gulpOpts.getProjectRoot() + "/node_modules/reflect-metadata/Reflect.js"
    ])
        .pipe(gulp.dest("./iframe"));
});

gulp.task('buildCleanUp', function () {
    _buildCleanUp();
});


/* -------------------------------------------------------------------------- |
 |  ** Production build related methods / tasks **                            |
 | -------------------------------------------------------------------------- */


/**
 * Run ngc build task then on success bundleRollup task
 */
var _buildAheadOfTime = function () {

    var tsConfAotFile = "./tsconfig.aot.json",
        tsConfAotContent = JSON.stringify(global.gulpOpts.get("tsConfigAot")),

        _execCb = function (err, stdout, stderr) {
            if (err === null) {
                gulp.start("bundleRollup");
            } else {
                console.error("TASK: ['buildAheadOfTime']: ", err);
            }
        };

    exec(
        "echo '" + tsConfAotContent + "' > " + tsConfAotFile +
        " && " + global.gulpOpts.get("bundleRollup").ngc + " -p " + tsConfAotFile,
        _execCb
    );
};

/**
 * Once AoT compilation is done rollup will treeshake, transpile and bundle
 * our project with all dependencies in <b>bundle.js</b>
 */
gulp.task('bundleRollup', function () {
    return rollup({
        entry: global.gulpOpts.get("bundleRollup").entry,
        plugins: [
            nodeResolve({jsnext: true, module: true}),
            commonjs({
                include: global.gulpOpts.get("bundleRollup").rxjs
            }),
            uglify()
        ]
    }).then(function (bundle) {
        return bundle.write({
            format: 'iife',
            sourceMap: false,
            dest: global.gulpOpts.get("bundleRollup").dest
        });
    });
});

/**
 * Install ngc locally:
 * $ npm install @angular/platform-server@2.0.1 @angular/compiler-cli --save-dev
 */
gulp.task('buildAheadOfTime', function () {
    _buildCleanUp(_buildAheadOfTime);
});

gulp.task('buildProd', ['sass', 'copyLibs', 'buildAheadOfTime']);


/* -------------------------------------------------------------------------- |
 |  ** Development build / serve related methods / tasks **                   |
 | -------------------------------------------------------------------------- */


/** Lint all typescript files in project */
gulp.task('tslint', function () {
    return tsLintTask();
});

gulp.task('sass', function () {
    return sassTask({browserSync: browserSync});
});

gulp.task('bundle', function (done) {
    bundleDev({
        browserSync: browserSync,
        doneCb: done
    });
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: "./iframe"
    });
});

gulp.task('default', function () {

    _buildCleanUp(function () {
        gulp.start(['sass', 'copyLibs', 'bundle', 'browserSync']);

        gulp.watch(ts2Watch, function (file) {
            tsLintCb(file).on("finish", function () {
                gulp.start(['bundle']);
            });
        });

        gulp.watch(sass2Watch, function (file) {
            sassLintCb(file).on("finish", function () {
                gulp.start(['sass']);
            });
        });
        gulp.watch("./iframe/index.html").on('change', browserSync.reload);
    });

});


module.exports = gulp;