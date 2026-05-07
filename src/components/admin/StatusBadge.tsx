import { cn } from "@/lib/utils"

export function StatusBadge({ status }: { status: string }) {
  const getColors = () => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "draft": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      case "archived": return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
    }
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize", getColors())}>
      {status}
    </span>
  )
}
