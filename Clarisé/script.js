const Humburger = document.getElementById('js-hg');
const Nav = document.getElementById('js-nav');

Humburger.addEventListener('click', function() {
  this.classList.toggle('open'); // ボタンの開閉アニメーション用
  Nav.classList.toggle('open');  // ナビの表示切替
});