'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  font-family: 'Poppins', sans-serif;
  max-width: 1200px;
  margin: auto;
  background-color: #f0f2f5;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-weight: 600;
  color: #34495e;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border: 1px solid #3498db;
  }
`;

const Button = styled.button`
  padding: 14px;
  font-size: 16px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;

  &:hover {
    background: linear-gradient(45deg, #c0392b, #a93226);
    transform: scale(1.05);
  }
`;

const StudentList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 20px;
`;

const StudentCard = styled.div`
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-8px);
  }
`;

const StudentInfo = styled.h3`
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 600;
`;

const StudentAttribute = styled.p`
  font-size: 16px;
  color: #7f8c8d;
`;

export default function Home() {
  interface Student {
    id: number;
    name: string;
    age: number;
    grade: string;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [grade, setGrade] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/students/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  interface StudentData {
    name: string;
    age: number;
    grade: string;
  }

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !age || !grade) {
      alert('Please fill all fields');
      return;
    }

    const studentData: StudentData = { name, age, grade };

    try {
      await axios.post('http://localhost:8000/students/', studentData);
      fetchStudents();
      setName('');
      setAge('');
      setGrade('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container>
      <Title>Student Management</Title>

      <Form onSubmit={handleAddStudent}>
        <Label>Name:</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        
        <Label>Age:</Label>
        <Input type="number" value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')} />
        
        <Label>Grade:</Label>
        <Input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} />
        
        <Button type="submit">Add Student</Button>
      </Form>

      <Title>Student List</Title>
      <StudentList>
        {students.map((student) => (
          <StudentCard key={student.id}>
            <StudentInfo>{student.name}</StudentInfo>
            <StudentAttribute>Age: {student.age} years old</StudentAttribute>
            <StudentAttribute>Grade: {student.grade}</StudentAttribute>
          </StudentCard>
        ))}
      </StudentList>
    </Container>
  );
}
