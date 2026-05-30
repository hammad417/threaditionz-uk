import MegaHeader from "./mega-header";

// The brand mega-menu header. Rendered as a server component wrapper so it
// stays in the server-rendered HTML; interactivity lives in MegaHeader
// (a client component) whose initial markup — including every nav link — is
// still emitted on the server.
export function Navbar() {
  return <MegaHeader />;
}
