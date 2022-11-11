const populares = document.querySelector(".cards-populares")
const hombres = document.querySelector(".containerHombre")
const mujeres = document.querySelector(".containerMujer")
const niños = document.querySelector(".containerNiños")
// Carrito
const cartContainer = document.querySelector(".cartContainer")
const openCart = document.querySelector(".icon-carrito")
const cartMenu = document.querySelector(".cartBase")
const cerrarCart = document.querySelector(".cerrarCarrito")
const subtotal = document.getElementById("subtotal");
const precioTotal = document.getElementById("precioTotal"); 

let carts = JSON.parse(localStorage.getItem("carts")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("carts", JSON.stringify(cartList));
};


const filterPopulares = () =>{
   const ropaList = ropa.filter(
    (ropa) => ropa.populares)
    
  populares.innerHTML = ropaList.map(renderRopa).join("");
}

const renderRopa = (prendas) =>{

    const {name, img, description, price,} = prendas;
    return `
    
<div class="card-popu">
    <img src="${img}" alt="">
    <span>${price}</span>
    <h3>${name}</h3>
    <p>${description}</p>
    <button>Comprar</button>
</div> 
    `

  }

// const renderizadototal = () =>{
//     populares.innerHTML = renderRopa(ropa[1])
    
    
// }


const init = () => {

    filterPopulares()

}


init()


