const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
	if(!menuOpen){
		menuBtn.classList.add('open');
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,0.9)"
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0.9)"
    document.getElementById("ericZ").style.color = "#fff";
		menuOpen = true;
	}else{
		menuBtn.classList.remove('open');
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.backgroundColor = "#FFF"
    document.getElementById("navbar").style.backgroundColor = "#FFF"
    document.getElementById("ericZ").style.color = "#000";


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
  }else if(prevScrollpos <= 0){
    document.getElementById("navbar").style.top = "0";
  }

  else{
    document.getElementById("navbar").style.top = "-82px";
  }

  prevScrollpos = currentScrollpos;
}

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


