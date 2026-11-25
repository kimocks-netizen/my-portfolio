export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="animate-orb-1 absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl bg-primary" />
      <div className="animate-orb-2 absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl bg-secondary" />
      <div className="animate-orb-3 absolute -bottom-24 left-1/3 w-80 h-80 rounded-full opacity-20 blur-3xl bg-primary" />
    </div>
  )
}
