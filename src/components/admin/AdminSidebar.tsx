"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Map, MapPin, Image as ImageIcon, Settings } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Itineraries", href: "/admin/itineraries", icon: Map },
  { name: "Places", href: "/admin/places", icon: MapPin },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 border-r border-slate-800 z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-white font-bold text-xl tracking-tight">Admin CMS</span>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActive ? "bg-brand-600 text-white" : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="mr-3 h-5 w-5 shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
