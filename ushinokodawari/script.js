const container = document.querySelector('.container');

fetch('header.html')
  .then(response => response.text())
  .then(data => {
    container.insertAdjacentHTML('afterbegin', data);
    setHamburgerEvent();
  })
  .catch(() => {
    setHamburgerEvent();
  });

document.addEventListener('DOMContentLoaded', () => {
  setHamburgerEvent();
});

fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    container.insertAdjacentHTML('beforeend', data);
  })

function setHamburgerEvent() {
  const hg = document.querySelector('#js-hg');
  const nav = document.querySelector('#js-nav');
  const body = document.body

  if (!hg || !nav) return;

  hg.addEventListener('click', () => {
    const isActive = nav.classList.contains('active');

    if (isActive) {
      hg.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('nav', 'active')
    } else {
      hg.classList.add('active');
      nav.classList.add('active');
      body.classList.add('nav', 'active');
    }
  });
}