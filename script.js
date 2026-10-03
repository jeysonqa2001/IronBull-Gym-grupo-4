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