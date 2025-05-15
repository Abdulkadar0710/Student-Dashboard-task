
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Mail, Phone, GraduationCap, Calendar } from "lucide-react"
import { fetchStudentById } from "@/lib/api"
import type { Student } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"
import { use } from "react"

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    const getStudent = async () => {
      try {
        const data = await fetchStudentById(id)
        setStudent(data)
      } catch (error) {
        console.error("Failed to fetch student:", error)
      } finally {
        setLoading(false)
      }
    }

    getStudent()
  }, [id])

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/dashboard/students/" + id)
    }
  }, [user, authLoading, router, id])

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-full max-w-[250px]" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {loading ? <Skeleton className="h-8 w-48" /> : student?.name}
        </h1>
      </div>

      {loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-full max-w-[250px]" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        student && (
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{student.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Course</p>
                  <p className="font-medium">{student.course}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrollment Date</p>
                  <p className="font-medium">{student.enrollmentDate || "Not provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  )
}








// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
// import { ArrowLeft, Mail, Phone, GraduationCap, Calendar } from "lucide-react"
// import { fetchStudentById } from "@/lib/api"
// import type { Student } from "@/lib/types"
// import { useAuth } from "@/lib/auth-context"

// export default function StudentDetailPage({
//   params,
// }: {
//   params: { id: string }
// }) {
//   const [student, setStudent] = useState<Student | null>(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()
//   const { user, loading: authLoading } = useAuth()

//   useEffect(() => {
//     const getStudent = async () => {
//       try {
//         const data = await fetchStudentById(params.id)
//         setStudent(data)
//       } catch (error) {
//         console.error("Failed to fetch student:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     getStudent()
//   }, [params.id])

//   // Redirect if not authenticated
//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push("/login?redirect=/dashboard/students/" + params.id)
//     }
//   }, [user, authLoading, router, params.id])

//   if (authLoading || (!user && !authLoading)) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon" disabled>
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//           <Skeleton className="h-8 w-48" />
//         </div>
//         <Card>
//           <CardHeader>
//             <Skeleton className="h-8 w-48" />
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <div key={i} className="flex items-center gap-4">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <Skeleton className="h-4 w-full max-w-[250px]" />
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button variant="ghost" size="icon" onClick={() => router.back()}>
//           <ArrowLeft className="h-4 w-4" />
//         </Button>
//         <h1 className="text-3xl font-bold tracking-tight">
//           {loading ? <Skeleton className="h-8 w-48" /> : student?.name}
//         </h1>
//       </div>

//       {loading ? (
//         <Card>
//           <CardHeader>
//             <Skeleton className="h-8 w-48" />
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <div key={i} className="flex items-center gap-4">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <Skeleton className="h-4 w-full max-w-[250px]" />
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       ) : (
//         student && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Student Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center gap-4">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
//                   <Mail className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Email</p>
//                   <p className="font-medium">{student.email}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
//                   <Phone className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Phone</p>
//                   <p className="font-medium">{student.phone || "Not provided"}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
//                   <GraduationCap className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Course</p>
//                   <p className="font-medium">{student.course}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
//                   <Calendar className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Enrollment Date</p>
//                   <p className="font-medium">{student.enrollmentDate || "Not provided"}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )
//       )}
//     </div>
//   )
// }
