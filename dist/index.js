/* empty css                      */ import {
  i as l,
  S as p,
} from './assets/vendor-B2mb6eXk.js';
(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) i(e);
  new MutationObserver(e => {
    for (const r of e)
      if (r.type === 'childList')
        for (const s of r.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && i(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    const r = {};
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function i(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = t(e);
    fetch(e.href, r);
  }
})();
const c = document.querySelector('form'),
  d = document.getElementById('search'),
  u = '49595160-f5e6f0105167835ee326e8279';
c.style.display = 'block';
c.addEventListener('submit', n => {
  n.preventDefault();
  const o = d.value.trim();
  if (!o) {
    l.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      titleColor: 'red',
      position: 'topRight',
    });
    return;
  }
  fetch(
    `https://pixabay.com/api/?key=${u}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=9`
  )
    .then(t => t.json())
    .then(t => {
      console.log(t), g(t.hits);
    })
    .catch(t => {
      console.error('API Error:', t),
        l.error({
          title: 'Error',
          message: 'An error accured!',
          position: 'topCenter',
        });
    });
});
function g(n) {
  const o = document.getElementById('images-place');
  (o.innerHTML = '<p id="loadingText">Loading images,please wait...</p>'),
    setTimeout(() => {
      (o.innerHTML = ''),
        (o.style.display = 'grid'),
        (o.style.gridTemplateColumns = 'repeat(auto-fit, minmax(360px, 1fr))'),
        n.forEach(t => {
          const i = document.createElement('ul'),
            e = document.createElement('li'),
            r = document.createElement('a'),
            s = document.createElement('img'),
            a = document.createElement('div');
          (r.href = t.largeImageURL),
            (a.innerHTML = `
      <p class="likes"><strong>Likes</strong><br>${t.likes}</p>
      <p class="views"><strong>Views</strong><br>${t.views}</p>
      <p class="comments"><strong>Comments</strong><br>${t.comments}</p>
      <p class="downloads"><strong>Downloads</strong><br>${t.downloads}</p>
      `),
            (a.style.display = 'flex'),
            (a.style.justifyContent = 'space-around'),
            e.classList.add('imgItem'),
            (s.src = t.webformatURL),
            (s.alt = t.tags),
            (s.style.width = '360px'),
            (s.style.width = '100%'),
            (s.style.height = '100%'),
            (i.style.listStyleType = 'none'),
            (i.style.margin = '5px'),
            (i.style.border = '1px solid gray'),
            o.appendChild(i),
            i.appendChild(e),
            e.appendChild(r),
            r.appendChild(s),
            e.appendChild(a),
            (d.value = '');
        }),
        m.refresh();
    }, 500);
}
let m = new p('.imgItem a', { captions: !0, captionsData: 'alt' });
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', n => {
    n.target.closest('.imgItem a') &&
      (n.preventDefault(), m.open(n.target.closest('.imgItem a')));
  });
});
//# sourceMappingURL=index.js.map
