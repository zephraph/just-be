import { NavBar } from 'lib/components/NavBar'

export const Layout = ({ children }) => (
  <>
    <main className="-lg:container mx-auto px-6 py-2 max-w-screen-lg">
      <NavBar />
      <section className="-mx-4 px-4">{children}</section>
    </main>
  </>
)
