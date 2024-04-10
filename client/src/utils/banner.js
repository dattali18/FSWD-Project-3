// this module will be used to display a banner on the top of the page
const banner = document.getElementById("info-banner");
const bannerText = document.getElementById("info-banner-text");
const bannerIcon = document.getElementById("info-banner-icon");

const icons = {
  success: "fa-check-circle",
  error: "fa-exclamation-circle",
  info: "fa-info-circle",
  warning: "fa-exclamation-triangle",
};

function showBanner(message, color, icon) {
  banner.style.display = "flex";
  banner.className = `info-banner ${color}`;

  bannerText.innerHTML = message;

  bannerIcon.className = `fa-solid ${icons[icon]}`;

  // hide banner after 5 seconds
  setTimeout(() => {
    hideBanner();
  }, 5000);
}

function hideBanner() {
  banner.style.display = "none";
}

export { hideBanner, showBanner };
