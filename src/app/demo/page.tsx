import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="h-screen bg-background text-foreground overflow-hidden">
      <div className="w-full h-screen px-6 py-12 flex flex-col gap-10">
        <header className="flex items-center justify-between gap-4 border-b-2 border-border pb-8">
          <Link
            href="/"
            className="text-base font-medium uppercase tracking-[0.3em] text-foreground hover:text-muted-foreground"
          >
            DaVincii
          </Link>
          <nav className="flex items-center gap-4 text-sm uppercase tracking-[0.2em]">
            <Link
              href="/auth"
              className="px-4 py-2 border-2 border-border hover:border-foreground hover:text-foreground transition-colors font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-medium"
            >
              Go to dashboard
            </Link>
          </nav>
        </header>

        <section className="grid gap-8 md:grid-cols-3 overflow-y-auto flex-1">
          <div className="md:col-span-2 space-y-4 border-2 border-dashed border-border p-8">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Demo layout
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Use this page to play with sections, content blocks and layout
              ideas before wiring real data. Everything is black and white on
              purpose.
            </p>
          </div>
          <div className="space-y-3 border-2 border-border p-8">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Sections
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Hero / value proposition</li>
              <li>Feature grid</li>
              <li>Metrics or highlights</li>
              <li>Call to action</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}


