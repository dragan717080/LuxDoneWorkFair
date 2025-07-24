const addBurgerMenuListener = () => {
  const burgerMenu = document.getElementById('burger-menu');

  if (burgerMenu === null) {
    return;
  }

  burgerMenu.addEventListener('click', async (e) => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');

    const navElement = document.getElementsByTagName('nav')[0];
    const navComputedStyle = getComputedStyle(navElement);
    const currentNavDisplay = navElement.style.display;

    await wait(10);
    navElement.style.display = currentNavDisplay === 'block' ? 'none' : 'block';

    const isActive = navMenu.classList.contains('active');

    for (let i = 0; i < 101; i++) {
      navElement.style.display = 'block';
      await wait(4);
      let newOpacity = isActive ? i / 100 - 0.1 : (100 - i) / 100 + 0.1;
      // Skip opacity change for first 10 * 4 = 40 miliseconds for smoother transition
      if (i > 10) {
        navElement.style.opacity = newOpacity;
      }

      const newTransform = isActive ? 100 - i : i;
      navElement.style.transform = `translateX(${newTransform}%)`;
    }
    // Account for previous opacity skip
    navElement.style.opacity = isActive ? 1 : 0;

  });
}

addAnchorHandlers = () => {
  Array.from(document.getElementsByTagName('a')).forEach((anchorElement) => {
    const baseUrl = window.location.href.split('/').slice(0, -1).join('/') + '/';
    const targetUrl = anchorElement.href.split('/').slice(-1)[0];
    let newUrl = baseUrl + targetUrl;

    if (targetUrl === '') {
      newUrl += 'index';
    }

    newUrl += '.html';
    anchorElement.href = newUrl;
  })
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

window.onload = () => {
  addBurgerMenuListener();
  addAnchorHandlers();
}
