"use strict";

const   gulp = require("gulp"),
        sass = require("gulp-sass"),
        pump = require("pump"),
        cssmin = require("gulp-cssmin"),
        rename = require("gulp-rename"),
        sourcemaps = require('gulp-sourcemaps');

var projectName = "bootstrap4-modal-fullscreen";

var src = "src/" + projectName + ".scss",
    dist = {
        path: "./dist",
        css: ["./dist/" + projectName + ".css"]
    };


gulp.task('css', function(cb){
    pump([
        gulp.src(src),
        sass().on("error", sass.logError),
        gulp.dest(dist.path)
    ],cb)
});

gulp.task('css:min', ['css'], function(cb){
    pump([
        gulp.src(dist.css),
        cssmin(),
        sourcemaps.init(),
        rename({suffix: ".min"}),
        sourcemaps.write('./'),
        gulp.dest(dist.path)
    ],cb)
});

gulp.task('finalize', ['css:min']);
