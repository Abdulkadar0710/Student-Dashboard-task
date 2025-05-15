import type { Student } from "./types"
import { getFirestore, collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore"
import { app } from "./auth-context" 

const db = getFirestore(app)

// Fetch all students from Firestore
export const fetchStudents = async (): Promise<Student[]> => {
  const studentsCol = collection(db, "students")
  const studentsSnapshot = await getDocs(studentsCol)
  return studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student))
}

// Fetch student by ID from Firestore
export const fetchStudentById = async (id: string): Promise<Student> => {
  const studentDoc = doc(db, "students", id)
  const studentSnap = await getDoc(studentDoc)
  if (!studentSnap.exists()) {
    throw new Error("Student not found")
  }
  return { id: studentSnap.id, ...studentSnap.data() } as Student
}

// Add a new student to Firestore
export const addStudent = async (studentData: Omit<Student, "id">): Promise<Student> => {
  const studentsCol = collection(db, "students") 
  const docRef = await addDoc(studentsCol, studentData)
  return { id: docRef.id, ...studentData }
}
