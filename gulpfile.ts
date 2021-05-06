"use strict";

const siteBuildDir = "./WebApp";
const libDir = siteBuildDir + "/node_modules";


var require;
const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const zip = require('gulp-zip');
var $ = require('gulp-load-plugins')();
/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del([siteBuildDir+'/**', 
        '!'+siteBuildDir, 
        '!'+siteBuildDir+'/WEB-INF/**',
        '!'+siteBuildDir+'/META-INF/**'], {force:true}, cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(siteBuildDir));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["!src/**/*.ts", 
                     "src/**/*"])
        .pipe(gulp.dest(siteBuildDir));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            'angular2-datatable/**',
            'lodash/lodash.js',
            '@angular/**',
            'angular2-jwt/**'
        ], {cwd: "./node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest(libDir));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});


/**
 * Build the project. Create zip for deployment
 */
gulp.task("build", ['compile', 'resources', 'libs' ], () => {
    console.log("Building the project ...");
    return gulp.src(siteBuildDir + "/**/*")
        .pipe(zip('HSSOMTokenMaintPanel.zip'))
        .pipe(gulp.dest(siteBuildDir));
});