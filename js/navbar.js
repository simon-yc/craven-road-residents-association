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
  const dropdown = document.querySelector('.dropdown');

  menuIcon.onclick = function() {
      menuLinks.classList.toggle("show-menu");
  };

  // Adding click event listener for toggling the dropdown
  dropdown.onclick = function(event) {
      event.stopPropagation(); // Prevents the menu from toggling when clicking on the dropdown
      const dropdownContent = this.querySelector('.dropdown-content');
      dropdownContent.classList.toggle('show-dropdown');
  };
}
