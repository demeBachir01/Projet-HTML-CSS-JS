function chargerUtilisateur() {
  const parametres = new URLSearchParams(window.location.search);
  const indexUtilisateur = parseInt(parametres.get('index'), 10);
  const membres = JSON.parse(localStorage.getItem('membres')) || [];
  const detailsUtilisateur = document.getElementById('detailsUtilisateur');
  const boutonVoirTaches = document.getElementById('boutonVoirTaches');
  const sectionTaches = document.getElementById('sectionTaches');

  if (Number.isNaN(indexUtilisateur) || indexUtilisateur < 0 || indexUtilisateur >= membres.length) {
    detailsUtilisateur.innerHTML = '<p>Utilisateur introuvable.</p>';
    return;
  }

  const utilisateur = membres[indexUtilisateur];
  const taches = Array.isArray(utilisateur.Taches)
    ? utilisateur.Taches.map(tache => (
        typeof tache === 'string'
          ? { texte: tache, statut: 'En attente' }
          : { texte: tache.texte || '', statut: tache.etat || tache.status || 'En attente' }
      ))
    : [];

  afficherCarteUtilisateur(utilisateur);

  boutonVoirTaches.addEventListener('click', () => {
    if (sectionTaches.innerHTML.trim()) {
      sectionTaches.innerHTML = '';
      boutonVoirTaches.textContent = 'Afficher les tâches';
      return;
    }
    afficherSectionTaches(taches);
    boutonVoirTaches.textContent = 'Masquer les tâches';
  });

  function afficherCarteUtilisateur(utilisateur) {
    const champs = {
      'Nom': utilisateur.Nom || '-',
      'Prénom': utilisateur.Prenom || '-',
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
    detailsUtilisateur.innerHTML = '';
    detailsUtilisateur.appendChild(carte);
  }

  function afficherSectionTaches(taches) {
    if (!taches.length) {
      sectionTaches.innerHTML = '<p>Aucune tâche pour cet utilisateur.</p>';
      return;
    }

    const titre = document.createElement('h2');
    titre.textContent = 'Tâches de l’utilisateur';
    const liste = document.createElement('ul');
    liste.className = 'liste-taches';

    taches.forEach(tache => {
      const element = document.createElement('li');
      element.className = 'element-tache';

      const texte = document.createElement('span');
      texte.textContent = tache.texte || 'Tâche vide';
      texte.className = 'texte-tache';

      const badge = document.createElement('span');
      badge.className = 'badge-etat';
      badge.textContent = tache.statut || 'En attente';

      element.appendChild(texte);
      element.appendChild(badge);
      liste.appendChild(element);
    });

    sectionTaches.innerHTML = '';
    sectionTaches.appendChild(titre);
    sectionTaches.appendChild(liste);
  }
}
