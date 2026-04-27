function demarrerPage() {
  const parametres = new URLSearchParams(window.location.search);
  const indexUtilisateur = parseInt(parametres.get('index'), 10);
  const titrePage = document.getElementById('titrePage');
  const nomUtilisateur = document.getElementById('nomUtilisateur');
  const infosUtilisateur = document.getElementById('infosUtilisateur');
  const texteTache = document.getElementById('texteTache');
  const etatTache = document.getElementById('etatTache');
  const boutonAjouter = document.getElementById('boutonAjouter');
  const listeTaches = document.getElementById('listeTaches');

  const membres = JSON.parse(localStorage.getItem('membres')) || [];

  if (Number.isNaN(indexUtilisateur) || indexUtilisateur < 0 || indexUtilisateur >= membres.length) {
    titrePage.textContent = 'Utilisateur introuvable';
    nomUtilisateur.textContent = '';
    texteTache.disabled = true;
    etatTache.disabled = true;
    boutonAjouter.disabled = true;
    return;
  }

  const utilisateur = membres[indexUtilisateur];
  nomUtilisateur.textContent = `Ajouter une tâche pour ${utilisateur.Nom || ''} ${utilisateur.Prenom || ''}`.trim();

  afficherInfosUtilisateur(utilisateur);

  if (!Array.isArray(utilisateur.Taches)) {
    utilisateur.Taches = [];
  }

  utilisateur.Taches = utilisateur.Taches.map(tache => {
    if (typeof tache === 'string') {
      return { texte: tache, etat: 'En attente' };
    }
    return {
      texte: tache.texte || '',
      etat: tache.etat || tache.status || 'En attente'
    };
  });

  membres[indexUtilisateur] = utilisateur;
  localStorage.setItem('membres', JSON.stringify(membres));
  afficherTaches(utilisateur.Taches);

  boutonAjouter.addEventListener('click', () => {
    const texteNouvelleTache = texteTache.value.trim();
    const etatSelectionne = etatTache.value;

    if (!texteNouvelleTache) {
      alert('Veuillez saisir une tâche.');
      return;
    }

    utilisateur.Taches.push({ texte: texteNouvelleTache, etat: etatSelectionne });
    membres[indexUtilisateur] = utilisateur;
    localStorage.setItem('membres', JSON.stringify(membres));
    texteTache.value = '';
    etatTache.value = 'En attente';
    afficherTaches(utilisateur.Taches);
  });

  function afficherInfosUtilisateur(utilisateur) {
    const champs = {
      'Email': utilisateur.email || '-',
      'Genre': utilisateur.Genre || '-',
      'Date de naissance': utilisateur.DateDeNaissance || '-',
      'Téléphone': utilisateur.NumPhone || '-',
      'Adresse': utilisateur.VillePays || '-',
      'Rôle': utilisateur.Role || '-',
      'Statut': utilisateur.Statut || '-'
    };

    const carte = document.createElement('div');
    carte.className = 'carte-utilisateur';

    const titre = document.createElement('h2');
    titre.textContent = `${utilisateur.Nom || ''} ${utilisateur.Prenom || ''}`.trim() || 'Utilisateur';
    carte.appendChild(titre);

    const informations = document.createElement('div');
    informations.className = 'infos-utilisateur';

    Object.entries(champs).forEach(([label, valeur]) => {
      const element = document.createElement('div');
      element.className = 'element-info';

      const etiquette = document.createElement('strong');
      etiquette.textContent = `${label} :`;
      const valeurElement = document.createElement('span');
      valeurElement.textContent = valeur;

      element.appendChild(etiquette);
      element.appendChild(valeurElement);
      informations.appendChild(element);
    });

    carte.appendChild(informations);
    infosUtilisateur.innerHTML = '';
    infosUtilisateur.appendChild(carte);
  }

  function afficherTaches(taches) {
    listeTaches.innerHTML = '';
    if (!taches.length) {
      const elementVide = document.createElement('li');
      elementVide.textContent = 'Aucune tâche pour cet utilisateur.';
      listeTaches.appendChild(elementVide);
      return;
    }

    taches.forEach(tache => {
      const element = document.createElement('li');
      element.className = 'element-tache';

      const texte = document.createElement('div');
      texte.className = 'texte-tache';
      texte.textContent = tache.texte || 'Tâche vide';

      const conteneurEtat = document.createElement('div');
      conteneurEtat.className = 'conteneur-etat';

      const selectionEtat = document.createElement('select');
      selectionEtat.className = 'selection-etat';
      ['En attente', 'En cours', 'Terminée', 'Annulée'].forEach(etat => {
        const option = document.createElement('option');
        option.value = etat;
        option.textContent = etat;
        selectionEtat.appendChild(option);
      });
      selectionEtat.value = tache.etat || 'En attente';
      selectionEtat.addEventListener('change', () => {
        tache.etat = selectionEtat.value;
        membres[indexUtilisateur] = utilisateur;
        localStorage.setItem('membres', JSON.stringify(membres));
      });

      conteneurEtat.appendChild(selectionEtat);
      element.appendChild(texte);
      element.appendChild(conteneurEtat);
      listeTaches.appendChild(element);
    });
  }
}

window.addEventListener('DOMContentLoaded', demarrerPage);
