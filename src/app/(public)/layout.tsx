// Passthrough layout for the (public) route group.
// Route groups require a layout.tsx to be resolved correctly by Next.js App Router.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
