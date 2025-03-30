// Dokümantasyonda belirtilen import
import iziToast from 'izitoast';
// Stil importu
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('form');
const search = document.getElementById('search');
const APIKey = '49595160-f5e6f0105167835ee326e8279';
form.addEventListener('submit', event => {
  event.preventDefault();

  const callingImage = search.value.trim();
  if (!callingImage) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      titleColor: 'red',
      position: 'topRight',
    });
    return;
  }

  fetch(
    `https://pixabay.com/api/?key=${APIKey}&q=${callingImage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=9`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      showImages(data.hits);
    })

    .catch(error => {
      console.error('API Error:', error);
      iziToast.error({
        title: 'Error',
        message: 'An error accured!',
        position: 'topCenter',
      });
    });
});

function showImages(images) {
  const container = document.getElementById('images-place');
  container.innerHTML = '<p id="loadingText">Loading images,please wait...</p>';
  setTimeout(() => {
    container.innerHTML = '';
    images.forEach(image => {
      const imgItem = document.createElement('img');
      
      

      imgItem.src = image.webformatURL;
      imgItem.alt = image.tags;
      imgItem.style.width = '360px';
      imgItem.style.height = '200px';
      imgItem.style.margin = '5px';

      container.appendChild(imgItem);
     
    });
  }, 500);
}
