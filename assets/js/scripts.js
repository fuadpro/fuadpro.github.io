/*! Start Bootstrap - Resume v7.0.4 (https://startbootstrap.com/theme/resume) Copyright 2013-2021 Start Bootstrap
Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE) */

window.addEventListener('DOMContentLoaded', event => {
    
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call( document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});


const btnElement =document.querySelectorAll(".button");
var tempActive = document.querySelector(".active");

btnElement.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        tempActive.classList.remove("active")
        btn.classList.add("active")
        tempActive = btn;
    })
})

let $grid = $('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
    });

    $('.filters-button-group').on( 'click', 'button', function() {
    let filterValue = $( this ).attr('data-filter');
    $grid.isotope({ filter: filterValue });
    });
  