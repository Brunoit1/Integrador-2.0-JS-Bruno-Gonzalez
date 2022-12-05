const populares = document.getElementById("populares-container");
const hombres = document.getElementById("containerHombre");
const mujeres = document.getElementById("containerMujer");
const niños = document.getElementById("containerNiños");
const hombreBtn = document.querySelector(".hombreBtn");
const mujerBtn = document.querySelector(".mujerBtn");
const niñosBtn = document.querySelector(".niñosBtn");
// Carrito
const cantProductos = document.querySelector('.counter_cart')
const cartContainer = document.querySelector(".cartContainer");
const cartOpen = document.querySelector(".icon-carrito");
const cartMenu = document.querySelector(".cartMenu");
const cerrarCart = document.querySelector(".cerrarCarrito");
const btnAdd = document.querySelector(".btns-add");
const subTotal = document.querySelector("#subtotal");
const precioTotal = document.querySelector("#precioTotal");
const btnBuy = document.querySelector(".btn-Buy")
// Login
const loginContainer= document.getElementById('container-login');
const closeBtn = document.getElementById('close-sesion');
const sesionIcon = document.getElementById('icon-sesion');
const iniciarSesionBtn = document.getElementById('iniciar-sesion');


let carts = JSON.parse(localStorage.getItem("carts")) || [];

const saveCarrito = (cartList) => {
  localStorage.setItem("carts", JSON.stringify(cartList));
};

const renderRopa = (prendas) => {
  const { name, img, description, price, id } = prendas;
  return `
    
<div class="card-popu">
    <img src="${img}" alt="">

    <span>${price}</span>
    <h3>${name}</h3>
    <p>${description}</p>
    <button class="btns-add" data-id=${id}>Comprar</button>
</div> 
    `;
};



// const filterPopulares = () => {
//   const ropaList = ropa.filter((ropaP) => ropaP.populares);

//   populares.innerHTML = ropaList.map(renderRopa).join("");
// };

// const filterHombres = () => {
//   const ropaList1 = ropa.filter((ropaH) => ropaH.hombre);

//   hombres.innerHTML = ropaList1.map(renderRopa).join("");
// };

const filterMujeres = () => {
  const ropaList2 = ropa.filter((ropaM) => ropaM.mujer);

  mujeres.innerHTML = ropaList2.map(renderRopa).join("");
};

// const filterNiños = () => {
//   const ropaList3 = ropa.filter((ropaN) => ropaN.niño);

//   niños.innerHTML = ropaList3.map(renderRopa).join("");
// };

const openCart = () => {
  cartContainer.classList.remove("hidden");
   precioTotal.textContent = setPrecio(carts)
   subTotal.textContent = setPrecio(carts)
}

const closeCart = () => {
  cartContainer.classList.add("hidden");

};

const renderCartCarrito = (objeto)=>{
  const {img ,name , description,id ,cantidad} = objeto;
  return `
  <div class="cart-item">
    <img src=${img} alt="" />
    <div class="item-info">
      <h3 class="item-title">${name}</h3>
      <p class="item-bid">${description}</p>
    </div>
    <div class="item-cant">
      <span class="btn-cant low" data-id=${id}>-</span>
      <span class="item-quantity" data-id=${id}>${cantidad}</span> 
      <span class="btn-cant up" data-id=${id}>+</span>
    </div>
</div>`
}

const renderCarrito = () => {
  cartMenu.innerHTML = carts.map(renderCartCarrito).join('');
}


const closeOnScroll = () => {
  if (cartContainer.classList.contains('hidden'))
      return;

  cartContainer.classList.add('hidden');
};

const compraFinal = () => {
  if (!carts.length) return;
  if (window.confirm('Desea completar su compra?')) {
      carts = [];
      saveCarrito(carts);
      alert('Compra exitosa');
      precioTotal.textContent = setPrecio(carts);
      subTotal.textContent = setPrecio(carts);
      renderCarrito();
      cantProductos.textContent = cantTotalproductos();
  }
};

const cantTotalproductos = () => {
  let totalProductos = 0
  carts.forEach(prod =>
      totalProductos = totalProductos + prod.cantidad)
  return totalProductos
}        

const setPrecio = (carts) => {
  pTotal = 0
  carts.forEach(prod => pTotal += (prod.price * prod.cantidad))
 
  return pTotal
}

const checkCarrito = (carts) => {
    
  if (carts.length === 0) {
      cartMenu.innerHTML = `<h4>No hay productos en el carrito</h4>`
  } 
}


// login


const openLogin = () => {
  loginContainer.classList.remove('hidden');

}

const closeLogin = () => {   

  loginContainer.classList.add('hidden');
 }


const inciarMsg = () => {
  loginContainer.classList.add('hidden');
  alert('Iniciaste Sesion');

}




// 


const addCart = (e) =>{

  if (e.target.classList.contains("btns-add")) {
      
    tag = e.target.getAttribute('data-id');
    const producto = ropa.find(item => item.id == tag)
    let existente = carts.find(prod => prod.id == producto.id)
    
    if (!existente ) {
       
        
        carts = [...carts, {...producto , cantidad: 1}];
        
        saveCarrito(carts);
        renderCarrito();            
        subTotal.innerHTML= setPrecio(carts);
        precioTotal.innerHTML = setPrecio(carts);
        
    }else{

        existente.cantidad = existente.cantidad + 1 ;
      
       
        saveCarrito(carts);
        subTotal.innerHTML = Number(setPrecio(carts))
        precioTotal.innerHTML = Number(setPrecio(carts))
        renderCarrito();
            
    }
    
    cantProductos.innerHTML = cantTotalproductos();
}else {
    return;
}

}


const sumarProductos = (e) =>{
  if(e.target.classList.contains("up")){
     
      const idTarjeta = e.target.getAttribute('data-id');
      
      
      carts = carts.map(prod => {
          return prod.id == idTarjeta
            ? { ...prod, cantidad: prod.cantidad + 1 }
            : prod;
        }
      )
      saveCarrito(carts);
      subTotal.textContent = setPrecio(carts);
      precioTotal.textContent = setPrecio(carts);
      renderCarrito();
      cantProductos.textContent = cantTotalproductos();
  };

  }


const restarProductos = (e) =>{
  if(e.target.classList.contains("low")){
      const idTarjeta = e.target.getAttribute('data-id');
      const objetoEncontrado = carts.find(ropa => ropa.id == idTarjeta);
      if(objetoEncontrado.cantidad  == 1 ){
          
          carts=carts.filter( ropa => ropa.id != objetoEncontrado.id);
          cantProductos.textContent = cantTotalproductos();
          saveCarrito(carts);
          subTotal.textContent = setPrecio(carts);
          precioTotal.textContent = setPrecio(carts);
          renderCarrito();
          checkCarrito(carts);
          
      }else{
          carts = carts.map(ropa => {
              return ropa.id == idTarjeta
                ? { ...ropa, cantidad: ropa.cantidad - 1 }
                : ropa;
            }
          )
          cantProductos.textContent = cantTotalproductos();
          saveCarrito(carts);
          subTotal.textContent = setPrecio(carts);
          precioTotal.textContent = setPrecio(carts);
          renderCarrito();         
      }       
  }

};



const sumarestaRopa= (e) =>{
  sumarProductos(e);
  restarProductos(e);

}


const renderPage = () => {

  cantProductos.textContent = cantTotalproductos();
  renderCarrito();
  mujeres.addEventListener('click', addCart);
  
  
  cartMenu.addEventListener("click",sumarestaRopa)



}




const init = () => {
  
  window.addEventListener('DOMContentLoaded', renderPage)
  filterMujeres();
  // filterTodaRopa();
  cartOpen.addEventListener("click", openCart);
  cerrarCart.addEventListener("click",closeCart);
  btnBuy.addEventListener("click", compraFinal)
  sesionIcon.addEventListener("click", openLogin);
  closeBtn.addEventListener("click", closeLogin);
  window.addEventListener('scroll', closeOnScroll);
  iniciarSesionBtn.addEventListener("click", inciarMsg);
  
  
 



  

};

init();
