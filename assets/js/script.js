$(document).ready(function() {
    // Smooth scroll for links with hashes
    $('a[href*="#"]').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Load header content
    $("#page-header").load("header.html");

 
    // Add active class to the current nav item
    var current = window.location.pathname.split('/').pop();
    $('.navbar-nav a[href="' + current + '"]').addClass('active');
});
