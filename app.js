// app.js
// Behavior and data. Three functions: load, save, render. Same shape as HW3.
// What changed in HW4 is where load and save go: two lines, plus what
// happens when they fail. Everything else that changes is a consequence of
// those two lines, and that is what HW4 asks you to write down.

// Paste your deployed Worker URL here after `npx wrangler deploy`.
const API = "https://mgt3745-hw4.YOUR-SUBDOMAIN.workers.dev";

// ---- HW3, for the record (superseded by ADR-002) ------------------------
// function load()      { return JSON.parse(localStorage.getItem("entries") || "[]"); }
// function save(list)  { localStorage.setItem("entries", JSON.stringify(list)); }
// -------------------------------------------------------------------------

const reviewForm = document.getElementById('review-form');
const spotNameInput = document.getElementById('spot-name');
const spotImageInput = document.getElementById('spot-image');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const reviewTextInput = document.getElementById('review-text');
const saveStatus = document.getElementById('save-status');
const emptyState = document.getElementById('empty-state');
const reviewsList = document.getElementById('reviews-list');

const STORAGE_KEY = 'travlr_photo_reviews';
let currentBase64Image = '';

function loadReviews() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : [];
}

function saveReviewsToStorage(reviews) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function renderReviews() {
  reviewsList.textContent = '';
  const reviews = loadReviews();

  if (reviews.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  reviews.forEach((review) => {
    const card = document.createElement('li');
    card.className = 'review-card';

    const title = document.createElement('h3');
    title.className = 'review-card-title';
    title.textContent = review.spotName;

    const img = document.createElement('img');
    img.className = 'review-card-img';
    img.src = review.imageData;
    img.alt = `Photo of ${review.spotName}`;

    const text = document.createElement('p');
    text.className = 'review-card-text';
    text.textContent = review.reviewText;

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(text);

    reviewsList.appendChild(card);
  });
}

function showStatus(message, isSuccess) {
  saveStatus.textContent = message;
  saveStatus.className = isSuccess ? 'success' : 'error';
  saveStatus.classList.remove('hidden');

  setTimeout(() => {
    saveStatus.classList.add('hidden');
  }, 3000);
}

spotImageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      currentBase64Image = e.target.result;
      imagePreview.src = currentBase64Image;
      imagePreviewContainer.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  } else {
    currentBase64Image = '';
    imagePreviewContainer.classList.add('hidden');
  }
});

reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const spotName = spotNameInput.value.trim();
  const reviewText = reviewTextInput.value.trim();

  if (!spotName || !currentBase64Image || !reviewText) {
    showStatus('Please provide a spot name, select an image, and write a review.', false);
    return;
  }

  const newReview = {
    id: Date.now(),
    spotName: spotName,
    imageData: currentBase64Image,
    reviewText: reviewText,
    createdAt: new Date().toISOString()
  };

  try {
    const reviews = loadReviews();
    reviews.unshift(newReview);
    saveReviewsToStorage(reviews);

    spotNameInput.value = '';
    spotImageInput.value = '';
    reviewTextInput.value = '';
    currentBase64Image = '';
    imagePreviewContainer.classList.add('hidden');

    showStatus('Photo review saved successfully!', true);
    renderReviews();
  } catch (error) {
    showStatus('Failed to save review. The photo file may be too large.', false);
  }
});

renderReviews();
