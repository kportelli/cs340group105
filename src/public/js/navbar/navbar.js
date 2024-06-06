document.addEventListener('DOMContentLoaded', function() {
    var navItems = document.querySelectorAll('.nav-item');
  
    navItems.forEach(function(navItem) {
      navItem.addEventListener('click', function() {
        // Remove 'active' class from all nav items
        navItems.forEach(function(navItem) {
          navItem.classList.remove('active');
        });
  
        // Add 'active' class to the clicked nav item
        this.classList.add('active');
      });
    });
  });