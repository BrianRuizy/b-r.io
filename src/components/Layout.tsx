import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-auto" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
