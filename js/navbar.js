document.addEventListener("DOMContentLoaded", function() {
  fetch('../navbar.html')
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
  const dropdowns = document.querySelectorAll('.dropdown'); // Select all dropdowns

  menuIcon.onclick = function() {
    menuLinks.classList.toggle("show-menu");
  };

  // Adding click event listener for toggling each dropdown
  dropdowns.forEach(dropdown => {
    dropdown.onclick = function(event) {
      event.stopPropagation();
      const dropdownContent = this.querySelector('.dropdown-content');
      dropdownContent.classList.toggle('show-dropdown');
    };
  });
}

