import $ from 'jquery'
import MobileDetect from 'mobile-detect'
import {parallax} from 'jquery-parallax'
import {magnificPopup} from 'magnific-popup'
//import '../static/js/imagesloaded.pkgd.min.js'
import imagesLoaded from 'imagesloaded'
import Masonry from 'masonry-layout'
import Isotope from 'isotope-layout'

function windowExists() {
    return typeof window !== undefined;
}

function documentExists() {
    return typeof document != undefined;
}

function initHeroHeight() {
    if(windowExists()) {
        $('.hero-height').height($(window).height());
    }
}

function initParallax() {
    if(windowExists()) {
        const md = new MobileDetect(window.navigator.userAgent);
        if(md.phone() === null) {
            $('.parallax-section').each(function() {
                $('.parallax-section').parallax("50%", 0.3);
            })
            $('.parallax-layer').parallax();
        }
    }
}

function initImageBackground() {
    if(windowExists()) {
        $('.image-bg').each(function(){
            if($(this).attr('data-image-bg')) {
                $(this).css({
                    "background": "url(" + $(this).data("image-bg") + ")",
                    'background-position': 'center top',
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover'
                });
            }
        });
    }
}

function initWindowResize() {
    if(windowExists()) {
        $(window).on('resize', () => {
            initHeroHeight();
            initPortfolioResize();
        });
    }
}

function initWindowScroll() {
    if(windowExists()) {
        $(window).on('scroll', () => {
            initHeaderAnimation();
        });
    }
}

function initAnimateScroll() {

}

function initNavMenu() {
    if (windowExists()) {
        const nav = $('.main-nav');
        $('.menu-bar').on('click', function() {
            if(nav.hasClass('hidden')) {
                nav.removeClass('hidden');
                nav.addClass('active');
            }
        })
        $('.menu-close').on('click', function() {
            if(nav.hasClass('active')) {
                nav.removeClass('active');
                nav.addClass('hidden');
            }
        })
    }
}

function initHeaderAnimation() {
    if(documentExists()) {
        const header = $('.header');
        var scroll_top = $(document).scrollTop();
        if(scroll_top >= 100) {
            header.removeClass('header-hidden');
            header.addClass('header-visible');
        } else {
            header.removeClass('header-visible');
            header.addClass('header-hidden');
        }
    }
}

function initMagnificPopup() {
    if(documentExists()) {
		$('.portrait-mfp').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});

		$('.portfolio-mfp').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});

		$(".video-mfp").magnificPopup({
			type: 'iframe',
			gallery: {
				enabled: true
			}
		});
    }
}

function initMasonry() {
    if(documentExists()) {
        const elems = $('.masonry');
        if (elems.length) {
            var loader = new imagesLoaded(elems);
            loader.on('done', function() {
                var m = new Masonry('.masonry');
            })
        }
    }
}

function initPortfolio() {
    const portfolioItems = $('.portfolio-items');
    if (portfolioItems.length) {
        var loader = new imagesLoaded(portfolioItems);
        loader.on('load', function() {
            portfolioItems.show();
            portfolioItems.isotope({
    
            });
        });
    
        $('.filter').find('a').on('click', function() {
            var i = new Isotope('.portfolio-items', {
                filter: $(this).attr('data-filter'),
                animationOptions: {
                    duration: 750,
                    queue: false
                }
            });
            return false
        });
    
        $('.filter a').on('click', function(){
            if (!$(this).hasClass('active')){
                $('.filter a').removeClass('active');
                $(this).addClass('active');
            }
        });
    }
}

function initPortfolioResize() {
    const portfolioItems = $('.portfolio-items');
    if (portfolioItems.length) {
        var i = new Isotope('.portfolio-items', {
            filter: $('.filter').find('a.active').attr('data-filter'),
            animationOptions: {
                duration: 750,
                queue: false
            }
        });
    }
    return false;
}

function initProgressBar() {
    if(documentExists()) {
        const elems = $('.progress-bar > span');
        elems.css({
            'transition': 'width 1.5s'
        });
    }
}

function initMisc() {
    $('.single-blog-navigation').children('a').addClass('btn-custom waves-effect');
    $('#wp-calendar').children('a').addClass('waves-effect waves-light');
    $('.pagination').children('.page-numbers').addClass('btn-circle waves-effect waves-light');
}

export function fireProgressBar(id) {
    if(documentExists()) {
        setTimeout(() => {
            var selector = `#${id}`;
            const elem = $(selector);
            var width = elem.data('percent');
            elem.css({
                'width': `${width}%`
            });
        }, 500);
    }
}
export function highlightSection(section_id) {
    if(windowExists()) {
        $('.main-nav > ul > li > a').removeClass('active-nav');
        const elem = $(`.${section_id}-nav`);
        elem.addClass('active-nav');
    }
}

export function fadeOutPreloader() {
    if(documentExists()) {
        $('#preloader').fadeOut();
    }
}

export function initGoogleMap() {
    console.debug('initGoogleMap');
    if (!documentExists()) {
        return;
    }

    if (!document.getElementById('g-map')) {
        console.debug('g-map not found');
        return;
    } else {
        console.debug('g-map found');
        const latitude = 38.8339;
        const longitude = -104.8214;
        const mapStyles = [
            [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
            [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}],
            [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
            [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}],
            [{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"},{"hue":"#ff0000"}]}],
            [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
        ];
        const mapStyleIndex = 3;

        const mapOptions = {
            scrollwheel: false,
            zoom: 14,
            center: new google.maps.LatLng(latitude, longitude),
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            styles: mapStyles[mapStyleIndex-1]
        };

        const mapElement = document.getElementById('g-map');
        const map = new google.maps.Map(mapElement, mapOptions);
        const imageSrc = mapElement.getAttribute('data-map-marker');
        const image = new google.maps.MarkerImage(imageSrc,
            null, null, null, new google.maps.Size(48,48))

        const myLatLng = new google.maps.LatLng(latitude, longitude);
        const marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
        //let x = {lat: -25.3, lng: 131};
        //let mapElem = document.getElementById("g-map");
        //console.log(x, mapElem);
        //let map = new google.maps.Map(
        //    mapElem,
        //    {zoom: 4, center: x}
        //);
        //console.log(map);
        //var marker = new google.maps.Marker({position: x, map: map});
        //console.log(marker);
    }
}

export function setupCustom() {
    initWindowResize();
    initWindowScroll();
    initHeroHeight();
    initParallax();
    initImageBackground();
    initNavMenu();
    initHeaderAnimation();
    initMagnificPopup();
    initMasonry();
    initPortfolio();
    initPortfolioResize();
    initProgressBar();
    initMisc();
}