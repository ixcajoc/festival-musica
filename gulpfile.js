// const{src,dest, watch, parallel} = require("gulp");
const{src,dest, watch, parallel} = require("gulp");

//css
const sass = require("gulp-sass")(require('sass')); //esta es la forma de importar
const plumber = require('gulp-plumber');
//para minificar, al final del proyecto
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//minificar js. al finalizar proyecto
const terser = require('gulp-terser-js');

// imagenes
// la implementacion de gulp-web no me fue posible, por lo que deje todo comentariado
// const webp = require('gulp-webp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');


function css(done){
    // src("src/scss/app.scss") //identificar el archivo
    src("src/scss/**/*.scss") //identificar cualquier archivo scss y compilar todos
        .pipe(sourcemaps.init())//ultimo paso al finalizar proyecto 2
        .pipe(plumber())//permite no tener que al encontrar erroes no detenga la funcion dev
        .pipe(sass()) //compilarlo
        .pipe( postcss( [ autoprefixer(),cssnano() ] ) )//esta la colocamos cuando ya hayamos terminado el proyecto 1
        .pipe(sourcemaps.write('.')) //finalizar proyecto 3
        .pipe(dest("build/css")) //almacenarla en el disco duro

    done(); //callback que avisa a gulp que terminamos
}

function imagenes(done){

    const opciones = {
        optimizationLevel : 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )

    done();
}

function versionAvif(done){
    const opciones ={
        quality: 50 //valores de 0 a 100
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones))
        .pipe( dest('build/img'))

    done();

}

// function versionWebp(done){
//     const opciones ={
//         quality: 50 //valores de 0 a 100
//     };

//     src('src/img/**/*.{png,jpg}')
//         .pipe( webp(opciones))
//         .pipe( dest('build/img'))

//     done();

// }

function javascript(done){
    src('src/js/**/*.js')
        .pipe( sourcemaps.init() ) // 2
        .pipe( terser() ) //colocar al finalizar proyecto,estamos minificando 1
        .pipe( sourcemaps.write('.')) //3
        .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch("src/scss/**/*.scss",css)
    watch("src/js/**/*.js",javascript)
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
// exports.versionWebp = versionWebp;

exports.dev = parallel(imagenes,versionAvif,javascript,dev);
// exports.dev = dev;



//pipe. Ayuda a ejecutar una tarea en cuando finalice la anterior

//para compilar sass con gulp, instalamos una dependencia npm i --save-dev gulp-sass

//comandos de consola importantes:
//npm run aca el nombre de la tarea, eje. npm run dev, npm run css. la tarea la coloco en package.json
//npx gulp tarea, eje. npx gulp dev, npx gulp css 


//dependencias instaladas
//npm i --save-dev gulp-sass
//npm i --save-dev gulp-imagemin@7.1.0    
// nmp i --save-dev gulp-cache
//npm install --save-dev gulp-avif

//al final del proyecto instalamos estas dependencias para minificar el codigo final
//npm install --save-dev cssnano autoprefixer postcss gulp-postcss

//en normalize -webkit-appareance hay un problema, para corregirlo solo escribir appareance
// eso quieta los erroes del archivo normalize

//por ultimo para encontrar los elementos cuando ya se ha minificado el archivo instalamos
//un sourcemaps
//npm install --save-dev gulp-sourcemaps

//el source maps ayuda a conocer donde estan los elementos si quiero
//modificarlos, usando el navegador

//minificar js
//npm install --save-dev gulp-terser-js