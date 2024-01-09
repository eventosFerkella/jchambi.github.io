const d = document,
$cardsFoods = d.getElementById('cards-foods'),
$cardsMobiliario = d.getElementById('cards-mobiliario'),
$cardsCatering = d.getElementById('cards-catering'),
items = d.getElementById('items'),
footer = d.getElementById("footer"),
$templateCardFoods = d.getElementById('template-card-foods').content,
$templateCardMobiliario = d.getElementById('template-card-mobiliario').content,
$templateCardCatering = d.getElementById('template-card-catering').content,
templateFooter = d.getElementById("template-footer").content,
templateCarrito = d.getElementById("template-carrito").content,
fragment = d.createDocumentFragment();

let carrito = {};
let data_items = [];
let $mensaje = "";

d.addEventListener("DOMContentLoaded",()=>{
    fetchData();
});

$cardsFoods.addEventListener('click', e => {
    addCarrito(e);
});

$cardsMobiliario.addEventListener('click', e => {
    addCarrito(e);
});

$cardsCatering.addEventListener('click', e => {
    addCarrito(e);
});

items.addEventListener('click',e => {
    btnAccion(e);
});



const fetchData = async()=>{
    try {
        const resFood = await fetch('apiFoods.json');
        const dataFood = await resFood.json();
        //console.log(dataFood);
        const resMobiliario = await fetch('apiMobiliario.json');
        const dataMobiliario = await resMobiliario.json();
        const resCatering = await fetch('apiCatering.json');
        const dataCatering = await resCatering.json();
        //console.log(dataMobiliario);
        printCardsFoods(dataFood);
        printCardsMobiliario(dataMobiliario);
        printCardsCatering(dataCatering);
    } catch (error) {
        console.log(error);
    }
};

const printCardsFoods = data =>{
    data.forEach(producto => {
       //console.log(producto.title);
       $templateCardFoods.querySelector('h3').textContent=producto.title;
       $templateCardFoods.querySelector('#precio-foods').textContent=producto.precio; 
       $templateCardFoods.querySelector('#descripcion-foods').textContent=producto.descripcion; 
       //$templateCardFoods.querySelector('h3').setAttribute("id",producto.identificador);
       //$templateCardFoods.querySelector('img').setAttribute("src",producto.thumbnailUrl);
       $templateCardFoods.querySelector('.btn-dark').dataset.id=producto.id;
       const clone = $templateCardFoods.cloneNode(true);
       fragment.appendChild(clone); 
    });
    $cardsFoods.appendChild(fragment);
};

const printCardsMobiliario = data =>{
    data.forEach(producto => {
       //console.log(producto.title);
       $templateCardMobiliario.querySelector('h3').textContent=producto.title;
       $templateCardMobiliario.querySelector('#precio-mobil').textContent=producto.precio;
       $templateCardMobiliario.querySelector('#descripcion-mobil').textContent=producto.descripcion; 
       /*$templateCardMobiliario.querySelector('h2').setAttribute("id",producto.identificador);
       //$templateCardFoods.querySelector('img').setAttribute("src",producto.thumbnailUrl);*/
       $templateCardMobiliario.querySelector('.btn-dark').dataset.id=producto.id;
       const clone = $templateCardMobiliario.cloneNode(true);
       fragment.appendChild(clone); 
    });
    $cardsMobiliario.appendChild(fragment);
};

const printCardsCatering = data =>{
    data.forEach(producto => {
       //console.log(producto.title);
       $templateCardCatering.querySelector('h3').textContent=producto.title;
       $templateCardCatering.querySelector('#precio-catering').textContent=producto.precio;
       $templateCardCatering.querySelector('#descripcion-catering').textContent=producto.descripcion; 
       /*$templateCardMobiliario.querySelector('h2').setAttribute("id",producto.identificador);
       //$templateCardFoods.querySelector('img').setAttribute("src",producto.thumbnailUrl);*/
       $templateCardCatering.querySelector('.btn-dark').dataset.id=producto.id;
       const clone = $templateCardCatering.cloneNode(true);
       fragment.appendChild(clone); 
    });
    $cardsCatering.appendChild(fragment);
};

const addCarrito = e =>{
    //console.log(e.target);
    if(e.target.classList.contains('btn-dark')){
        //console.log(e.target.parentElement);
        setCarrito(e.target.parentElement);
    };
    e.stopPropagation();
};

const setCarrito=objeto=>{
    const producto={
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h3').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad=carrito[producto.id].cantidad + 1;
    }

    carrito[producto.id] = {...producto};
    pintarCarrito();
};

const pintarCarrito = () =>{
    //console.log(carrito);
    items.innerHTML = '';
    Object.values(carrito).forEach(producto=>{
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;
        const clone =templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    });
    items.appendChild(fragment);

    pintarFooter();
};

const pintarFooter = () =>{
    footer.innerHTML='';
    if (Object.keys(carrito).length === 0){
        footer.innerHTML=`
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad })=> acc + cantidad,0);
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio })=> acc + cantidad * precio,0);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', ()=>{
        carrito={};
        data_items=[];
        $mensaje="";
        pintarCarrito();
    });

    const btnEnviar = document.getElementById('btn-enviar');
    btnEnviar.addEventListener('click', e => {
        
        data_items=[];
        $mensaje="";
        let numero = 51959881106;
        /*console.log(items.querySelectorAll('span')[0].textContent);
        console.log(items.querySelectorAll('td')[0].textContent);
        console.log(items.querySelectorAll('td')[4].textContent);
        console.log(items.querySelectorAll('span')[1].textContent);*/
        for (let i=0; i<items.querySelectorAll('td').length;i++){
            //console.log(items.querySelectorAll('td')[i].textContent);
            data_items.push(items.querySelectorAll('td')[i].textContent);
            //$mensaje=items.querySelectorAll('td')[i].textContent;
            
            
        }
        
        //console.log(data_items);

        data_items.forEach((e,i)=>{
            if(i%4==0){
                $mensaje=$mensaje + `${e}: `;
            };
            if ((i-1)%4==0){
                $mensaje=$mensaje + `${e} unidades`
            ;}
            if ((i-3)%4==0){
                $mensaje=$mensaje + `, valor ${e}.00     `
            }
        });
        
        console.log($mensaje);
        var win=window.open(`https://wa.me/${numero}?text=Hola%20Bienvenidos%20a%20"FERKELLA EVENTOS"%0AGracias%20por%20tu%20preferencia%0ATu%20pedido:%0A${$mensaje}%0AIndicanos%20tu%20nombre%20y%20dirección%20del%20evento%20por%20favor%0AEn%20breves%20momentos%20te%20contestaremos`,'_blank');
        
        
        
    });
};

const btnAccion = e =>{
    //  console.log(e.target);
    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito();
    };
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad - 1;
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito();
    }
}
