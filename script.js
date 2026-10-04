/* =========================================================
   IronBull Gym - Funcionalidades con JavaScript
   Integrante C
   ========================================================= */


/* =========================================================
   1. MODO CLARO / OSCURO (hecho por el Integrante A)
   ========================================================= */
const btnTema = document.getElementById("btnTema");
const raiz = document.documentElement;

function actualizarBotonTema() {
  const oscuro = raiz.getAttribute("data-theme") === "dark";
  btnTema.textContent = oscuro ? "Modo claro" : "Modo oscuro";
}

btnTema.addEventListener("click", function () {
  const nuevo = raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
  raiz.setAttribute("data-theme", nuevo);
  try { localStorage.setItem("tema", nuevo); } catch (e) {}
  actualizarBotonTema();
});

actualizarBotonTema();


/* =========================================================
   2. MENÚ PARA CELULARES (mostrar / ocultar)
   ========================================================= */
const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");
const enlacesMenu = menu.querySelectorAll("a");

function abrirMenu() {
  menu.classList.add("abierto");
  btnMenu.setAttribute("aria-expanded", "true");
  btnMenu.setAttribute("aria-label", "Cerrar menú");
  btnMenu.textContent = "✕";
}

function cerrarMenu() {
  menu.classList.remove("abierto");
  btnMenu.setAttribute("aria-expanded", "false");
  btnMenu.setAttribute("aria-label", "Abrir menú");
  btnMenu.textContent = "☰";
}

btnMenu.addEventListener("click", function () {
  if (menu.classList.contains("abierto")) {
    cerrarMenu();
  } else {
    abrirMenu();
  }
});

// Al tocar una opción del menú, el menú se cierra
enlacesMenu.forEach(function (enlace) {
  enlace.addEventListener("click", cerrarMenu);
});

// La tecla Escape también cierra el menú
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") cerrarMenu();
});

// Si la pantalla se agranda (pasa a computadora), se cierra el menú móvil
window.addEventListener("resize", function () {
  if (window.innerWidth > 760) cerrarMenu();
});