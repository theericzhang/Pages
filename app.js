//menu button triggers
//open overlays if changed, close overlay if reverted

const menuBtn = document.querySelector('.menu-btn');
const subNav = document.querySelector('.overlay a');
const aboutMe = document.getElementById("aboutMe");
const home = document.getElementById("ericZ");

subNav.addEventListener('click', () => {
    closeOverlay();
})
home.addEventListener('click', () => {
    closeOverlay();
})
let menuOpen = false;
menuBtn.addEventListener('click', () => {
	if(!menuOpen){
		openOverlay();
	}else{
		closeOverlay();
	}
})

// document.getElementById("pAboutFade").style.opacity = 0;


// if(window.location.pathname==="/aboutme.html"){
//     alert("hi");
// }

// if(document.URL.includes("aboutme.html")){
//     alert("hi");
//     document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)"
//     document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,1)"
//     document.getElementById("ericZ").style.color = "#fff";
//     // document.body.backgroundColor = black;
//     document.getElementById("menu-btn__burger").style.background = "#fff";
// }

// if(document.URL.includes("index.html")){
//   alert("hi2");

// }

aboutMe.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)";
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,1)";
    document.getElementById("ericZ").style.color = "#fff";
    // document.body.backgroundColor = black;
    // document.getElementById("menu-burg").style.background = "#fff";
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
    menuOpen = false;
})

//changing class properties
function closeOverlay(){
  if(document.URL.includes("aboutme.html")){
    menuBtn.classList.remove('open');
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)";
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,1)";
    document.getElementById("ericZ").style.color = "#fff";
    // document.getElementById("menu-btn__burger").style.background = "#fff";
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
    // document.body.style.backgroundColor = "#000"
    menuOpen = false;
  }else{
    menuBtn.classList.remove('open');
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.backgroundColor = "#FFF"
    document.getElementById("navbar").style.backgroundColor = "#FFF"
    document.getElementById("ericZ").style.color = "#000";
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
    // document.body.style.backgroundColor = "#000"
    menuOpen = false;
  }
    
}

function openOverlay(){
    menuBtn.classList.add('open');
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)"
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,1)"
    document.getElementById("ericZ").style.color = "#fff";
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
    menuOpen = true;
}

//scroll to top. swup messes with position?
      // window.scrollTo(0, 0);

// var mySwiper = new Swiper ('.swiper-container', {
//           // Optional parameters
//           autoplay: {
//             delay: 4000,
//           },
//           direction: 'horizontal',
//           loop: true,   
//         });


//Scrolling navbar behavior
var prevScrollpos = window.pageYOffset;

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

//transition btwn pages
// import Swup from 'swup';
// const swup = new Swup();

// document.addEventListener("DOMContentLoaded", () => {
//     alert("hi");
// });

//accessibility

function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

window.addEventListener('keydown', handleFirstTab);


