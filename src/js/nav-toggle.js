function toggleMenu() {
  var nav = document.getElementById("mobile-nav");
  var menuIcon = document.getElementById("menu-icon");
  var closeIcon = document.getElementById("close-icon");
  if (!nav || !menuIcon || !closeIcon) return;
  var isOpen = nav.classList.contains("open");
  nav.classList.toggle("open");
  menuIcon.style.display = isOpen ? "" : "none";
  closeIcon.style.display = isOpen ? "none" : "";
}
