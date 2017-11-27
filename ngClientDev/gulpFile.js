var jsonSass = require('gulp-json-sass'),
  gulp = require('gulp')

gulp.task('default', function() {
  return gulp
    .src('./src/assets/config/themes/light.json')
    .pipe(
      jsonSass({
        sass: true
      })
    )
    .pipe(gulp.dest('./src/assets/config/themes'))
})
