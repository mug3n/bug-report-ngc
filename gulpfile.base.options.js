/**
 * Maintain basic options
 *
 * @returns {*}
 */
global.gulpOpts = (function () {

    /**
     * Defined project root relative to gulp file.
     * This is without trailing slash
     * By default gulp change working dir on location of <b>gulpfile.js</b>
     * loaded
     * through <b>--gulpfile</b> option.
     *
     * @type {string}
     * @default "../.."
     * @private
     */
    var _projectRoot = "../..";

    /**
     * Set project root relative to gulp file.
     *
     * @param path {string} - relative path without trailing slash
     * @example
     *      <pre> global.gulpOpts.setProjectRoot("../.."); </pre>
     * @return {void}
     */
    this.setProjectRoot = function (path) {
        _projectRoot = path;
    };

    /**
     * @return {string}
     */
    this.getProjectRoot = function () {
        return _projectRoot;
    };

    /**
     *
     * @return {{
     *  bundleRollup: {ngc: string, entry: string, dest: string},
     *  tsConfigAot: {compilerOptions: {target: string, module: string, moduleResolution: string, sourceMap: boolean, emitDecoratorMetadata: boolean, experimentalDecorators: boolean, removeComments: boolean, noImplicitAny: boolean, suppressImplicitAnyIndexErrors: boolean}, files: string[], angularCompilerOptions: {genDir: string, skipMetadataEmit: boolean}}}}
     * @private
     */
    function _config() {
        return {
            bundleRollup: {
                ngc: _projectRoot + "/node_modules/.bin/ngc",
                entry: './main.prod.js',
                dest: './iframe/bundle.js',
                rxjs: _projectRoot + '/node_modules/rxjs/**'
            },
            tsConfigAot: {
                compilerOptions: {
                    target: "es5",
                    module: "es2015",
                    moduleResolution: "node",
                    sourceMap: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    removeComments: false,
                    noImplicitAny: true,
                    suppressImplicitAnyIndexErrors: true
                },

                files: [
                    "./app.module.ts",
                    "./main.prod.ts",
                    _projectRoot + "/typings/index.d.ts"
                ],

                angularCompilerOptions: {
                    "genDir": "./aot",
                    "skipMetadataEmit": true
                }
            }
        };
    }

    /**
     * Fetch property of config object.
     *
     * @param key {string} - if not provided full config object is returned
     * @returns {*}
     */
    this.get = function (key) {
        var cfg = _config();

        if (key === undefined) {
            return cfg;
        }

        if (cfg[key] === undefined) {
            return cfg;
        }
        return cfg[key];
    };

    return this;
})();