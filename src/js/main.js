import axios from 'axios';
// Dokümantasyonda belirtilen import
import iziToast from 'izitoast';
// Stil importu
import 'izitoast/dist/css/iziToast.min.css';
axios.defaults.baseURL = 'https://pixabay.com';

const form = document.querySelector('form');
const search = document.getElementById('search');
const btn = document.getElementById('submit-btn');
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
  axios
    .get(
      `/api/?key=${APIKey}&q=${callingImage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=9`
    )
    .then(response => {
      console.log(response.data);
      showImages(response.data.hits);
    })

    .catch(error => {
      console.error('API Hatası:', error);
      iziToast.error({
        title: 'Error',
        message: 'An error accured!',
      });
    });
});

function showImages(images) {
  const container = document.getElementById('images-place');
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
}
