import Footer from "components/layout/footer";
import Prose from "components/prose";

// Shared shell for static content/info pages (shipping, size guide, FAQs, etc.).
export default function ContentPage({
  title,
  html,
  note,
}: {
  title: string;
  html: string;
  note?: string;
}) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <span className="eyebrow">Threaditionz</span>
        <h1 className="mt-3 font-heading text-4xl text-foreground lg:text-5xl">
          {title}
        </h1>
        <div className="gold-divider mt-4" />
        <Prose className="mt-8 max-w-none text-foreground" html={html} />
        {note ? (
          <p className="mt-10 text-sm italic text-muted-foreground">{note}</p>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
