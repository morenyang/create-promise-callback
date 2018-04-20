const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('build', () =>
  gulp
    .src('src/index.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
);

gulp.task('test', ['build', 'pre-test'], () =>
  gulp
    .src('test/test.js', { read: false })
    .pipe(mocha({ exit: true }))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 100 } }))
);

gulp.task('default', () =>
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test'])
);

gulp.task('pre-test', () =>
  gulp
    .src(['lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
);
