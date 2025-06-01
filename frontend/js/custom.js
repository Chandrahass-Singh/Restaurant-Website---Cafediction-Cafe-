$(function () {
    "use strict";

    $(document).ready(function () {

        /*----- Preloader Start -----*/
        $(".sb-loading").animate({
            opacity: 1
        }, {
            duration: 500,
        });
        setTimeout(function () {
            $('.sb-preloader-number').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                });
            });
            $(".sb-bar").animate({
                height: '100%'
            }, {
                duration: 1000,
                complete: function () {

                    $(".sb-preloader").addClass('sb-hidden')
                }
            });
        }, 400);
        /*----- Preloader End -----*/

        /*----- Mobile Menu Start -----*/
        $(".toggle-menu, .sidemenu-close, .sidemenu-overlay").on('click', function () {
            $(".main-menu").toggleClass("menu-open");
            $(".menu ul ul").removeClass("show");
            $(".menu ul ul").slideUp(200);
        });

        $(".menu ul li.has-child-iteam").on("click", function () {
            if ($(window).width() < 992) {
                if ($(this).hasClass("show")) {
                    $(this).removeClass("show");
                    $(this).find("ul").slideUp(200);
                } else {
                    $(".menu ul li.has-child-iteam").removeClass("show");
                    $(this).addClass("show");
                    $(".menu ul ul").slideUp(200);
                    $(this).find("ul").slideDown(200);
                };
            };
        });
        /*----- Mobile Menu Start -----*/

        /*----- Cart Dropdown Start -----*/
        const $menu = $('.cart-menu, .cart .cart-link');
        $(document).mouseup(e => {
            if (!$menu.is(e.target)
                && $menu.has(e.target).length === 0) {
                $(".cart-menu").removeClass("open");
            }
        });

        $(".main-menu .menu-icon ul li.cart .cart-link").on('click', function () {
            $(".cart-menu").toggleClass("open");
        });
        /*----- Cart Dropdown End -----*/

        /*----- Header Sticky Start ----- */
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.header').addClass('fixed');
            } else {
                $('.header').removeClass('fixed');
            }
        });
        /*----- Header Sticky End ----- */

        /*----- Header Search Start ----- */
        $(".header-search").on('click', function () {
            $(".search-popup").toggleClass("open");
            $(".search-box .form-control").focus();
        });
        $(".close-search, .search-popup-overlay").on('click', function () {
            $(".search-popup").toggleClass("open");
        });
        /*----- Header Search End ----- */

        /*----- Full widht Section Start ----- */
        container_spacer();
        jQuery('.left-container').css('opacity', 1);
        jQuery('.right-container').css('opacity', 1);

        $(window).resize(function () {
            container_spacer();
        });
        /*----- Full widht Section End ----- */

        /*----- Contact Form SMS Start ----- */
        $('.contactfrm').on('submit', function (e) {
            e.preventDefault();
            $('.contactfrmmsg').slideDown('slow');
        });
        /*----- Contact Form SMS End ----- */

        /*----- Top Recipes Slider Start ----- */
        if ($(".top-recipes-slider").length > 0) {
            $('.top-recipes-slider').owlCarousel({
                loop: true,
                nav: true,
                dots: false,
                items: 4,
                margin: 30,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                        dots: true,
                    },
                    768: {
                        items: 2,
                        nav: false,
                        dots: true,
                    },
                    992: {
                        items: 3,
                        nav: false,
                        dots: true,
                    },
                    1200: {
                        items: 4,
                        nav: true,
                        dots: false,
                    },
                }
            });
        }
        /*----- Top Recipes Slider End ----- */

        /*----- Testimonial Slider Start ----- */
        if ($(".testimonial-slider").length > 0) {
            $('.testimonial-slider').owlCarousel({
                loop: true,
                nav: true,
                dots: false,
                items: 3,
                margin: 8,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                        dots: true,
                    },
                    768: {
                        items: 2,
                        nav: false,
                        dots: true,
                    },
                    992: {
                        items: 3,
                        nav: false,
                        dots: true,
                    },
                    1200: {
                        items: 3,
                        nav: true,
                        dots: false,
                    },
                }
            });
        }
        /*----- Testimonial Slider End ----- */

        /*----- Instagram Slider Start ----- */
        if ($(".instagram-slider").length > 0) {
            $('.instagram-slider').owlCarousel({
                loop: true,
                nav: false,
                dots: false,
                items: 5,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                responsive: {
                    0: {
                        items: 2,
                    },
                    575: {
                        items: 3,
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 4,
                    },
                    1200: {
                        items: 5,
                    },
                }
            });
        }
        /*----- Instagram Slider End ----- */

        /*----- Our Team Slider Start ----- */
        if ($(".team-slider").length > 0) {
            $('.team-slider').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 4,
                margin: 30,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                }
            });
        }
        /*----- Our Team Slider End ----- */

        /*----- Our Blog Slider Start ----- */
        if ($(".blog-slider").length > 0) {
            $('.blog-slider').owlCarousel({
                loop: true,
                nav: true,
                dots: false,
                items: 1,
                margin: 8,
                autoplay: true,
                autoplayTimeout: 10000,
                autoplaySpeed: 5000,
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                        dots: true,
                    },
                    768: {
                        items: 1,
                        nav: false,
                        dots: true,
                    },

                }
            });
        }
        /*----- Our Blog Slider End ----- */

        /*----- Image Litebox Start ----- */
        if ($(".instagram-slider").length > 0) {
            $('[data-fancybox="images"]').fancybox({
                thumbs: {
                    autoStart: true
                }
            })
        }
        /*----- Image Litebox End ----- */

        /*----- Delivery Animation Start ----- */
        $(window).on("load resize scroll", function () {
            if ($(window).width() > 767) {
                $('.quick-reservation').each(function () {
                    var height_sec = $(".bike-scroll").height();
                    var main_height = (height_sec - 300);
                    if ($(".quick-reservation").offset().top < ($(window).scrollTop() + main_height)) {
                        var difference = ($(window).scrollTop() + main_height) - $(this).offset().top;
                        var half = (difference / 5) + 'px',
                            left = ' + half + ';
                        $(this).find('img').css('left', half);
                    } else {
                        $(this).find('img').css('left', '0');
                    }
                });
            }
        });
        /*----- Delivery Animation End ----- */

        /*----- Price Rang bar Start ----- */
        if ($(".range-slider").length > 0) {
            const settings = {
                fill: '#61ad0c',
                background: '#eeeeee'
            }

            const sliders = document.querySelectorAll('.range-slider');
            Array.prototype.forEach.call(sliders, (slider) => {
                slider.querySelector('input').addEventListener('input', (event) => {
                    slider.querySelector('span').innerHTML = event.target.value;
                    applyFill(event.target);
                });
                applyFill(slider.querySelector('input'));
            });

            function applyFill(slider) {
                const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
                const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
                slider.style.background = bg;
            }
        }
        /*----- Price Rang bar End ----- */

        /*----- cart plus min Start ----- */
        $('.minus').click(function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.plus').click(function () {
            var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
        /*----- cart plus min End ----- */

        /* ---- Quick Popup JS ---- */
        if ($(".quick-view").length > 0) {
            $('.quick-view').magnificPopup({
                type: 'iframe'
            });
        }
        /* ---- Quick Popup End ---- */

    });

    $(window).on("load scroll ", function () {
        /*----- Menu Sorting Start ----- */
        if ($(".menu-grid").length > 0) {
            // init Isotope
            var $grid = $('.menu-grid').isotope({
                itemSelector: '.menu-box',
                layoutMode: 'fitRows'
            });
            // filter functions
            var filterFns = {};
            // bind filter button click
            $('.menu-tabbing').on('click', 'li', function () {
                var filterValue = $(this).attr('data-filter');
                // use filterFn if matches value
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({ filter: filterValue });
            });
            // change is-checked class on buttons
            $('.menu-tabbing').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', 'li', function () {
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                });
            });
        }
        /*----- Menu Sorting End ----- */

        /*----- Gallery masonry Start ----- */
        if ($(".gallery-grid").length > 0) {
            // init Isotope
            var $grid = $('.gallery-grid').isotope({
                itemSelector: '.gallery-item',
            });
            // filter functions
            var filterFns = {};
            // bind filter button click
            $('.gallery-tabbing').on('click', 'li', function () {
                var filterValue = $(this).attr('data-filter');
                // use filterFn if matches value
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({ filter: filterValue });
            });
            // change is-checked class on buttons
            $('.gallery-tabbing').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', 'li', function () {
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                });
            });
        }
        /*----- Gallery masonry End ----- */
    });

    function container_spacer() {
        var win = jQuery(window).width();
        var con = jQuery('.container').width();
        var total = (win - con) / 2;

        jQuery('.left-container').css('padding-left', total);
        jQuery('.right-container').css('padding-right', total);
    }
});

// Signup handler
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // 🧾 Log the signup request
    console.log("Sending signup request with:", { name, email, password });

    try {
        const response = await fetch("http://cafediction-backend.onrender.com/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        console.log("Signup response:", result); // ✅ Log the response
        alert(result.message);
    } catch (err) {
        alert("Signup failed");
        console.error("Signup error:", err);
    }
});

// Login handler
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // 🧾 Log the login request
    console.log("Sending login request with:", { email, password });

    try {
        const response = await fetch("http://cafediction-backend.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        console.log("Login response:", result); // ✅ Log the response

        if (response.ok) {
            alert("Login successful");
            localStorage.setItem("user", JSON.stringify(result.user)); // save user
            window.location.href = "index.html"; // redirect after login
        } else {
            alert(result.message);
        }
    } catch (err) {
        alert("Login failed");
        console.error("Login error:", err);
    }
});

