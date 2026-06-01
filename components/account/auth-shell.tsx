import Footer from "components/layout/footer";

// Centered card shell shared by the sign-in / register / reset pages.
export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-md flex-col px-6 py-20">
        <div className="text-center">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-3 font-heading text-3xl text-foreground lg:text-4xl">
            {title}
          </h1>
          <div className="gold-divider gold-divider-center mt-4" />
          {subtitle ? (
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
      <Footer />
    </>
  );
}
