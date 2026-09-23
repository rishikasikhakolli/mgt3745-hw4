// app.js
// Behavior and data. Three functions: load, save, render.
// HW4: review TEXT is persisted server-side via the Worker/D1 (schema.sql
// is intentionally one column: text). Spot name and photo are NOT part of
// that schema this round (see schema.sql comment: "a second table is
// ADR-003 territory"), so they're kept in localStorage as a client-side
// convenience only, keyed by the server-assigned entry id so each photo/
// spot name stays matched to the correct review even if entries are
// added, reloaded, or come back in a different order. Local metadata will
// NOT survive a cleared cache; only the review text will. That boundary
// is the point of this assignment.

// Paste your deployed Worker URL here after `npx wrangler deploy`.
const API = "https://mgt3745-hw4.travlr.workers.dev";

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

const LOCAL_META_KEY = 'travlr_local_meta'; // client-only: keyed by entry id
let currentBase64Image = '';

// ---- server text entries: through the Worker -----------------------------

async function loadServerEntries() {
  const res = await fetch(API + "/entries");
  if (!res.ok) {
    showStatus('Could not load saved reviews.', false);
    return [];
  }
  return res.json(); // ordered oldest-first, each { id, text, created_at }
}

async function saveTextToServer(text) {
  const res = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const reason = await res.text();
    showStatus('Could not save: ' + (reason || res.status), false);
    return null;
  }
  const { id } = await res.json();
  return id;
}

// ---- local metadata: client-side only, keyed by server id ---------------

function loadLocalMeta() {
  const saved = localStorage.getItem(LOCAL_META_KEY);
  return saved ? JSON.parse(saved) : {};
}

function setLocalMeta(id, spotName, imageData) {
  const meta = loadLocalMeta();
  meta[id] = { spotName, imageData };
  localStorage.setItem(LOCAL_META_KEY, JSON.stringify(meta));
}

// ---- render: matches server text to local metadata by id ----------------

async function renderReviews() {
  reviewsList.textContent = '';
  const entries = await loadServerEntries();
  const localMeta = loadLocalMeta();

  if (entries.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  entries.forEach((entry) => {
    // Matched by the server's actual id -- not by position -- so cards
    // can't drift out of alignment with each other.
    const meta = localMeta[entry.id];

    const card = document.createElement('li');
    card.className = 'review-card';

    if (meta && meta.spotName) {
      const title = document.createElement('h3');
      title.className = 'review-card-title';
      title.textContent = meta.spotName;
      card.appendChild(title);
    }

    if (meta && meta.imageData) {
      const img = document.createElement('img');
      img.className = 'review-card-img';
      img.src = meta.imageData;
      img.alt = `Photo of ${meta.spotName || 'saved spot'}`;
      card.appendChild(img);
    }

    const text = document.createElement('p');
    text.className = 'review-card-text';
    text.textContent = entry.text;
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

reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const spotName = spotNameInput.value.trim();
  const reviewText = reviewTextInput.value.trim();

  if (!spotName || !currentBase64Image || !reviewText) {
    showStatus('Please provide a spot name, select an image, and write a review.', false);
    return;
  }

  try {
    const id = await saveTextToServer(reviewText);
    if (id === null) return; // saveTextToServer already showed the error

    // Only reached if the server accepted the text -- key local metadata
    // by the id the server actually assigned it.
    setLocalMeta(id, spotName, currentBase64Image);

    spotNameInput.value = '';
    spotImageInput.value = '';
    reviewTextInput.value = '';
    currentBase64Image = '';
    imagePreviewContainer.classList.add('hidden');

    showStatus('Photo review saved successfully!', true);
    await renderReviews();
  } catch (error) {
    // The network itself failed (offline, DNS, CORS). fetch throws here.
    showStatus('Could not reach the server. Please try again.', false);
  }
});

renderReviews();
