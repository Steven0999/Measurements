const modal = document.getElementById('modal');
const form = document.getElementById('measurementForm');
const entriesDiv = document.getElementById('entries');

function openModal() {
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
}

function saveEntry(entry) {
  const data = JSON.parse(localStorage.getItem('measurements') || '[]');
  data.push(entry);
  localStorage.setItem('measurements', JSON.stringify(data));
}

function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    const data = JSON.parse(localStorage.getItem('measurements') || '[]');
    data.splice(index, 1);
    localStorage.setItem('measurements', JSON.stringify(data));
    loadEntries();
  }
}

function loadEntries() {
  const data = JSON.parse(localStorage.getItem('measurements') || '[]');
  entriesDiv.innerHTML = '';
  data.forEach((entry, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p><strong>Date:</strong> ${entry.date}</p>
      ${entry.photo ? `<img src="${entry.photo}" width="100" />` : ''}
      <p>Shoulders: ${entry.shoulders} cm</p>
      <p>Chest: ${entry.chest} cm</p>
      <p>Arms: ${entry.arms} cm</p>
      <p>Abs: ${entry.abs} cm</p>
      <p>Glutes: ${entry.glutes} cm</p>
      <p>Thighs: ${entry.thighs} cm</p>
      <p>Calves: ${entry.calves} cm</p>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;
    entriesDiv.appendChild(card);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const photoInput = document.getElementById('photo');
  const reader = new FileReader();

  const entry = {
    date: new Date().toLocaleString(),
    shoulders: form.shoulders.value,
    chest: form.chest.value,
    arms: form.arms.value,
    abs: form.abs.value,
    glutes: form.glutes.value,
    thighs: form.thighs.value,
    calves: form.calves.value,
    photo: ''
  };

  if (photoInput.files.length > 0) {
    reader.onload = () => {
      entry.photo = reader.result;
      saveEntry(entry);
      loadEntries();
      closeModal();
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    saveEntry(entry);
    loadEntries();
    closeModal();
  }
});

window.onload = loadEntries;
