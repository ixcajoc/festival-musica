document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrolNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    
    window.addEventListener('scroll',function(){
        if (sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-fijo');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-fijo');
        }

    });
    //getBoundingClientRect() provee de valores como bottom, top, rigth... puedo verlos en consola del navegador para constatar
    //muestra la posicion de algun elemento en la pantalla
}

function scrolNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            //quitamos el scroll por defecto
            e.preventDefault();
            
            //colocamos el scroll que queremos

                            //evento.elemento.atributo.clas_href_id_etc.valorAsociado
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            // const seccion = document.querySelector(e.target.attributes.href.value);

            seccion.scrollIntoView({behavior: "smooth"});

        });
        
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1; i <=12; i++ ){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen de galeria">
        
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
        
    }    
}

function mostrarImagen(idImagen){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${idImagen}.avif" type="image/avif">
        <source srcset="build/img/grande/${idImagen}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${idImagen}.jpg" alt="imagen de galeria">
    `;

    //crea un overlay y dentro una imagen, paso1
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //paso 4
    overlay.onclick = function(){
        const body = document.querySelector('body');//seleccionamos el body
        body.classList.remove('fijar-body');//quitamos la clase para tener scroll
        overlay.remove();//quitamos el overlay

    }

    //boton para cerrar ventana paso 3
    const btnCerrarVentana = document.createElement('P');
    btnCerrarVentana.textContent  = 'X';
    btnCerrarVentana.classList.add('btnCerrarVentana'); 

    btnCerrarVentana.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();

    }

    overlay.appendChild(btnCerrarVentana);

    //agregarlo al html paso 2
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
