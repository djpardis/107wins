var navLinks = [
  { label: "Home", href: "index.html" },
  { label: "Episodes", href: "episodes.html" },
  { label: "Hosts", href: "hosts.html" },
  { label: "Be a guest", href: "guest-request.html" },
  { label: "Guest guide", href: "guest-guide.html" },
  { label: "Follow us", href: "follow.html" },
];

function getCurrentPage() {
  var path = window.location.pathname;
  return path.substring(path.lastIndexOf("/") + 1) || "index.html";
}

function buildNavLinks() {
  var current = getCurrentPage();
  var html = "";
  navLinks.forEach(function (link) {
    var cls = link.href === current ? ' class="active"' : "";
    html += '<a href="' + link.href + '"' + cls + ">" + link.label + "</a>";
  });
  return html;
}

function buildHeader() {
  var links = buildNavLinks();
  var micSvg = '<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>';

  return '<header class="header">' +
    '<div class="header-inner">' +
      '<a href="index.html" class="logo">' +
        '<div class="logo-icon">' + micSvg + "</div>" +
        "<span>107 Wins</span>" +
      "</a>" +
      "<nav>" + links + "</nav>" +
      '<button class="hamburger" onclick="toggleMenu()" aria-label="Menu">' +
        '<svg id="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>' +
        '<svg id="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
      "</button>" +
    "</div>" +
    '<div class="mobile-nav" id="mobile-nav">' + links + "</div>" +
  "</header>";
}

function buildFooter() {
  return '<footer class="footer">' +
    '<div class="container">' +
      "<p>Conversations about business, tech, and winning tactics.</p>" +
      "<p>Named after the SF Giants' 2021 season.</p>" +
      "<p>&copy; 2026 107 Wins. All rights reserved.</p>" +
    "</div>" +
  "</footer>";
}

function toggleMenu() {
  var nav = document.getElementById("mobile-nav");
  var menuIcon = document.getElementById("menu-icon");
  var closeIcon = document.getElementById("close-icon");
  var isOpen = nav.classList.contains("open");
  nav.classList.toggle("open");
  menuIcon.style.display = isOpen ? "" : "none";
  closeIcon.style.display = isOpen ? "none" : "";
}

(function () {
  var headerEl = document.getElementById("site-header");
  var footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = buildHeader();
  if (footerEl) footerEl.innerHTML = buildFooter();
})();
