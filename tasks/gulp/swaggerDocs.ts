import { baseDir } from '../../src/config';
import copy from 'gulp-copy';
import gulp from 'gulp';
import path from 'path';

console.log(baseDir);

const copySwaggerDocs = () => {
	const source = path.join(baseDir, '/src/api-specs/*');
	const destination = path.join(baseDir, 'build', 'src', 'api-specs');
	const compiled = gulp.src(source).pipe(copy(destination, { prefix: 2 }));
	// .pipe(gulp.dest(destination));

	return compiled;
};

export default gulp.task('copy:apiDocs', copySwaggerDocs);
