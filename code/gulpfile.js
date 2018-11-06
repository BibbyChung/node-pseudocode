const gulp = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const tsSourceMaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const path = require('path');
const shell = require('gulp-shell');

//= ================================== Global Variable ===================================

// var webrootPath = "../Web/wwwroot";
// var webrootPath = "./dist/web";
// var webrootPathCopy = webrootPath + "/b";
// var tempPath = "_temp";

//= ================================== Method ===================================

const tsCompiler = (
  pathArr,
  tsconfigPath,
  sourceRoot,
  targetPath,
  isUglify
) => {
  const tscP = ts.createProject(tsconfigPath);

  return gulp.src(pathArr)
    .pipe(tsSourceMaps.init())
    .pipe(tscP())
    .js
    // .pipe(uglify())
    .pipe(tsSourceMaps.write('./', {
      includeContent: false,
      sourceRoot,
    }))
    .pipe(gulp.dest(targetPath));
};

const tsdCompiler = (
  pathArr,
  tsconfigPath,
  targetPath
) => {
  const tscP = ts.createProject(tsconfigPath, {
    isolatedModules: false,
  });

  return gulp.src(pathArr)
    .pipe(tscP())
    .dts
    .pipe(gulp.dest(targetPath));
};

const getCopyFilesPipe = (sourcePatten, targetPath) => gulp.src(sourcePatten).pipe(gulp.dest(targetPath));

//= ================================== Tasks ===================================

gulp.task('clean', (cb) => {
  rimraf('./dist', cb);
});

gulp.task('ts_compile_dist', () => {

  return tsCompiler(
    [
      './src/**/*.ts',
    ],
    './tsconfig.json',
    '../src',
    './dist',
    false
  );

});

gulp.task('tsd_compile_dist', () => {

  return tsdCompiler(
    [
      './src/**/*.ts',
    ],
    './tsconfig.json',
    './dist'
  );

});

gulp.task('dev', shell.task([
  './node_modules/ts-node/dist/bin.js ./src/main.ts'
]))

gulp.task('dev:watch', () => {
  nodemon({
    watch: ["src"],
    ext: "html js ts",
    ignore: ["./src/**/*.spec.ts"],
    exec: "./node_modules/ts-node/dist/bin.js ./src/main.ts",
    env: {
      "NODE_ENV": 'dev',
      "port": 3000
    }
  }).on("restart", () => {
    console.log("restarted!")
  });

});

gulp.task('build',
  gulp.series('clean',
    gulp.parallel(
      'ts_compile_dist',
      'tsd_compile_dist'
    )
  )
);

