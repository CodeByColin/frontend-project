// Select elements
const shiba = document.getElementById('shibabtn');
const shibaInput = document.getElementById('shibaSearch');
const bird = document.getElementById('birdbtn');
const birdInput = document.getElementById('birdSearch');
const cat = document.getElementById('catbtn');
const catInput = document.getElementById('catSearch');
const imageContainer = document.getElementById('image-container');
const galleryImages = document.getElementById('gallery-images');

let inputValue;
let imgArr;

// Event listeners for animal buttons
shiba.addEventListener('click', function () {
  inputValue = shibaInput.value;
  fetchDataAndBuildImages('shibes');
});

bird.addEventListener('click', function () {
  inputValue = birdInput.value;
  fetchDataAndBuildImages('birds');
});

cat.addEventListener('click', function () {
  inputValue = catInput.value;
  fetchDataAndBuildImages('cats');
});

// Fetch data and build images
function fetchDataAndBuildImages(animalType) {
  $.get(`http://shibe.online/api/${animalType}?count=${inputValue}`, function (data) {
    imgArr = data;
    buildImages(imgArr);
  });
}

// Build and display images
function buildImages(imgArr) {
  // Remove excess images if the total exceeds 1000
  const currentImages = imageContainer.getElementsByTagName('img');
  if (currentImages.length + imgArr.length > 1000) {
    const imagesToRemove = currentImages.length + imgArr.length - 1000;
    for (let i = 0; i < imagesToRemove; i++) {
      if (imageContainer.lastChild) {
        imageContainer.removeChild(imageContainer.lastChild);
      }
    }
  }

  // Add new images to the container at the top
  imgArr.forEach(function (imgUrl) {
    const imgElement = document.createElement('img');
    imgElement.src = imgUrl;
    if (imageContainer.firstChild) {
      imageContainer.insertBefore(imgElement, imageContainer.firstChild);
    } else {
      imageContainer.appendChild(imgElement);
    }
  });

  // Update local storage with the current gallery images
  saveGalleryToLocalStorage();
}
