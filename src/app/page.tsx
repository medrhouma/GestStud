'use client' // Indique que ce composant est un composant client dans Next.js

import { useState, useEffect } from 'react'; // Importation des hooks React pour la gestion des états et des effets
import axios from 'axios'; // Importation d'Axios pour effectuer des requêtes HTTP
import styled from 'styled-components'; // Importation de styled-components pour le style des composants

// Définition du conteneur principal avec du style
const Container = styled.div`
  padding: 40px;
  font-family: 'Poppins', sans-serif; // Police utilisée
  max-width: 1200px; // Largeur maximale
  margin: auto; // Centrage du conteneur
  background-color: #f0f2f5; // Couleur de fond
  border-radius: 12px; // Bordures arrondies
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); // Ombre pour l'effet d'élévation
`;

// Définition du titre principal
const Title = styled.h1`
  text-align: center; // Centrage du texte
  color: #2c3e50; // Couleur du texte
  margin-bottom: 30px; // Marge en bas
  font-weight: 700; // Épaisseur de la police
`;

// Définition du formulaire avec style
const Form = styled.form`
  display: flex; // Affichage en flexbox
  flex-direction: column; // Organisation des éléments en colonne
  gap: 15px; // Espacement entre les éléments
  padding: 25px; // Espacement interne
  background-color: #ffffff; // Couleur de fond
  border-radius: 12px; // Bordures arrondies
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // Ombre
`;

// Style des labels
const Label = styled.label`
  font-weight: 600; // Épaisseur du texte
  color: #34495e; // Couleur du texte
`;

// Style des champs de saisie
const Input = styled.input`
  width: 100%; // Largeur complète
  padding: 12px; // Espacement interne
  font-size: 16px; // Taille du texte
  border: 1px solid #bdc3c7; // Bordure
  border-radius: 8px; // Bordures arrondies
  outline: none; // Supprime l'effet de contour par défaut
  transition: border 0.3s; // Animation de la bordure

  &:focus {
    border: 1px solid #3498db; // Changement de couleur au focus
  }
`;

// Style du bouton
const Button = styled.button`
  padding: 14px; // Espacement interne
  font-size: 16px; // Taille du texte
  background: linear-gradient(45deg, #e74c3c, #c0392b); // Dégradé de couleurs
  color: white; // Texte blanc
  border: none; // Suppression de la bordure
  border-radius: 8px; // Bordures arrondies
  cursor: pointer; // Curseur interactif
  transition: transform 0.2s, background 0.3s; // Animation au survol

  &:hover {
    background: linear-gradient(45deg, #c0392b, #a93226); // Changement de couleur au survol
    transform: scale(1.05); // Effet d'agrandissement
  }
`;

// Conteneur pour la liste des étudiants
const StudentList = styled.div`
  display: grid; // Affichage en grille
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); // Colonnes responsives
  gap: 25px; // Espacement entre les éléments
  margin-top: 20px; // Marge en haut
`;

// Style de la carte d'un étudiant
const StudentCard = styled.div`
  padding: 20px; // Espacement interne
  background: #ffffff; // Couleur de fond
  border-radius: 12px; // Bordures arrondies
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); // Ombre
  transition: transform 0.3s; // Animation

  &:hover {
    transform: translateY(-8px); // Déplacement au survol
  }
`;

// Style du nom de l'étudiant
const StudentInfo = styled.h3`
  font-size: 20px; // Taille du texte
  color: #2c3e50; // Couleur du texte
  margin-bottom: 8px; // Marge en bas
  font-weight: 600; // Épaisseur du texte
`;

// Style des attributs de l'étudiant
const StudentAttribute = styled.p`
  font-size: 16px; // Taille du texte
  color: #7f8c8d; // Couleur du texte
`;

export default function Home() {
  // Interface définissant un étudiant
  interface Student {
    id: number;
    name: string;
    age: number;
    grade: string;
  }

  // États pour stocker les étudiants et les entrées du formulaire
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [grade, setGrade] = useState('');

  // Fonction pour récupérer les étudiants depuis l'API
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/students/');
      setStudents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
    }
  };

  // Interface pour un nouvel étudiant
  interface StudentData {
    name: string;
    age: number;
    grade: string;
  }

  // Fonction pour ajouter un étudiant
  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!name || !age || !grade) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const studentData: StudentData = { name, age, grade };

    try {
      await axios.post('http://localhost:8000/students/', studentData);
      fetchStudents(); // Met à jour la liste
      setName('');
      setAge('');
      setGrade('');
    } catch (error) {
      console.error('Erreur lors de l ajout :', error);
    }
  };

  // Chargement des étudiants au montage du composant
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container>
      <Title>Gestion des Étudiants</Title>
      <Form onSubmit={handleAddStudent}>
        <Label>Nom:</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Label>Âge:</Label>
        <Input type="number" value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')} />
        <Label>Classe:</Label>
        <Input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} />
        <Button type="submit">Ajouter</Button>
      </Form>
      <Title>Liste des Étudiants</Title>
      <StudentList>
        {students.map((student) => (
          <StudentCard key={student.id}>
            <StudentInfo>{student.name}</StudentInfo>
            <StudentAttribute>Âge: {student.age} ans</StudentAttribute>
            <StudentAttribute>Classe: {student.grade}</StudentAttribute>
          </StudentCard>
        ))}
      </StudentList>
    </Container>
  );
}
