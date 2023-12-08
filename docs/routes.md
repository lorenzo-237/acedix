# Project :

- **GET /projects:** Récupérer tous les projets.
- **GET /projects/:id:** Récupérer un projet spécifique.
- **POST /projects:** Créer un nouveau projet.
- **PUT /projects/:id:** Mettre à jour les détails d'un projet existant.
- **DELETE /projects/:id:** Supprimer un projet.

# Version :

- **GET /projects/:project_id/versions:** Récupérer toutes les versions d'un projet.
- **POST /projects/:project_id/versions:** Créer une nouvelle version pour un projet.
- **GET /versions/:id:** Récupérer une version spécifique.
- **PUT /versions/:id:** Mettre à jour les détails d'une version existante.
- **DELETE /versions/:id:** Supprimer une version.
  
# Board :

- **GET /versions/:version_id/boards:** Récupérer tous les tableaux d'une version.
- **POST /versions/:version_id/boards** Créer un nouveau tableau pour la version.
- **GET /boards/:id:** Récupérer un tableau spécifique.
- **PUT /boards/:id:** Mettre à jour les détails d'un tableau existant.
- **DELETE /boards/:id:** Supprimer un tableau.

# List :

- **GET /boards/:board_id/lists:** Récupérer toutes les listes d'un tableau.
- **POST /boards/:board_id/lists:** Créer une nouvelle liste dans un tableau.
- **GET /lists/:id:** Récupérer une liste spécifique.
- **PUT /lists/:id:** Mettre à jour les détails d'une liste existante.
- **DELETE /lists/:id:** Supprimer une liste.

# Card :

- **GET /lists/:list_id/cards:** Récupérer toutes les cartes d'une liste.
- **POST /lists/:list_id/cards:** Créer une nouvelle carte dans une liste.
- **GET /cards/:id:** Récupérer une carte spécifique.
- **PUT /cards/:id:** Mettre à jour les détails d'une carte existante.
- **DELETE /cards/:id:** Supprimer une carte.

# User :

- **POST /users/signup:** Créer un nouvel utilisateur.
- **POST /users/login:** Authentifier un utilisateur.
- **GET /users/:id:** Récupérer les informations d'un utilisateur.
- **PUT /users/:id:** Mettre à jour les informations d'un utilisateur.
- **DELETE /users/:id:** Supprimer un utilisateur.

