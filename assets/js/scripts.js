/*!
* Start Bootstrap - Resume v7.0.4 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


const btnElement =document.querySelectorAll(".btn");
const itemEls =document.querySelectorAll(".item");

var tempActive = document.querySelector(".active");

btnElement.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        //Active status nav menu
        tempActive.classList.remove("active")
        btn.classList.add("active")
        tempActive = btn;

        const name = e.target.dataset.name;
        itemEls.forEach((itemEl)=>{
            if(name==="all"){
                itemEl.style.display = "block"
            }else{
                if(itemEl.classList.contains(name)){
                    itemEl.style.display = "block"
                }else{
                    itemEl.style.display = "none";
                }
            }
        })
    })
})