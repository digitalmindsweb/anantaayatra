"use client"
import * as React from "react"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending || props.disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 bg-brand-600 text-white hover:bg-brand-700 h-10 px-4 py-2 dark:ring-offset-slate-950 dark:focus-visible:ring-brand-500",
        className
      )}
      {...props}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}
