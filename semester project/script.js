window.onload = function() {
    document.getElementById('navbarToggler').addEventListener('click', function () {
        var navbarNav = document.getElementById('navbarNav');
        if (navbarNav.classList.contains('show')) {
            navbarNav.classList.remove('show');
        } else {
            navbarNav.classList.add('show');
        }
    });

};
