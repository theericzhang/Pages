//menu button triggers
//open overlays if changed, close overlay if reverted

const menuBtn = document.querySelector('.menu-btn');
const subNav = document.querySelector('.overlay a');

subNav.addEventListener('click', () => {
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

//changing class properties
function closeOverlay(){
    menuBtn.classList.remove('open');
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.backgroundColor = "#FFF"
    document.getElementById("navbar").style.backgroundColor = "#FFF"
    document.getElementById("ericZ").style.color = "#000";
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
    menuOpen = false;
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

//accessibility

function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

window.addEventListener('keydown', handleFirstTab);


