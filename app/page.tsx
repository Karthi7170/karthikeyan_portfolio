import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Boxes,
  Braces,
  CheckCircle2,
  Code2,
  ExternalLink,
  Gauge,
  GitBranch,
  Layers3,
  Rocket,
  Sparkles,
  SquareTerminal,
  WandSparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    index: "01",
    title: "Sugumar Portfolio",
    type: "Cinematic creative portfolio",
    description:
      "A motion-first portfolio for a video editor, built around cinematic media, scroll-driven interactions, and a premium presentation system.",
    stack: ["Next.js", "TypeScript", "GSAP", "Video UX"],
    href: "https://github.com/Karthi7170/sugumar_portfolio",
  },
  {
    index: "02",
    title: "New Royal Tiles",
    type: "Multi-showroom digital experience",
    description:
      "A premium tile showroom platform with room visualisation, tile calculators, branch discovery, and WhatsApp-led customer journeys.",
    stack: ["Next.js", "Responsive UX", "Visualizer", "Local SEO"],
    href: "https://github.com/Karthi7170/Royal-tiles",
  },
  {
    index: "03",
    title: "VIP-Hunter",
    type: "Job discovery automation",
    description:
      "A focused job-matching engine that scans public employer ATS feeds, filters roles, scores relevance, and turns a noisy search into a usable daily workflow.",
    stack: ["Next.js", "ATS Feeds", "Supabase", "Automation"],
    href: "https://github.com/Karthi7170/vip-hunter",
  },
]

const principles = [
  {
    icon: WandSparkles,
    title: "AI as a build accelerator",
    text: "I use AI to compress research, iteration, implementation, and debugging cycles—not to replace product judgement.",
  },
  {
    icon: Layers3,
    title: "Experience before decoration",
    text: "Every screen starts with hierarchy, user flow, mobile behaviour, and a clear action before visual polish is layered in.",
  },
  {
    icon: Rocket,
    title: "Ship real, then improve",
    text: "I prefer working software, measurable feedback, and fast refinement over endless mockups that never reach users.",
  },
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate min-h-[86vh] border-b border-border/60">
        <div className="tech-grid pointer-events-none absolute inset-0 -z-20" />
        <div className="pointer-events-none absolute left-[12%] top-20 -z-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl animate-pulse-glow" />
        <div className="pointer-events-none absolute right-[8%] top-32 -z-10 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl animate-pulse-glow" />

        <div className="container grid min-h-[86vh] items-center gap-14 px-4 py-20 md:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
          <div>
            <div className="eyebrow mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              AI-native product builder
            </div>

            <h1 className="gradient-text max-w-4xl text-5xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.4rem] xl:leading-[0.94]">
              I turn ideas into shipped digital products.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              I&apos;m Karthikeyan — a vibe coder who combines AI-assisted engineering, product thinking, and modern
              frontend development to move from rough concept to polished web experience fast. I use AI for speed, but
              I stay responsible for the architecture, integrations, UX, testing, and final result.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="h-12 rounded-xl px-6 font-semibold">
                <Link href="/projects">
                  Explore the builds
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 rounded-xl border-border/80 bg-background/40 px-6">
                <Link href="/contact">Build something with me</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Mobile-first</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> AI-assisted workflow</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Deployment-minded</span>
            </div>
          </div>

          <div className="glass-panel relative rounded-3xl p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">build-system.ts</span>
            </div>

            <div className="space-y-4 rounded-2xl bg-black/25 p-5">
              <div className="terminal-line"><span className="terminal-prompt">$</span><span>capture the idea</span></div>
              <div className="terminal-line"><span className="terminal-prompt">$</span><span>map user flow + product logic</span></div>
              <div className="terminal-line"><span className="terminal-prompt">$</span><span>co-build with AI + modern frameworks</span></div>
              <div className="terminal-line"><span className="terminal-prompt">$</span><span>test responsive behaviour + edge cases</span></div>
              <div className="terminal-line"><span className="terminal-prompt">$</span><span>deploy, observe, refine</span></div>
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 font-mono text-xs text-primary">
                <SquareTerminal className="h-4 w-4" />
                status: shipping ideas into reality
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["03", "flagship builds"],
                ["AI + CODE", "workflow"],
                ["24/7", "idea mode"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-border/70 bg-card/60 p-4">
                  <div className="font-mono text-sm font-black text-primary">{value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-20 md:px-6 md:py-28">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow mb-4">Selected systems</div>
            <h2 className="max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Three builds. Three different problems solved.
            </h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View project details <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="tech-card flex min-h-[430px] flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-primary">{project.index}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{project.type}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-8">
                <Link href={project.href} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary">
                  Open repository <GitBranch className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="container px-4 py-20 md:px-6 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="eyebrow mb-4">My operating system</div>
              <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                Vibe coding, with engineering discipline.
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-muted-foreground">
                The goal is not to type less code. The goal is to remove low-value friction so more attention can go to
                the product: what users need, what the interface should communicate, and what has to work reliably.
              </p>
            </div>

            <div className="grid gap-4">
              {principles.map((item) => (
                <div key={item.title} className="tech-card grid gap-4 p-6 sm:grid-cols-[48px_1fr]">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-20 md:px-6 md:py-28">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-7 sm:p-10 lg:p-14">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <div className="eyebrow mb-4">Build stack</div>
              <h2 className="max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                From idea to interface, logic, automation, and deployment.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
                I work best on modern websites, product prototypes, business experiences, and focused automation where
                speed matters but the result still needs to feel intentional.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                [Code2, "Frontend systems"],
                [Bot, "AI workflows"],
                [Boxes, "Product integrations"],
                [Gauge, "Performance UX"],
                [Braces, "Logic + APIs"],
                [GitBranch, "Git + deployment"],
              ].map(([Icon, label]) => {
                const ItemIcon = Icon as typeof Code2
                return (
                  <div key={label as string} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/50 p-4">
                    <ItemIcon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold">{label as string}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-10">
            <Button size="lg" asChild className="h-12 rounded-xl px-6">
              <Link href="/contact">
                Start a build
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
