var gulp            = require("gulp");
var glob            = require("glob");
var browserify      = require("gulp-browserify");
var react           = require("gulp-react");
var concat          = require("gulp-concat");
var plumber         = require("gulp-plumber");
var flatten         = require("gulp-flatten");

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

    if (false) {
        stream = stream
            .pipe(rename('bundle.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./build'));
    }

    return stream;
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['src/*.js', 'src/**/*.js'],[
    'build'
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

