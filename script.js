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


/* =========================================================
   3. RESALTAR EN EL MENÚ LA SECCIÓN QUE SE ESTÁ VIENDO
   ========================================================= */
const secciones = document.querySelectorAll("main section[id]");

function marcarEnlaceActivo(id) {
  enlacesMenu.forEach(function (enlace) {
    const esActivo = enlace.getAttribute("href") === "#" + id;
    enlace.classList.toggle("activo", esActivo);
    if (esActivo) {
      enlace.setAttribute("aria-current", "true");
    } else {
      enlace.removeAttribute("aria-current");
    }
  });
}

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) marcarEnlaceActivo(entrada.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  secciones.forEach(function (seccion) {
    observador.observe(seccion);
  });
}


/* =========================================================
   4. ELEGIR UN PLAN HACIENDO CLIC EN SU TARJETA
   ========================================================= */
const tarjetas = document.querySelectorAll(".card");
const selectPlan = document.getElementById("plan");

function nombreDelPlan(tarjeta) {
  return tarjeta.querySelector("h3").textContent.trim();
}

function marcarTarjeta(nombre) {
  tarjetas.forEach(function (tarjeta) {
    tarjeta.classList.toggle("seleccionada", nombreDelPlan(tarjeta) === nombre);
  });
}

function elegirPlan(tarjeta) {
  const nombre = nombreDelPlan(tarjeta);
  selectPlan.value = nombre;
  selectPlan.classList.remove("invalido");
  marcarTarjeta(nombre);
  document.getElementById("contacto").scrollIntoView({ block: "start" });
  document.getElementById("nombre").focus({ preventScroll: true });
}

tarjetas.forEach(function (tarjeta) {
  // Hacemos la tarjeta "clicable" y accesible con teclado
  tarjeta.classList.add("card-elegible");
  tarjeta.setAttribute("tabindex", "0");
  tarjeta.setAttribute("role", "button");
  tarjeta.setAttribute("aria-label", "Elegir el plan " + nombreDelPlan(tarjeta));

  tarjeta.addEventListener("click", function () {
    elegirPlan(tarjeta);
  });

  tarjeta.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      elegirPlan(tarjeta);
    }
  });
});

// Si el usuario cambia el plan desde la lista, también se marca la tarjeta
selectPlan.addEventListener("change", function () {
  marcarTarjeta(selectPlan.value);
});