 document.addEventListener('DOMContentLoaded', init);


function init() {
  //create shortcut vars
  const back_btn = document.getElementsByClassName("prev")[0];
  const next_btn = document.getElementsByClassName("next")[0];
  const frame1 = document.querySelector(".frame1");
  const frame2 = document.querySelector(".frame2");
  const slides = frame2.querySelectorAll(".slide2");
  const caption = document.querySelector(".caption");
  
  //const controls = document.querySelector(".controls");


  frame1.classList.add("hide_frame");
  frame2.classList.add("appearance_frame");

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
   caption.innerHTML = frame2.firstElementChild.alt;

   //show the controls
   //controls.style.display = "block";
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
    else if (getTime() - counter < 3) return;
    
    //shortcut vars
    const frame = document.querySelector(".frame2");
    const slides = frame.querySelectorAll(".slide2");
    const caption = document.querySelector(".caption");
    let showing = document.querySelector(".current");
    let nextUp = "";
  
    if (e) {
      if(e.currentTarget.className.includes('next')) {
        nextUp = showing.nextElementSibling;
      }
    
      if(e.currentTarget.className.includes('prev')) {
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