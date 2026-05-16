// ============================================
// ISR Portal Suite
// ============================================

// Bootstrap Modal
const modalElement = document.getElementById("portalModal");

const portalModal = new bootstrap.Modal(modalElement);

const modalTitle = document.getElementById("modalTitle");

// ============================================
// Open Modal
// ============================================

const portalMenus = document.querySelectorAll(".icon-menu");

portalMenus.forEach((menu) => {

  menu.addEventListener("click", () => {

    const portalName = menu.getAttribute("data-portal");

    modalTitle.textContent = portalName;

    portalModal.show();

  });

});

// ============================================
// Floating Search Button
// ============================================

const fabSearch    = document.getElementById("fabSearch");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose  = document.getElementById("searchClose");
const searchInput  = document.getElementById("portalSearch");

function openSearch() {
  searchOverlay.classList.add("active");
  fabSearch.classList.add("fab-hidden");
  setTimeout(() => searchInput.focus(), 250);
}

function closeSearch() {
  searchOverlay.classList.remove("active");
  fabSearch.classList.remove("fab-hidden");
  searchInput.value = "";
  resetCategories();
}

fabSearch.addEventListener("click", openSearch);
searchClose.addEventListener("click", closeSearch);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSearch();
});

// ============================================
// Search Portal
// ============================================

function resetCategories() {
  const categories = document.querySelectorAll(".portal-category");
  categories.forEach((category) => {
    category.style.display = "block";
    const menus = category.querySelectorAll(".icon-menu");
    menus.forEach((menu) => { menu.style.display = "flex"; });
  });
}

searchInput.addEventListener("input", function () {

  const keyword = this.value.toLowerCase();

  if (!keyword) { resetCategories(); return; }

  const categories = document.querySelectorAll(".portal-category");

  categories.forEach((category) => {

    const menus = category.querySelectorAll(".icon-menu");

    let visibleCount = 0;

    menus.forEach((menu) => {

      const text = menu.innerText.toLowerCase();

      if (text.includes(keyword)) {

        menu.style.display = "flex";

        visibleCount++;

      } else {

        menu.style.display = "none";

      }

    });

    if (visibleCount === 0) {

      category.style.display = "none";

    } else {

      category.style.display = "block";

    }

  });

});