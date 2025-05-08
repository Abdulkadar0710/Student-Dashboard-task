"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { UserPlus, Search } from "lucide-react"
import { fetchStudents } from "@/lib/api"
import type { Student } from "@/lib/types"

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("")

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents()
        setStudents(data)
        setFilteredStudents(data)
      } catch (error) {
        console.error("Failed to fetch students:", error)
      } finally {
        setLoading(false)
      }
    }

    getStudents()
  }, [])

  useEffect(() => {
    let result = students

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (student) => student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query),
      )
    }

    // Filter by course
    if (courseFilter) {
      result = result.filter((student) => student.course === courseFilter)
    }

    setFilteredStudents(result)
  }, [searchQuery, courseFilter, students])

  // Get unique courses for filter
  const courses = [...new Set(students.map((student) => student.course))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage and view all students in the system.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/add-student">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          : filteredStudents.map((student) => (
              <Link
                key={student.id}
                href={`/dashboard/students/${student.id}`}
                className="transition-transform hover:scale-[1.02]"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {student.course}
                        </span>
                        <span className="text-xs text-muted-foreground">ID: {student.id}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>

      {!loading && filteredStudents.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-medium">No students found</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            {searchQuery || courseFilter
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding a new student."}
          </p>
          <Button asChild>
            <Link href="/dashboard/add-student">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
