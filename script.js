// =========================================
// FUNCIÓN 1: Generar array de productos
// =========================================
function generarProductos() {
const productos = [
{ id: 1, name: "Stickers Kawaii", description: "Caritas adorables, colores suaves y pura ternura para decorar lo que quieras.", amount: 120 },
{ id: 2, name: "Stickers para Termos", description: "Diseños vibrantes que se pegan fuerte y resisten el agua. ¡Perfectos para botellas!", amount: 110 },
{ id: 3, name: "Stickers Florales", description: "Inspirados en la naturaleza, traen un toque fresco y colorido a tus cosas.", amount: 130 },
{ id: 4, name: "Retro Pack", description: "Estilo ochentoso, vintage y muy original. ¡Para los que aman lo retro!", amount: 100 },
{ id: 5, name: "Pack Pop", description: "Colores fuertes y diseños explosivos que no pasan desapercibidos.", amount: 140 },
{ id: 6, name: "Viajeros Stickers", description: "Perfectos para trotamundos, mochilas, diarios y souvenirs con onda viajera.", amount: 110 },
{ id: 7, name: "Stickers Cute", description: "Personajitos dulces que hacen más lindo tu día a día.", amount: 115 },
{ id: 8, name: "Animalitos Adorables", description: "Perritos, gatitos, ositos y más, ¡todos súper tiernos!", amount: 120 },
{ id: 9, name: "Gamer Pack", description: "Para fans de los videojuegos, el pixel art y el mundo techie.", amount: 130 },
{ id: 10, name: "Ositos Pastel", description: "Ideal para agendas, planners o simplemente decorar con ternura.", amount: 125 }
];
return productos;
}

// =========================================
// FUNCIÓN 2: Mostrar descripción ampliada
// =========================================
function activarBotonesVerMas(productos) {
  const botonesVerMas = document.querySelectorAll('.ver-mas-btn');
  botonesVerMas.forEach((boton, index) => {
    boton.addEventListener('click', () => {
      const card = boton.closest('.card');        
      const botonesCard = boton.parentElement;    
      const descripcionExistente = card.querySelector('.descripcion-ampliada');
      if (descripcionExistente) {
        descripcionExistente.remove();
        return;
      }

      const parrafo = document.createElement('p');
      parrafo.textContent = productos[index].description;
      parrafo.classList.add('descripcion-ampliada');
      botonesCard.insertAdjacentElement('afterend', parrafo);
    });
  });
}


// =========================================
// FUNCIÓN 3: Agregar productos al carrito
// =========================================
function activarBotonesAgregarCarrito(productos) {
const botonesAgregar = document.querySelectorAll('.agregar-carrito-btn');
botonesAgregar.forEach((boton, index) => {
boton.addEventListener('click', () => {
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const existente = carrito.find(item => item.id === productos[index].id);
if (existente) {
existente.cantidad += 1;
} else {
carrito.push({
id: productos[index].id,
name: productos[index].name,
amount: productos[index].amount,
cantidad: 1
});
}
localStorage.setItem('carrito', JSON.stringify(carrito));
actualizarContadorCarrito();
});
});
}

// =========================================
// FUNCIÓN 4: Actualizar el contador del carrito
// =========================================
function actualizarContadorCarrito() {
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
const contador = document.getElementById('contador-carrito');
if (contador) {
contador.textContent = total;
}
}

// =========================================
// FUNCIÓN 5: Mostrar carrito detallado
// =========================================
function mostrarCarritoDetalle() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const lista = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total-carrito');

  lista.innerHTML = '';

  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${item.name}</strong> - $${item.amount} x 
        <input type="number" min="1" value="${item.cantidad}" data-index="${index}" class="cantidad-input">
        = $${item.amount * item.cantidad}
        <button class="eliminar-btn" data-index="${index}">❌</button>
      </p>
    `;
    lista.appendChild(div);
    total += item.amount * item.cantidad;
  });

  totalElemento.textContent = total;

  // Activar inputs de cantidad
  document.querySelectorAll('.cantidad-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const index = e.target.getAttribute('data-index');
      carrito[index].cantidad = parseInt(e.target.value);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();
      mostrarCarritoDetalle();
    });
  });

  // Botones de eliminar
  document.querySelectorAll('.eliminar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();
      mostrarCarritoDetalle();
    });
  });
}

// =========================================
// INICIALIZACIÓN
// =========================================
function inicializarTienda() {
const productos = generarProductos();
activarBotonesVerMas(productos);
activarBotonesAgregarCarrito(productos);
actualizarContadorCarrito();
}

document.addEventListener('DOMContentLoaded', inicializarTienda);
const burbujaCarrito = document.getElementById('carrito-flotante');
const carritoDetalle = document.getElementById('carrito-detalle');

burbujaCarrito.addEventListener('click', () => {
  carritoDetalle.classList.toggle('oculto');
  mostrarCarritoDetalle();
});

