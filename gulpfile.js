"use strict";

const gulp = require("gulp"),
  sass = require("gulp-sass"),
  pump = require("pump"),
  cssmin = require("gulp-cssmin"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps");

var projectName = "bootstrap4-modal-fullscreen";

var src = "src/" + projectName + ".scss",
  dist = {
    path: "./dist",
    css: ["./dist/" + projectName + ".css"]
  };

/**
 * Compile sass
 */

gulp.task("css", function(cb) {
  pump(
    [gulp.src(src), sass().on("error", sass.logError), gulp.dest(dist.path)],
    cb
  );
});

/**
 * Min css
 */
gulp.task(
  "css:min",
  gulp.series("css", function(cb) {
    pump(
      [
        gulp.src(dist.css),
        cssmin(),
        sourcemaps.init(),
        rename({ suffix: ".min" }),
        sourcemaps.write("./"),
        gulp.dest(dist.path)
      ],
      cb
    );
  })
);

/**
 * Default task
 */
gulp.task("default", gulp.series("css:min"));
