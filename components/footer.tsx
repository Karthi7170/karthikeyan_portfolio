import Link from "next/link"
import { Github, Linkedin, Mail, Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/30">
      <div className="container px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div className="max-w-md">
            <div className="mb-4 flex items-center gap-2 font-mono text-sm font-black">
              <Sparkles className="h-4 w-4 text-primary" />
              KARTHI//LABS
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              AI-native product building for websites, interactive experiences, and automation systems. Fast execution,
              clear UX, and technology that earns its place in the product.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground">Navigate</h3>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <Link href="/projects" className="hover:text-primary">Projects</Link>
              <Link href="/services" className="hover:text-primary">Capabilities</Link>
              <Link href="/contact" className="hover:text-primary">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground">Connect</h3>
            <div className="flex gap-3">
              <Link href="https://github.com/Karthi7170" aria-label="GitHub" className="rounded-xl border border-border bg-background/50 p-2.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
                <Github className="h-4 w-4" />
              </Link>
              <Link href="https://www.linkedin.com/in/karthikeyan-k-950311208" aria-label="LinkedIn" className="rounded-xl border border-border bg-background/50 p-2.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="mailto:karthifreelancer7170@gmail.com" aria-label="Email" className="rounded-xl border border-border bg-background/50 p-2.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Karthikeyan. Built with intent, AI, and code.</p>
          <p className="font-mono">idea → system → ship</p>
        </div>
      </div>
    </footer>
  )
}
