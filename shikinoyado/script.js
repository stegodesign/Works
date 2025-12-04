const container = document.querySelector('.container');

// -------------------------
// header と footer の読み込み
// -------------------------
const isEnglishPage = window.location.pathname.includes('-EN');

Promise.all([
  fetch(isEnglishPage ? 'header-EN.html' : 'header.html').then(res => res.text()),
  fetch(isEnglishPage ? 'footer-EN.html' : 'footer.html').then(res => res.text())
])
  .then(([headerData, footerData]) => {
    container.insertAdjacentHTML('afterbegin', headerData);
    container.insertAdjacentHTML('beforeend', footerData);

    // header挿入後にイベントや季節設定を実行
    setHamburgerEvent();
    setSeasonTabs();
    setSeasonAsssets();
  })
  .catch(err => {
    console.error('Header/Footer fetch error:', err);
    // headerがなくても動くよう最低限のイベント設定
    setHamburgerEvent();
    setSeasonTabs();
  });



// -------------------------
// ハンバーガーメニュー設定
// -------------------------
function setHamburgerEvent() {
  const hg = document.querySelector('#js-hg');
  const nav = document.querySelector('#js-nav');
  const body = document.body;

  if (!hg || !nav) return;

  hg.addEventListener('click', () => {
    const isActive = nav.classList.contains('active');
    hg.classList.toggle('active', !isActive);
    nav.classList.toggle('active', !isActive);
    body.classList.toggle('nav', !isActive);
    body.classList.toggle('active', !isActive);
  });
}


// -------------------------
// クリックでパーティクルアニメーション
// -------------------------
setupParticleAnimation({
  section: '.spring-section',
  container: '.spring-click-animation',
  images: ['sakura1.svg', 'sakura2.svg', 'sakura3.svg'],
  amount: 5,
});
setupParticleAnimation({
  section: '.summer-section',
  container: '.summer-click-animation',
  images: ['bright1.svg', 'bright2.svg', 'bright3.svg'],
  amount: 7,
});
setupParticleAnimation({
  section: '.autumn-section',
  container: '.autumn-click-animation',
  images: ['momiji1.svg', 'momiji2.svg', 'momiji3.svg'],
  amount: 5,
});
setupParticleAnimation({
  section: '.winter-section',
  container: '.winter-click-animation',
  images: ['snow1.svg', 'snow2.svg', 'snow3.svg', 'snow4.svg', 'snow5.svg'],
  amount: 6,
});
function setupParticleAnimation(options) {
  const area = document.querySelector(options.section);
  const container = document.querySelector(options.container);
  if (!area || !container) return;

  area.addEventListener("click", (e) => {
    for (let i = 0; i < options.amount; i++) {
      const img = document.createElement("img");
      img.src = `../images/${options.images[Math.floor(Math.random() * options.images.length)]}`;
      img.classList.add("particle");
      img.style.left = e.clientX + "px";
      img.style.top = e.clientY + "px";
      const speedX = (Math.random() - 0.5) * 120;
      const speedY = 10 + Math.random() * 200;
      const rotate = (Math.random() - 0.5) * 720;
      img.style.setProperty("--dx", speedX + "px");
      img.style.setProperty("--dy", speedY + "px");
      img.style.setProperty("--rot", rotate + "deg");
      container.appendChild(img);
      img.addEventListener("animationend", () =>  img.remove());
    }
  });
}

// -------------------------
// 季節ごとのタブ制御
// -------------------------
function setSeasonTabs() {
  document.querySelectorAll('.season-section').forEach(section => {
    const buttons = Array.from(section.querySelectorAll('.season-btn button'));
    const panels = Array.from(section.querySelectorAll('.season-contents, .season-contents-reverse'));
    if (!buttons.length || !panels.length) return;

    buttons.forEach((b, idx) => b.classList.toggle('active', idx === 0));
    panels.forEach((p, idx) => p.classList.toggle('hidden', idx !== 0));

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.add('hidden'));
        btn.classList.add('active');
        panels[idx].classList.remove('hidden');
      });
    });
  });
}

// -------------------------
// 季節アイコン切り替え
// -------------------------
function setSeasonAsssets() {
  const month = new Date().getMonth() + 1;
  let season = '';

  if (month >= 3 && month <= 5) season = 'spring';
  else if (month >= 6 && month <= 8) season = 'summer';
  else if (month >= 9 && month <= 11) season = 'autumn';
  else season = 'winter';

  document.body.classList.add(season);
  window.season = season;

  const seasonIcon = document.getElementById('season-icon');
  if (!seasonIcon) {
    console.error('season-icon not found!');
    return;
  }

  seasonIcon.src = `../images/lang-icon-${season}.svg`;
  console.log(`Current season: ${season}`);
  console.log(`Updated icon to: ../images/lang-icon-${season}.svg`);
}
function updateRoomDesc(index) {
  document.querySelectorAll('.room-desc .desc').forEach((el, i) => {
    el.style.display = (i === index) ? 'block' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper === 'undefined') return;
  const topSwiper = document.querySelector('.top-swiper');
  if (topSwiper) {
    window.swiper = new Swiper('.top-swiper', {
      loop: true,
      navigation: {
        nextEl: '.top-next',
        prevEl: '.top-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // ブレークポイントで表示数と間隔を調整
      breakpoints: {
        // スマホ（縦）〜小画面
        320: {
          slidesPerView: 1.4,
          spaceBetween: 16,
        },
        // スマホ横〜タブレット
        640: {
          slidesPerView: 2.0,
          spaceBetween: 28,
        },
        // ラージタブレット〜小型デスクトップ
        900: {
          slidesPerView: 2.6,
          spaceBetween: 60,
        },
        // デスクトップ
        1200: {
          slidesPerView: 3.6,
          spaceBetween: 110,
        }
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const season = window.season || Array.from(document.body.classList).find(c => ['spring','summer','autumn','winter'].includes(c)) || 'spring';

    const map = { spring: 0, summer: 1, autumn: 2, winter: 3 };
    const initialSlide = map[season] ?? 0;

    const subSwiper = new Swiper('.sub-swiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
      loop: true,
      observer: true,
      observeParents: true,
      updateOnWindowResize: true,
      initialSlide: initialSlide,
      navigation: {
        nextEl: '.sub-next',
        prevEl: '.sub-prev',
      },
    });
    if (!window.season) {
      let tries = 0;
      const t = setInterval(() => {
        tries++;
        if (window.season || tries > 20) {
          clearInterval(t);
          const s = window.season || season;
          const idx = map[s] ?? 0;
          if (typeof subSwiper.slideToLoop === 'function') {
            subSwiper.slideToLoop(idx, 0);
          } else {
            subSwiper.slideTo(idx, 0);
          }
        }
      }, 100);
    }
  });

  
/* 変更: room スワイパー初期化を関数化して、Swiper 読み込み完了後に確実に呼ぶ */
function initRoomSwipers() {
  const thumbEl = document.querySelector('.room-thumb-swiper');
  const mainEl = document.querySelector('.room-swiper');
  if (!mainEl) return;

  // サムネイルがあれば生成
  const roomThumbSwiper = thumbEl ? new Swiper('.room-thumb-swiper', {
    slidesPerView: 5,
    spaceBetween: 16,
    freeMode: false,
    allowTouchMove: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    centeredSlides: false,
    slideToClickedSlide: true,
    updateOnWindowResize: true,
    loop: false,
    observer: true,
    observeParents: true,
  }) : null;

  // メインスライダー
  const roomSwiper = new Swiper('.room-swiper', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 10,
    navigation: { nextEl: '.sub-next', prevEl: '.sub-prev' },
    thumbs: roomThumbSwiper ? { swiper: roomThumbSwiper } : undefined,
    observer: true,
    observeParents: true,
    on: {
      init() {
        // 初期同期：thumb を移動、説明文を合わせる
        if (roomThumbSwiper && typeof roomThumbSwiper.slideTo === 'function') {
          roomThumbSwiper.slideTo(this.realIndex, 0);
          roomThumbSwiper.update();
        }
        updateRoomDesc(this.realIndex);
      },
      slideChange() {
        // スライド更新時に desc を切り替え、thumb を同期
        const idx = this.realIndex;
        updateRoomDesc(idx);
        if (roomThumbSwiper && typeof roomThumbSwiper.slideTo === 'function') {
          roomThumbSwiper.slideTo(idx, 200);
        }
      }
    }
  });

  // 返却（必要なら外で参照できるように）
  window.roomThumbSwiper = roomThumbSwiper;
  window.roomSwiper = roomSwiper;
}



/* DOM 準備後に Swiper が読み込まれるまで待って初期化 */
document.addEventListener('DOMContentLoaded', () => {
  const tryInit = () => {
    if (typeof Swiper === 'undefined') return false;
    initRoomSwipers();
    return true;
  };
  if (!tryInit()) {
    const interval = setInterval(() => {
      if (tryInit()) clearInterval(interval);
    }, 100);
    // タイムアウトは必要なら追加
  }
});


function initRoomSwipers() {
  const thumbEl = document.querySelector('.room-thumb-swiper');
  const mainEl = document.querySelector('.room-swiper');
  if (!mainEl) return;

  // ★ URL room=? を取得 ★
  const params = new URLSearchParams(window.location.search);
  const initialRoomIndex = parseInt(params.get("room")) || 0;

  // サムネイルスワイパー
  const roomThumbSwiper = thumbEl ? new Swiper('.room-thumb-swiper', {
    slidesPerView: 5,
    spaceBetween: 16,
    freeMode: false,
    allowTouchMove: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    centeredSlides: false,
    slideToClickedSlide: true,
    updateOnWindowResize: true,
    loop: false,
    observer: true,
    observeParents: true,
  }) : null;

  // メインスワイパー（★ initialSlide を追加 ★）
  const roomSwiper = new Swiper('.room-swiper', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 10,
    initialSlide: initialRoomIndex, // ← ★ここが重要！
    navigation: { nextEl: '.sub-next', prevEl: '.sub-prev' },
    thumbs: roomThumbSwiper ? { swiper: roomThumbSwiper } : undefined,
    observer: true,
    observeParents: true,
    on: {
      init() {
        if (roomThumbSwiper && typeof roomThumbSwiper.slideTo === 'function') {
          roomThumbSwiper.slideTo(this.realIndex, 0);
          roomThumbSwiper.update();
        }
        updateRoomDesc(this.realIndex);
      },
      slideChange() {
        const idx = this.realIndex;
        updateRoomDesc(idx);
        if (roomThumbSwiper && typeof roomThumbSwiper.slideTo === 'function') {
          roomThumbSwiper.slideTo(idx, 200);
        }
      }
    }
  });

  window.roomThumbSwiper = roomThumbSwiper;
  window.roomSwiper = roomSwiper;
}



/* Swiper ライブラリが読み込まれるまで待って init を呼ぶ */
document.addEventListener('DOMContentLoaded', () => {
  const tryInit = () => {
    if (typeof Swiper === 'undefined') return false;
    initRoomSwipers();
    return true;
  };
  if (!tryInit()) {
    const interval = setInterval(() => {
      if (tryInit()) clearInterval(interval);
    }, 100);
  }
});

window.addEventListener('load', () => {
  if (window.swiper && typeof window.swiper.update === 'function') {
    window.swiper.update();
  }
});