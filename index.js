const loginBtn = document.getElementById('login-btn');


const checkEmail = () => {
  const loginEmail = document.getElementById('login-email').value;

  return String(loginEmail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const checkPassword = () => {
  const loginPassword = document.getElementById('login-password').value;

  if (loginPassword.length < 6) {
    console.error('Password too short!');
    errorsDiv.insertAdjacentHTML(
      'beforeend',
      "<div class='error'>Password is too short</div>"
    );
  }

  if (loginPassword.length > 20) {
    errorsDiv.insertAdjacentHTML(
      'beforeend',
      "<div class='error'>Password is too long</div>"
    );
  }

  return true;
}

const submitForm = (e) => {
  e.preventDefault();

  errorsDiv.innerHTML = "";

  const isEmailOk = checkEmail();
  const isPasswordOk = checkPassword();

  if (isEmailOk && isPasswordOk) {
    console.log('all is ok');
  }

  console.log('submitted!');
}

console.log('Hey');

const errorsDiv = document.getElementById('errors');

loginBtn.addEventListener('click', (e) => submitForm(e));
