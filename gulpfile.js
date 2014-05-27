var gulp            = require("gulp");
var glob            = require("glob");
var browserify      = require("gulp-browserify");
var react           = require("gulp-react");
var concat          = require("gulp-concat");
var plumber         = require("gulp-plumber");
var flatten         = require("gulp-flatten");
var sass            = require("gulp-sass");
var minifyCSS       = require("gulp-minify-css");
var gutil           = require('gulp-util');
var gulpif          = require('gulp-if');
var rename          = require("gulp-rename");
var uglify          = require("gulp-uglify");


var production = process.env.PRODUCTION != '1';
if (production) console.log("Gulping in DEV mode");
else            console.log("Gulping in PRODUCTION mode");
//

//vendorJs = glob.sync('./vendor/js/*.js').sort(jsDepSorter);

function onErr(e) {
    console.error(e.message + "\n in " + e.fileName); 
}

// Compile (if jsx) and copy all javascript into build directory
// Optional minification/compression could go here
gulp.task('js', function() {
    return gulp
        .src(['./src/*.js', './src/**/*.js'])
        .pipe(react())
        .on('error', onErr)
        .pipe(flatten())
        .pipe(gulp.dest('build/'));
});

gulp.task('scss', function() {
    return gulp.src(['scss/*.css', 'scss/*.scss'])
        .pipe(sass())
        .pipe(gulpif(production, minifyCSS({keepBreaks:true})))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build/'));
});

// Browserify everyrthing into a bundle
gulp.task('build', ['js'], function(){
    var stream = gulp.src(['build/app.js'])
    .pipe(browserify({
        insertGlobals: true,
        debug: true
    }))
    //.on('error', onErr)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build'));

    if (production) {
        stream = stream
            .pipe(rename('bundle.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./build'));
    }

    return stream;
});

gulp.task('watch', ['build','scss'], function() {
  gulp.watch(['src/*.js', 'src/**/*.js'],[
    'build'
  ]);
  gulp.watch(['scss/*'],[
    'scss'
  ]);
});

gulp.task('serve', ['build'], function() {
    var express = require("express");
    var app = express();
    app.use('/build', express.static('./build'));
    app.use('/', express.static('./public'));
    app.listen(4000);
    console.log("Listening on http://localhost:4000");
});

