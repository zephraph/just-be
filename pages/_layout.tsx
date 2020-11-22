import { NavBar } from "lib/components/NavBar";

export const Layout = ({ backPath, children }) => (
  <>
    <main className="container mx-auto px-4 py-2 max-w-screen-md">
      <NavBar backPath={backPath} />
      <article>{children}</article>
    </main>
  </>
);
