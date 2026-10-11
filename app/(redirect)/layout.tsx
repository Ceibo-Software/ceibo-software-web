// Layout mínimo para la ruta "/", que solo redirige a /es o /en.
export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
