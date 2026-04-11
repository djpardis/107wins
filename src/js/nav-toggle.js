function setMenuOpen(nav, menuIcon, closeIcon, btn, open) {
  if (!nav) return;
  if (open) {
    nav.classList.add("open");
  } else {
    nav.classList.remove("open");
  }
  if (menuIcon && closeIcon) {
    menuIcon.style.display = open ? "none" : "";
    closeIcon.style.display = open ? "" : "none";
  }
  if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
}

function toggleMenu() {
  var nav = document.getElementById("site-nav");
  var menuIcon = document.getElementById("menu-icon");
  var closeIcon = document.getElementById("close-icon");
  var btn = document.getElementById("nav-toggle");
  if (!nav || !menuIcon || !closeIcon) return;
  var open = !nav.classList.contains("open");
  setMenuOpen(nav, menuIcon, closeIcon, btn, open);
}

document.addEventListener("click", function (e) {
  var nav = document.getElementById("site-nav");
  var btn = document.getElementById("nav-toggle");
  if (!nav || !nav.classList.contains("open")) return;
  if (btn && (e.target === btn || btn.contains(e.target))) return;
  if (nav.contains(e.target)) return;
  var menuIcon = document.getElementById("menu-icon");
  var closeIcon = document.getElementById("close-icon");
  setMenuOpen(nav, menuIcon, closeIcon, btn, false);
});

document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  var nav = document.getElementById("site-nav");
  if (!nav || !nav.classList.contains("open")) return;
  var menuIcon = document.getElementById("menu-icon");
  var closeIcon = document.getElementById("close-icon");
  var btn = document.getElementById("nav-toggle");
  setMenuOpen(nav, menuIcon, closeIcon, btn, false);
});
