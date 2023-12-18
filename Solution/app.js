

document.getElementById('button1').addEventListener('click', function() {
  document.getElementById('infoDisplay').innerHTML = `
  <img src="image/s4.jpg" class="img-fluid" alt="">
  <h5 class="mt-4 mb-2">Introduction to Business Consulting</h5>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore</p>
  <ul>
      <li>Helping small businesses</li>
      <li>Lorem ipsum dolor sit amet</li>
      <li>Business Strategy and Management</li>
  </ul>
  `;
});


document.getElementById('button2').addEventListener('click', function() {
  document.getElementById('infoDisplay').innerHTML = `
  <img src="image/s5.jpg" class="img-fluid" alt="">
  <h5 class="mt-4 mb-2">Strategy Planning</h5>
  <div class="row">
      <div class="col-lg-6 col-12">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolore</p>
      </div>
      <div class="col-lg-6 col-12">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolore</p>
      </div>
  </div>
  `;
});

document.getElementById('button3').addEventListener('click', function() {
  document.getElementById('infoDisplay').innerHTML = `
  <img src="image/s6.jpg" class="img-fluid" alt="">
  <h5 class="mt-4 mb-2">Video Content</h5>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore</p>
  `;
  
});

document.getElementById("button1").click();

function get_navbar_offset_top(){
  const navbar = document.getElementById("navbar");
  return navbar.offsetTop;
}


window.onscroll = function() { 
  const navbar = document.getElementById("navbar");

  // makeNavbarSticky();
  const sticky = get_navbar_offset_top();
  console.log(sticky, window.pageYOffset)

  if (window.pageYOffset >= 62) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

function myFunction() {
  let x = document.getElementById("numb").value;
  let text;
  if (isNaN(x) || x < 1 || x > 10) {
    text = "Input not valid";
  } else {
    text = "Input OK";
  }
}

// function makeNavbarSticky() {
  
// }


//navbar
//  document.addEventListener('scroll', ()=>{
//      const navbar = document.querySelector('.navbar');

//      if (window.scrollY > 0){
//          navbar.classList.add('scrolled');
//      }else{
//          navbar.classList.remove('scrolled');
//      }

//  })
