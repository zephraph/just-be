import { NavBar } from 'lib/components/NavBar'

export const Layout = ({ backPath, children }) => (
  <>
    <main className="-lg:container mx-auto px-6 py-2 max-w-screen-lg">
      <NavBar backPath={backPath} />
      <article className="mt-5 mb-8">{children}</article>
    </main>
  </>
)
