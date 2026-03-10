var navLinks = [
  { label: "Home", href: "index.html" },
  { label: "Episodes", href: "episodes/" },
  { label: "Hosts", href: "hosts/" },
  { label: "Be a guest", href: "guest-request/" },
  { label: "Guest guide", href: "guest-guide/" },
  { label: "Follow us", href: "follow/" },
];

function getBasePath() {
  // Derive the site root from the script tag that loaded nav.js
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute("src");
    if (src && src.indexOf("nav.js") !== -1) {
      try {
        var url = new URL(src, window.location.href);
        var path = url.pathname;
        return path.substring(0, path.lastIndexOf("/") + 1); // keep trailing slash
      } catch (e) {
        // fall through to default
      }
    }
  }
  return "/";
}

function getCurrentPathRelativeToBase(base) {
  var path = window.location.pathname || "/";
  if (!path.startsWith(base)) return "index.html";
  var rel = path.substring(base.length); // e.g. "", "episodes/", "episodes/index.html"
  if (rel === "" || rel === "index.html") return "index.html";
  if (rel.endsWith("index.html")) {
    rel = rel.slice(0, -("index.html".length));
  }
  if (rel !== "" && !rel.endsWith("/")) rel += "/";
  return rel;
}

function buildNavLinks() {
  var base = getBasePath();
  var current = getCurrentPathRelativeToBase(base);
  var html = "";
  navLinks.forEach(function (link) {
    // Home should go to the bare base URL (no explicit index.html)
    var fullHref = link.href === "index.html" ? base : base + link.href;
    var cls = link.href === current ? ' class="active"' : "";
    html += '<a href="' + fullHref + '"' + cls + ">" + link.label + "</a>";
  });
  return html;
}

function buildHeader() {
  var base = getBasePath();
  var links = buildNavLinks();
  var micSvg = '<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>';

  return '<header class="header">' +
    '<div class="header-inner">' +
      // Logo also links to the base URL (no index.html in the visible URL)
      '<a href="' + base + '" class="logo">' +
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
