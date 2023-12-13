var phone_input = document.getElementById("myform_phone");

phone_input.addEventListener('input', () => {
  phone_input.setCustomValidity('');
  phone_input.checkValidity();
});

phone_input.addEventListener('invalid', () => {
  if(phone_input.value === '') {
    phone_input.setCustomValidity('Enter phone number!');
  } else {
    phone_input.setCustomValidity('Enter phone number in this format: 123-456-7890');
  }
});

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
