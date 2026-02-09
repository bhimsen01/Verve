  window.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".nav-btn.secondary-btn");
    const currentPage = window.location.pathname.split("/").pop();

    buttons.forEach(btn => {
      const link = btn.getAttribute("onclick");
      if (link && link.includes(currentPage)) {
        btn.classList.add("active");
      }
    });
  });