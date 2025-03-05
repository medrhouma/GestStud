# Student Management App

## 📌 Description
Une application simple de gestion des étudiants permettant d'ajouter, d'afficher et de gérer des étudiants via une interface propre et moderne. Cette application est construite avec **Next.js**, **styled-components** et **Axios** pour la gestion des requêtes API.

## 🛠️ Technologies utilisées
- **Next.js** (React Framework)
- **Styled-Components** (CSS-in-JS)
- **Axios** (Requêtes HTTP)
- **TypeScript** (Typage sécurisé)
- **FastAPI** (Backend en Python)
- **SQLite** (Base de données légère)

## 🚀 Installation et exécution

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/ton-utilisateur/nom-du-projet.git
cd nom-du-projet
```

### 2️⃣ Installer les dépendances du frontend
```bash
npm install
# ou
yarn install
```

### 3️⃣ Lancer l'application frontend
```bash
npm run dev
# ou
yarn dev
```
Ensuite, ouvre [http://localhost:3000](http://localhost:3000) pour voir l'application en action.

## 🔧 Configuration Backend (API)
L'application interagit avec une API REST développée avec **FastAPI** et **SQLite**.

### 1️⃣ Installer Python et les dépendances
Assurez-vous d'avoir **Python 3.9+** installé, puis exécutez :
```bash
pip install fastapi uvicorn pydantic sqlite3
```

### 2️⃣ Lancer le serveur backend
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
L'API sera accessible à : [http://localhost:8000](http://localhost:8000)

### 3️⃣ Vérifier les endpoints
Une fois le serveur lancé, vous pouvez tester les endpoints via :
[http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

## 📌 Fonctionnalités
✔️ Ajouter un étudiant avec **nom, âge et niveau** 📋
✔️ Afficher la liste des étudiants 🏫
✔️ Interface utilisateur soignée et réactive 🎨
✔️ API REST développée avec **FastAPI** et base de données **SQLite** 🌐


## 🤝 Contribuer
Les contributions sont les bienvenues !
1. **Fork** le projet 🍴
2. **Crée une branche** (`feature/ma-fonctionnalité`) 🌱
3. **Commit tes changements** (`git commit -m 'Ajout d'une fonctionnalité'`) ✅
4. **Push la branche** (`git push origin feature/ma-fonctionnalité`) 🚀
5. **Ouvre une pull request** 📩

## 📄 Licence
Ce projet est sous licence **MIT**. Tu peux l'utiliser et le modifier librement.

---

💡 **Développé avec ❤️ par Rhouma Mohamed(https://github.com/medrhouma)**

