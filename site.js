var socialLinks = [
  { name: "YouTube", icon: "&#9654;", url: "https://youtube.com/@107wins", desc: "Watch our latest episodes and behind-the-scenes content" },
  { name: "Instagram", icon: "&#128247;", url: "https://instagram.com/107wins.club", desc: "Get daily updates, stories, and visual content" },
  { name: "Bluesky", icon: "&#9729;", url: "https://bsky.app/profile/107wins.club", desc: "Join the conversation on the decentralized social platform" },
  { name: "X", icon: "&#120143;", url: "https://x.com/107winsclub", desc: "Real-time updates and podcast announcements" },
  { name: "Spotify", icon: "&#9835;", url: "https://open.spotify.com/show/107wins", desc: "Listen to episodes on the world's largest audio platform" },
  { name: "Apple Podcasts", icon: "&#127911;", url: "https://podcasts.apple.com/podcast/107wins", desc: "Stream episodes on Apple's native podcast app" },
];

function renderEpisodeCard(ep, options) {
  options = options || {};
  var showTopics = options.showTopics || false;
  var showLinks = options.showLinks || false;
  var showDate = options.showDate || false;
  var clickable = options.clickable || false;
  var truncateDesc = options.truncateDesc || false;

  var guest = "";
  if (ep.guestName) {
    guest = '<p class="text-xs text-muted mt-2">with <strong>' + ep.guestName + "</strong>";
    if (ep.guestTitle) guest += ", " + ep.guestTitle;
    guest += "</p>";
  }

  var topics = "";
  if (showTopics && ep.topics && ep.topics.length > 0) {
    topics = '<div class="badge-row mt-4">';
    ep.topics.forEach(function (t) {
      topics += '<span class="badge-outline">' + t + "</span>";
    });
    topics += "</div>";
  }

  var links = "";
  if (showLinks) {
    var linkHtml = "";
    if (ep.youtubeUrl) linkHtml += '<a href="' + ep.youtubeUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">YouTube</a>';
    if (ep.spotifyUrl) linkHtml += '<a href="' + ep.spotifyUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Spotify</a>';
    if (ep.applePodcastsUrl) linkHtml += '<a href="' + ep.applePodcastsUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Apple Podcasts</a>';
    if (linkHtml) links = '<div class="link-list mt-4">' + linkHtml + "</div>";
  }

  var descClass = "text-sm text-muted mt-2";
  if (truncateDesc) descClass += " line-clamp-2";

  var cardAttr = clickable ? ' onclick="location.href=\'episodes.html\'" class="clickable"' : "";

  return '<div class="card card-hover"' + cardAttr + ">" +
    '<div class="feature-row">' +
      '<div class="icon-box icon-box-lg">&#127908;</div>' +
      '<div class="feature-content">' +
        '<div class="flex-center-gap-sm">' +
          '<span class="badge-outline">EP ' + ep.episodeNumber + "</span>" +
          '<span class="text-xs text-muted">' + ep.duration + "</span>" +
          (showDate ? '<span class="text-xs text-muted">' + ep.publishedAt + "</span>" : "") +
        "</div>" +
        '<h3 class="font-semibold mt-2">' + ep.title + "</h3>" +
        '<p class="' + descClass + '">' + ep.description + "</p>" +
        guest +
        topics +
        links +
      "</div>" +
    "</div>" +
  "</div>";
}

function renderSocialCard(item) {
  return '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer" class="social-link">' +
    '<div class="card">' +
      '<div class="social-card">' +
        '<div class="icon-box">' + item.icon + "</div>" +
        "<div>" +
          '<div class="flex-center-gap-sm">' +
            '<h2 class="font-semibold text-sm">' + item.name + "</h2>" +
            '<span class="text-muted external-icon">&#8599;</span>' +
          "</div>" +
          '<p class="text-sm text-muted">' + item.desc + "</p>" +
        "</div>" +
      "</div>" +
    "</div>" +
  "</a>";
}

function renderEmptyEpisodes() {
  return '<div class="card empty-state">' +
    '<div class="icon-box icon-box-lg">&#127911;</div>' +
    '<h2 class="font-bold heading-md mb-2">Coming soon</h2>' +
    '<p class="text-sm text-muted">We\'re working on our first episodes. Check back soon or follow us on social media for updates.</p>' +
    '<div class="mt-6"><a href="follow.html" class="btn btn-primary">Follow us for updates &rarr;</a></div>' +
  "</div>";
}
