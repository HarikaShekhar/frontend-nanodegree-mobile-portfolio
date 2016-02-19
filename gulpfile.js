// Load plugins
var gulp = require('gulp'),
    htmlmin   = require('gulp-htmlmin'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    del = require('del');

//Paths
var paths = {
    "all": "dist/*",
    "build": "dist/",
    "html": {
        "source": "*.html",
        // "target": "/"
    },
    "styles": {
        "source": "css/print.css",
        "target": "css"
    },
    "scripts": {
        "source": "js/*",
        "target": "js"
    },
    "images": {
        "source": "img/*",
        "target": "img"
    },
    "views": {
        "html": {
            "source": "views/*.html",
            "target": "views"
        },
        "styles": {
            "source": "views/css/bootstrap-grid.css",
            "target": "views/css/"
        },
        "scripts": {
            "source": "views/js/*.js",
            "target": "views/js"
        },
        "images": {
            "source": "views/images/*",
            "target": "views/images"
        }
    }
};

//html minify
gulp.task('html', function() {
    return gulp.src(paths.html.source)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, removeCommentsFromCDATA: true, minifyJS: true, minifyCSS: true }))
    .pipe(gulp.dest(paths.build));
});

//styles minify
gulp.task('styles', function() {
    return gulp.src(paths.styles.source)
    .pipe(cssnano())
    .pipe(gulp.dest(paths.build + paths.styles.target));
});

//scripts minify
gulp.task('scripts', function() {
    return gulp.src(paths.scripts.source)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.build + paths.scripts.target));
});

//images compression
gulp.task('images', function() {
    return gulp.src(paths.images.source)
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 5
    }))
    .pipe(gulp.dest(paths.build + paths.images.target));
});

//views-html minify
gulp.task('views-html', function() {
    return gulp.src(paths.views.html.source)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, removeCommentsFromCDATA: true, minifyJS: true, minifyCSS: true }))
    .pipe(gulp.dest(paths.build + paths.views.html.target));
});

//views-styles minify
gulp.task('views-styles', function() {
    return gulp.src(paths.views.styles.source)
    .pipe(cssnano())
    .pipe(gulp.dest(paths.build + paths.views.styles.target));
});

//views-scripts minify
gulp.task('views-scripts', function() {
    return gulp.src(paths.views.scripts.source)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.build + paths.views.scripts.target));
});

//views-images compression
gulp.task('views-images', function() {
    return gulp.src(paths.views.images.source)
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 5
    }))
    .pipe(gulp.dest(paths.build + paths.views.images.target));
});

//clean
gulp.task('clean', function () {
    del([paths.all]);
});

//task creates the build
gulp.task('default', ['clean'], function() {
    gulp.start('html','styles', 'scripts', 'images', 'views-html', 'views-styles', 'views-scripts', 'views-images');
});