import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import yargs from 'yargs';

const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
    },
    scripts: {
        src: 'src/js/**/*.js',
    }
};

const dest = './build'

/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {

    return gulp.src(paths.styles.src)
        .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.if(PRODUCTION, $.uncss({html: ['*.html']})))
        .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
        // pass in options to the stream
        .pipe($.rename({
            basename: 'app',
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dest));
}

export function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.if(PRODUCTION, $.uglify()))
        .pipe($.concat('app.js'))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(dest));
}

export const build = gulp.series(gulp.parallel(styles, scripts));

export const watch = () => {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
}

export default gulp.series(gulp.parallel(styles, scripts, watch));