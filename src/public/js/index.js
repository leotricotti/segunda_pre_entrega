//Guardar cartId en localStorage
const saveCartId = (cartId) => {
  if (!cartId) {
    localStorage.setItem("cartId", cartId);
  } else {
    localStorage.removeItem("cartId");
    localStorage.setItem("cartId", cartId);
  }
};

//Crear carrito vacio
const createCart = async () => {
  const response = await fetch("/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products: [],
    }),
  });
  const cart = await response.json();
  if (cart) {
    showResult("Carrito creado con éxito");
    getCartId();
  }
};

//Obtener carrito
const getCartId = async () => {
  const response = await fetch("http://localhost:8080/api/carts");
  const carts = await response.json();
  const lastCart = carts[carts.length - 1];
  saveCartId(lastCart._id);
};

// Agrega productos al carrito
const addProduct = async (idProduct) => {
  //Obtener cartId de localStorage
  const cartId = localStorage.getItem("cartId");
  const response = await fetch(`/api/carts/${cartId}/product/${idProduct}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response) showResult("Producto agregado con éxito");
  return response;
};

//Incrementa la cantidad de un producto en el carrito
const increaseQuantity = async (idProduct) => {
  const cartId = localStorage.getItem("cartId");
  const response = await fetch(`/api/carts/${cartId}/product/${idProduct}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      op: "add",
    }),
  });
  if (response) showResult("Producto agregado con éxito");
  refreshPage();
  return response;
};

//Decrementa la cantidad de un producto en el carrito
const decreaseQuantity = async (idProduct) => {
  //Obtener cartId de localStorage
  const cartId = localStorage.getItem("cartId");
  const response = await fetch(`/api/carts/${cartId}/product/${idProduct}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response) showResult("Producto eliminado con éxito");
  refreshPage();
  return response;
};

//Elimina un producto del carrito
const deleteProduct = async (idProduct) => {
  //Obtener cartId de localStorage
  const cartId = localStorage.getItem("cartId");
  const response = await fetch(`/api/carts/${cartId}/product/${idProduct}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response) showResult("Producto eliminado con éxito");
  refreshPage();
  return response;
};

//Elimina todos los productos del carrito
const deleteAllProducts = async () => {
  //Obtener cartId de localStorage
  const cartId = localStorage.getItem("cartId");
  const response = await fetch(`/api/carts/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response) showResult("Carrito vaciado con éxito");
  refreshPage();
  return response;
};

//Paginación de navegación
const pagination = async (page) => {
  if (page) {
    let currentPage = localStorage.setItem("currentPage", page);
  }
  return (window.location.href = `/api/products?page=${page}`);
};

//Paginación botón anterior
const previousPage = () => {
  let currentPage = localStorage.getItem("currentPage");
  currentPage = parseInt(currentPage);
  if (currentPage > 1) {
    currentPage -= 1;
  }
  const result = localStorage.setItem("currentPage", currentPage);
  return (window.location.href = `/api/products?page=${currentPage}`);
};

//Paginación botón siguiente
const nextPage = () => {
  let currentPage = localStorage.getItem("currentPage");
  currentPage = parseInt(currentPage);
  if (currentPage < 4) {
    currentPage += 1;
  }
  const result = localStorage.setItem("currentPage", currentPage);
  return (window.location.href = `/api/products?page=${currentPage}`);
};

//Ordenar productos por precio
const sortProductsByPrice = async (sort) => {
  return (window.location.href = `/api/products?sort=${sort}`);
};

//Filtrar productos por categoría
const filterProductsByCategory = async (category) => {
  return (window.location.href = `/api/products?category=${category}`);
};

//Mostrar resultado operación por SweetAlert2
const showResult = (result) => {
  if (result) {
    Swal.fire({
      icon: "success",
      title: result,
      showConfirmButton: false,
      timer: 2000,
    });
  } else
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal! Vuelve a intentarlo",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
};

//Refrescar página
const refreshPage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 1800);
};

//Obtener cartId de localStorage y asignarlo a la ruta del carrito
const setCartRoute = () => {
  const cartRoute = document
    .getElementById("cart-route")
    .setAttribute("href", `/api/carts/${localStorage.getItem("cartId")}`);
  return cartRoute;
};

//Desabilitar boton de paginación anterior en página 1
if (localStorage.getItem("currentPage") === "1") {
  const element = document.getElementById("previous-page");
  element.classList.add("disabled");
}

//Desabilitar boton de paginación siguiente en página 4
if (localStorage.getItem("currentPage") === "4") {
  const element = document.getElementById("next-page");
  element.classList.add("disabled");
}

//Establecer currentPage en 1 al cerrar la tienda
window.onbeforeunload = () => {
  const setPageStorage = localStorage.set;
  Item("currentPage", 1);
};
