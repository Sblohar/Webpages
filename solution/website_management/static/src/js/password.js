
function check_password() {
  const password = document.getElementById('pass').value;
  const regexList = [
    /[0-9]/,
    /[!@#$%^&*]/,
    /[A-Z]/,
    /[a-z]/,
    /.{8,}/
  ];

  const errors = regexList.reduce((acc, regex, index) => {
    if (!regex.test(password)) {
      switch (index) {
        case 0:
          acc.push('Password must contain at least one number');
          break;
        case 1:
          acc.push('Password must contain at least one symbol');
          break;
        case 2:
          acc.push('Password must contain at least one uppercase letter');
          break;
        case 3:
          acc.push('Password must contain at least one lowercase letter');
          break;
        case 4:
          acc.push('Password must be at least 8 characters long');
          break;
        default:
          break;
      }
    }
    return acc;
  }, []);

  const passwordError = document.getElementById('passwordError');
  if (errors.length === 0) {
    passwordError.textContent = 'Valid password';
    passwordError.classList.remove('error-message');
  } else {
    passwordError.textContent = errors.join(', ');
    passwordError.classList.add('error-message');
  }
}


 function validate_password() {
                var pass = document.getElementById('pass').value;
                var confirm_pass = document.getElementById('confirm_pass').value;
                if (pass != confirm_pass) {
                    document.getElementById('confirmPasswordMessage').style.color = 'red';
                    document.getElementById('confirmPasswordMessage').innerHTML
                        = 'Use same password';

                } else {
                    document.getElementById('confirmPasswordMessage').style.color = 'green';
                    document.getElementById('confirmPasswordMessage').innerHTML =
                        'Password Matched';

                }
            }
 
