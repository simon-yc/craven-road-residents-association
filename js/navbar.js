document.addEventListener("DOMContentLoaded", function() {
  fetch('../pages/navbar.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;
      initDropdownToggle();
    })
    .catch(error => console.error('Error loading the navbar:', error));
});

function initDropdownToggle() {
    const menuLinks = document.querySelector('#menu-links');
    const menuIcon = document.querySelector('.menu-icon');

    menuIcon.onclick = function() {
        menuLinks.classList.toggle("show-menu");
    };
}