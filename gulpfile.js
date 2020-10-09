const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
//vendor
gulp.task("vendor", () => {
return gulp.src([
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/jquery/dist/jquery.min.map",
  "node_modules/leaflet/dist/images/**/*",
  "node_modules/leaflet/dist/leaflet.css",
  "node_modules/leaflet/dist/leaflet.js",
  "node_modules/leaflet/dist/leaflet.js.map"
], { base: "node_modules" })
  .pipe(plumber())
  .pipe(rename(path => {
    path.dirname =
      path.dirname
        .replace(/\/dist(?=\/|$)/, "")
        .replace(/\\dist(?=\\|$)/, "");
    path.extname =
      path.extname
        .replace(/\.less$/, ".css");
  }))
  .pipe(gulp.dest("docs/vendor"));
});
 
//scss
gulp.task("scss", () => {
  return gulp.src([
    "src/scss/**/*.scss",
    "!src/scss/**/_*.scss",
  ]).pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("docs/css"));
});
 
 
function watchChangeFlie(done) {
  gulp.watch("src/scss/**/*.scss", gulp.task("scss"));
  done();
}
 
gulp.task("default", gulp.series("vendor", "scss"));
gulp.task("watch", gulp.series("vendor", "scss", gulp.parallel(watchChangeFlie)));
