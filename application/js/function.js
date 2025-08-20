
document.addEventListener("DOMContentLoaded", function () {
    var totalPages = flipbookcfg.numPages;
    var thumbsContainer = document.querySelector(".flipbar__thumbs");

    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement("button");
        btn.className = "flipbar__thumb";
        btn.innerHTML = `
          <img src="${flipbookcfg.url}${i}-thumb.jpg" alt="Página ${i}">
          <span>${i}</span>
        `;
        btn.addEventListener("click", function () {
            $(".magazine").turn("page", i);
        });
        thumbsContainer.appendChild(btn);
    }
});

<!-- Scripts da sidebar -->

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => toggleSidebar());
overlay.addEventListener("click", () => closeSidebar());

document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => item.classList.toggle("open"));
});

document.querySelectorAll(".submenu li").forEach(sub => {
  sub.addEventListener("click", (e) => {
    const page = e.target.getAttribute("data-page");
    const content = e.target.getAttribute("data-content");
    if (page) {
      $(".magazine").turn("page", parseInt(page));
      closeSidebar();
    } else if (content) {
      openContentPopup(content);
      closeSidebar();
    }
    e.stopPropagation();
  });
});

function toggleSidebar() {
  sidebar.classList.toggle("open");
  overlay.style.display = sidebar.classList.contains("open") ? "block" : "none";
}
function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.style.display = "none";
}
function openContentPopup(html) {
  const popup = document.getElementById("contentPopup");
  popup.innerHTML = `<div class='content-popup-close' onclick='closeContentPopup()'>✖</div>` + html;
  popup.style.display = "block";
}
function closeContentPopup() {
  document.getElementById("contentPopup").style.display = "none";
}