import { ReactNode } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import { isAdmin } from "@/lib/auth/isAdmin"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Admin CMS | Anantaayatra",
  description: "Content Management System",
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Double verify admin role inside layout
  const hasAdminAccess = await isAdmin()
  if (!hasAdminAccess) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
