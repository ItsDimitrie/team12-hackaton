document.addEventListener("DOMContentLoaded", function () {
  const homeBtn = document.getElementById("homeBtn");
  const aboutBtn = document.getElementById("aboutBtn");
  const contactBtn = document.getElementById("contactBtn");
  const pokeBtn = document.getElementById("pokeBtn");

  const homeView = document.getElementById("homeView");
  const aboutView = document.getElementById("aboutView");
  const contactView = document.getElementById("contactView");
  const pokeView = document.getElementById("pokeView");

  homeBtn.addEventListener("click", function () {
    showView("home");
  });

  aboutBtn.addEventListener("click", function () {
    showView("about");
  });

  contactBtn.addEventListener("click", function () {
    showView("contact");
  });

  pokeBtn.addEventListener("click", function () {
    showView("poke");
  });

  function showView(view) {
    homeView.classList.remove("active");
    aboutView.classList.remove("active");
    contactView.classList.remove("active");
    pokeView.classList.remove("active");

    if (view === "home") {
      homeView.classList.add("active");
    } else if (view === "about") {
      aboutView.classList.add("active");
    } else if (view === "contact") {
      contactView.classList.add("active");
    } else if (view === "poke") {
      pokeView.classList.add("active");
    }
  }
});
