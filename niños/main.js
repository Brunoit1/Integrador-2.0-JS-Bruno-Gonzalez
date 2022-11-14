const populares = document.getElementById("populares-container");
const hombres = document.getElementById("containerHombre");
const mujeres = document.getElementById("containerMujer");
const niños = document.getElementById("containerNiños");
const hombreBtn = document.querySelector(".hombreBtn");
const mujerBtn = document.querySelector(".mujerBtn");
const niñosBtn = document.querySelector(".niñosBtn");
// Carrito
const cartContainer = document.querySelector(".cartContainer");
const cartOpen = document.querySelector(".icon-carrito");
const cartMenu = document.querySelector(".cartMenu");
const cerrarCart = document.querySelector(".cerrarCarrito");
const btnAdd = document.querySelector(".btns-add");
const subtotal = document.getElementById("subtotal");
const precioTotal = document.getElementById("precioTotal");

let carts = JSON.parse(localStorage.getItem("carts")) || [];

const saveLocalStorage = (cartList) => {
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

// const filterMujeres = () => {
//   const ropaList2 = ropa.filter((ropaM) => ropaM.mujer);

//   mujeres.innerHTML = ropaList2.map(renderRopa).join("");
// };

const filterNiños = () => {
  const ropaList3 = ropa.filter((ropaN) => ropaN.niño);

  niños.innerHTML = ropaList3.map(renderRopa).join("");
};

const openCart = () => {
  cartContainer.classList.remove("hidden");
}

const closeCart = () => {
  cartContainer.classList.add("hidden");

};

const renderCartCarrito = (objeto)=>{
  const {img ,name , description,price,id ,cantidad} = objeto;
  return `
  <div class="cart-item">
    <img src=${img} alt="ropa" />
    <div class="item-info">
      <h3 class="item-title">${name}</h3>
      <p class="item-bid">${description}</p>
      <span class="item-price">${price}</span>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${cantidad}</span> 
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
</div>`
}






const init = () => {
  filterNiños();
  // filterTodaRopa();
  cartOpen.addEventListener("click", openCart);
  cerrarCart.addEventListener("click",closeCart);
  

};

init();
