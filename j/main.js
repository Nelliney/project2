document.addEventListener('DOMContentLoaded', init);
 
function init() {
  //create shortcut vars
  const back_btn = document.querySelector(".back-btn");
  const next_btn = document.querySelector(".next-btn");
  const frame = document.querySelector(".frame");
  const slides = frame.querySelectorAll("img");
  const caption = document.querySelector(".caption");
  const controls = document.querySelector(".controls");

  //with JS active, hide all images
  slides.forEach((slide) => {
    slide.classList.add("hide", "abs-pos");
  });
  
  // show the first slide
  slides[0].classList.remove("hide");
  
  //make the controls work
   next_btn.addEventListener("click",changeSlide);
   back_btn.addEventListener("click", changeSlide);

   // set the caption dynamically
   caption.innerHTML = frame.firstElementChild.alt;

   //show the controls
   controls.style.display = "block";
}

function getTime() {
  let seconds = new Date().getTime() / 1000;
  return seconds;
}

let counter = getTime();
let timerId = setInterval(() => changeSlide(null), 2000);

function changeSlide(e) {

    // stop link from trying to reload page
    if (e) e.preventDefault();
    else if (getTime() - counter < 5) return;
    
    //shortcut vars
    const frame = document.querySelector(".frame");
    const slides = frame.querySelectorAll("img");
    const caption = document.querySelector(".caption");
    let showing = document.querySelector(".current");
    let nextUp = "";
  
    if (e) {
      if(e.target.className == 'next-btn') {
        nextUp = showing.nextElementSibling;
      }
    
      if(e.target.className == 'back-btn') {
        nextUp = showing.previousElementSibling;
      }

      counter = getTime();
   } else {
    nextUp = showing.nextElementSibling;
   }
    
    // deactivate current image
    showing.classList.toggle("hide");
    showing.classList.toggle("current");
    
    //make sure next image is there
    if (!nextUp) {
      nextUp = slides[slides.length - 1];
    }
  
    if (nextUp.nodeName !== "IMG") {
      nextUp = slides[0];
    }
  
    // activate next image
    nextUp.classList.toggle("hide");
    nextUp.classList.toggle("current");

    //change caption text
    caption.innerHTML = nextUp.alt;
  }