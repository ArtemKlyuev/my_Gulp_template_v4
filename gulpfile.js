'use strict';

const gulp = require('gulp');

function lazyRequireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function (callback) {
		let task = require(path).call(this, options);

		return task(callback);

	});
};

lazyRequireTask('del', './gulp/tasks/del');
lazyRequireTask('sass', './gulp/tasks/sass');
lazyRequireTask('css:libs', './gulp/tasks/css-libs');
lazyRequireTask('pug', './gulp/tasks/pug');
lazyRequireTask('scripts', './gulp/tasks/scripts');
lazyRequireTask('scripts:libs', './gulp/tasks/scripts-libs');
lazyRequireTask('svg:sprites', './gulp/tasks/svg-sprites');
lazyRequireTask('img', './gulp/tasks/img');
lazyRequireTask('serve', './gulp/tasks/serve');
lazyRequireTask('watch', './gulp/tasks/watch');
lazyRequireTask('smartGrid', './gulp/tasks/smartGrid');

gulp.task('dev', gulp.series('del', gulp.series('svg:sprites'), gulp.parallel('pug', 'sass', 'css:libs', 'img', 'scripts', 'scripts:libs'), gulp.parallel('watch', 'serve')));
gulp.task('build', gulp.series('del', 'svg:sprites', gulp.parallel('scripts:libs', 'scripts', 'sass', 'css:libs'), 'pug'));