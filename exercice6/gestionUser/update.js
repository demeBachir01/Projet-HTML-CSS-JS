const params = new URLSearchParams(window.location.search);
const userIndex = parseInt(params.get('index'), 10);
const form = document.querySelector('form');

function chargerUtilisateur() {
  const membres = JSON.parse(localStorage.getItem('membres')) || [];
  if (Number.isNaN(userIndex) || userIndex < 0 || userIndex >= membres.length) {
    alert('Utilisateur introuvable.');
    window.location.href = 'listUser.html';
    return;
  }

  const user = membres[userIndex];
  document.getElementById('name').value = user.Nom || '';
  document.getElementById('surname').value = user.Prenom || '';
  document.getElementById('genre').value = user.Genre || 'male';
  document.getElementById('numPhone').value = user.NumPhone || '';
  document.getElementById('dateNaissance').value = user.DateDeNaissance || '';
  document.getElementById('adresse').value = user.VillePays || '';
  document.getElementById('role').value = user.Role || '';
  document.getElementById('email').value = user.email || '';
}

function enregistrerModification(event) {
  event.preventDefault();
  const membres = JSON.parse(localStorage.getItem('membres')) || [];

  if (Number.isNaN(userIndex) || userIndex < 0 || userIndex >= membres.length) {
    alert('Impossible de mettre à jour : utilisateur introuvable.');
    return;
  }

  const formData = new FormData(form);
  const updatedUser = Object.fromEntries(formData);

  membres[userIndex] = {
    Nom: updatedUser.name,
    Prenom: updatedUser.surname,
    Genre: updatedUser.genre,
    DateDeNaissance: updatedUser.dateNaissance,
    NumPhone: updatedUser.numPhone,
    VillePays: updatedUser.adresse,
    Role: updatedUser.role,
    email: updatedUser.email,
    Statut: membres[userIndex].Statut || 'Actif'
  };

  localStorage.setItem('membres', JSON.stringify(membres));
  alert('Informations mises à jour.');
  window.location.href = 'listUser.html';
}

if (form) {
  chargerUtilisateur();
  form.addEventListener('submit', enregistrerModification);
}
