import { NavBar } from "lib/components/NavBar";

export const Layout = ({ children }) => (
  <>
    <main className="container mx-auto px-4 py-2 max-w-screen-md">
      <NavBar />
      <section className="-mx-4">{children}</section>
    </main>
  </>
);
