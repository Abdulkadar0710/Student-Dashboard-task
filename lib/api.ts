import type { Student } from "./types"

// Mock student data
let mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    course: "Computer Science",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
    course: "Mathematics",
    enrollmentDate: "2023-08-15",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "345-678-9012",
    course: "Physics",
    enrollmentDate: "2023-09-10",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "456-789-0123",
    course: "Chemistry",
    enrollmentDate: "2023-07-20",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "567-890-1234",
    course: "Biology",
    enrollmentDate: "2023-08-05",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    phone: "678-901-2345",
    course: "Computer Science",
    enrollmentDate: "2023-09-15",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all students
export const fetchStudents = async (): Promise<Student[]> => {
  await delay(1000) // Simulate network delay
  return [...mockStudents]
}

// Fetch student by ID
export const fetchStudentById = async (id: string): Promise<Student> => {
  await delay(800) // Simulate network delay
  const student = mockStudents.find((s) => s.id === id)
  if (!student) {
    throw new Error("Student not found")
  }
  return { ...student }
}

// Add a new student
export const addStudent = async (studentData: Omit<Student, "id">): Promise<Student> => {
  await delay(1200) // Simulate network delay

  // Create a new student with a random ID
  const newStudent: Student = {
    id: Math.floor(Math.random() * 10000).toString(),
    ...studentData,
  }

  // mockStudents = [...mockStudents, newStudent] // Add the new student to the mock data

  // In a real app, this would be an API call to add the student to the database
  // For this mock, we're just returning the new student
  return newStudent
}
