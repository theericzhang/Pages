const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
	if(!menuOpen){
		menuBtn.classList.add('open');
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)"
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,1)"
    document.getElementById("ericZ").style.color = "#fff";
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
		menuOpen = true;
	}else{
		menuBtn.classList.remove('open');
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.backgroundColor = "#FFF"
    document.getElementById("navbar").style.backgroundColor = "#FFF"
    document.getElementById("ericZ").style.color = "#000";
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";

    // menuBtn.classList.
		menuOpen = false;
	}
})

var prevScrollpos = window.pageYOffset;

// alert(prevScrollpos);
window.onscroll = function() {
  var currentScrollpos = window.pageYOffset;

  if(prevScrollpos > currentScrollpos){
    document.getElementById("navbar").style.top = "0";
  }else if(prevScrollpos <= 82){
    document.getElementById("navbar").style.top = "0";
  }

  else{
    document.getElementById("navbar").style.top = "-90px";
  }

  prevScrollpos = currentScrollpos;
}

// var mySwiper = new Swiper ('.swiper-container', {
//       // Optional parameters
//       direction: 'vertical',
//       loop: true,

//       // If we need pagination
//       pagination: {
//         el: '.swiper-pagination',
//       },

//       // Navigation arrows
//       navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },

//       // And if we need scrollbar
//       scrollbar: {
//         el: '.swiper-scrollbar',
//       },
//     })





function openNav() {
  // alert("bruh");
}

function closeNav(){
  // alert("bruh2");
}

function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

window.addEventListener('keydown', handleFirstTab);


