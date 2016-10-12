var gulp = require('gulp'),
    browserify = require('browserify'),
    tsify = require('tsify'),
    buffer = require('vinyl-buffer'),
    _ = require('lodash'),
    source = require('vinyl-source-stream');

function bundleDev(opts) {
    var options = {
        browserSync: null,
        doneCb: null,
        watch: false,
        src: [
            './main.ts',
            global.gulpOpts.getProjectRoot() + '/typings/index.d.ts'
        ],
        outputPath: './iframe',
        outputFile: 'bundle.js',
        minify: false,
        browserifyOptions: {
            cache: {},
            packageCache: {},
            baseDir: ".",
            debug: true
        },
        tsifyOptions: {
            "target": "es5",
            "module": "commonjs",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "removeComments": false,
            "noImplicitAny": true,
            "suppressImplicitAnyIndexErrors": true
        },
        onError: function (err) {
            console.error(err.toString());
            this.emit('end');
        }
    };

    if (opts === undefined) {
        throw new Error(
            "Basic options must be provided and include 'browserSync'" +
            " & 'doneCb' property."
        );
    }

    options = _.merge(options, opts);

    browserify(options.src, options.browserifyOptions)
        .plugin(tsify, options.tsifyOptions)
        .bundle()
        .on('error', options.onError)
        .pipe(source(options.outputFile))
        .pipe(buffer())
        .pipe(gulp.dest(options.outputPath))
        .on('end', function () {
            setTimeout(function () {
                options.browserSync.reload();
            }, 500);
            options.doneCb();
        });

    return this;
}

module.exports = bundleDev;