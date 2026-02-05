# Campaign Dashboard

Un tableau de bord interactif pour gérer et analyser les campagnes publicitaires. Le projet est développé avec **React**, **TypeScript**, **Tailwind CSS**, et utilise **React Router** pour la navigation.

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Utilisation](#utilisation)
- [Routes](#routes)

---

## Fonctionnalités

- Visualisation des statistiques globales des campagnes (CTR, CPC, impressions, clics)
- Liste paginée des campagnes avec recherche
- Détails de chaque campagne
- Activation / pause des campagnes
- Création de nouvelles campagnes via un formulaire
- Navigation fluide entre les pages
- Interface moderne et responsive avec Tailwind CSS

---

## Technologies

- **React** + **TypeScript**  
- **React Router DOM** pour la navigation  
- **Tailwind CSS** pour le design  
- **Axios** pour les requêtes API  
- **React Icons / Lucide** pour les icônes  

---

## Installation

git clone https://github.com/Gaillard2/spot.git
cd spot

cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev

##Structure du projet
spot/
├─ backend/           # Serveur API Express
│   ├─ controllers/
│   ├─ services/
│   ├─ routes/
│   └─ config/
├─ frontend/          # App React + Tailwind
│   ├─ components/
│   ├─ pages/
│   └─ services/
├─ README.md


| Méthode | Endpoint                | Description               |
| ------- | ----------------------- | ------------------------- |
| POST    | `/campaigns`            | Créer une campagne        |
| GET     | `/campaigns`            | Liste paginée             |
| GET     | `/campaigns/:id`        | Détail campagne           |
| PATCH   | `/campaigns/:id/status` | Activer / mettre en pause |
| GET     | `/campaigns/:id/stats`  | Stats (CTR, CPC)          |




