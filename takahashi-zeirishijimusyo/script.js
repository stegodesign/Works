const progressBars = document.querySelectorAll('.progress-fill');
progressBars.forEach(bar => {
    // ページロード時にアニメーション開始
    setTimeout(() => {
        bar.style.setProperty('--progress-width', '90%');
    }, 500);

    // 定期的に値を変更
    setInterval(() => {
        const randomValue = Math.random() * 80 + 20; // 20-100%
        bar.style.setProperty('--progress-width', `${randomValue}%`);
    }, 3000);
});

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.querySelector('.container').style.display = '';
  }, 800); // 0.8秒だけ余韻を残す
});




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

  if (!hg || !nav) return;

  hg.addEventListener('click', () => {
    const isActive = nav.classList.contains('active');

    if (isActive) {
      hg.classList.remove('active');
      nav.classList.remove('active');
    } else {
      hg.classList.add('active');
      nav.classList.add('active');
    }
  });

  document.addEventListener('click', function(e) {
    if (nav.contains(e.target) || hg.contains(e.target)) {
      return;
    }
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });
}




function formsubmit(form){
  alert('送信が完了しました。');
  return false;
}