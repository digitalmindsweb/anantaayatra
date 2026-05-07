import { createClient } from "@/lib/supabase/server"
import { Users, FileText, Map, MapPin } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch quick stats
  const [
    { count: itinerariesCount },
    { count: placesCount },
    { count: postsCount },
  ] = await Promise.all([
    supabase.from("itineraries").select("*", { count: "exact", head: true }),
    supabase.from("places").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
  ])

  const stats = [
    { name: "Total Itineraries", value: itinerariesCount || 0, icon: Map, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { name: "Total Places", value: placesCount || 0, icon: MapPin, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    { name: "Blog Posts", value: postsCount || 0, icon: FileText, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} mr-6`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Welcome to your CMS</h2>
        <p className="text-slate-600 dark:text-slate-400">
          From the left sidebar, you can manage your blog posts, places, itineraries, and media. 
          Currently, the foundation is built and secured. Use the navigation to start building the content sections in the next phase!
        </p>
      </div>
    </div>
  )
}
