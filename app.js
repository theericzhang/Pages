const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
	if(!menuOpen){
		menuBtn.classList.add('open');
    document.getElementById("myNav").style.height = "100%";
		menuOpen = true;
	}else{
		menuBtn.classList.remove('open');
    document.getElementById("myNav").style.height = "0%";
    // menuBtn.classList.
		menuOpen = false;
	}
})

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


