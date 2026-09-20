import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Code2,
  Gauge,
  GitBranch,
  Layers3,
  MonitorSmartphone,
  Sparkles,
  Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const capabilities = [
  {
    icon: MonitorSmartphone,
    title: "Modern websites",
    description:
      "Responsive, premium web experiences for personal brands, local businesses, portfolios, and product ideas.",
    points: ["Mobile-first layouts", "Strong visual hierarchy", "Performance-aware implementation"],
  },
  {
    icon: Layers3,
    title: "Product prototypes",
    description:
      "Fast, functional MVPs that make an idea concrete enough to test with users, clients, or stakeholders.",
    points: ["Idea-to-flow mapping", "Interactive UI", "Deployable first versions"],
  },
  {
    icon: Bot,
    title: "AI-assisted systems",
    description:
      "Focused AI or rules-based workflows where automation removes repetitive work instead of adding unnecessary complexity.",
    points: ["AI-assisted interfaces", "Data filtering and scoring", "Human-in-the-loop workflows"],
  },
  {
    icon: Workflow,
    title: "Business automation",
    description:
      "Small systems that connect forms, data, notifications, dashboards, and recurring operational tasks.",
    points: ["Workflow design", "API integrations", "Scheduled automation"],
  },
  {
    icon: Code2,
    title: "Frontend engineering",
    description:
      "Clean component-driven interfaces with modern React and Next.js patterns, tailored to the product rather than a template.",
    points: ["React / Next.js", "TypeScript", "Reusable UI systems"],
  },
  {
    icon: Gauge,
    title: "Polish + iteration",
    description:
      "Existing builds can be tightened through responsive fixes, UX improvements, content hierarchy, and performance work.",
    points: ["Responsive QA", "UX cleanup", "Launch-focused refinements"],
  },
]

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="tech-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]" />

      <section className="container px-4 pb-14 pt-20 text-center md:px-6 md:pb-20 md:pt-28">
        <div className="eyebrow mb-5">
          <Sparkles className="h-3.5 w-3.5" />
          Capabilities
        </div>
        <h1 className="gradient-text mx-auto max-w-4xl text-5xl font-black tracking-[-0.05em] sm:text-6xl">
          I build the layer between an idea and a usable product.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          My work sits across product thinking, interface design, modern web development, AI-assisted workflows, and
          deployment. The exact stack follows the problem—not the other way around.
        </p>
      </section>

      <section className="container px-4 pb-20 md:px-6 md:pb-28">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="tech-card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-xl font-black">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                <div className="mt-6 space-y-3 border-t border-border/60 pt-5">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {point}
                    </div>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="container grid gap-10 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="eyebrow mb-4">
              <GitBranch className="h-3.5 w-3.5" />
              How I work
            </div>
            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">Fast does not have to mean careless.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
              I use AI aggressively for exploration and execution, then validate the result through structure,
              responsive behaviour, integrations, and actual product flow. The output should feel intentional even when
              the build cycle is fast.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            {["Understand the problem", "Shape the user flow", "Build with AI + code", "Test the experience", "Deploy and refine"].map(
              (step, index) => (
                <div key={step} className="flex items-center gap-4 border-b border-border/60 py-4 last:border-0">
                  <span className="font-mono text-xs font-black text-primary">0{index + 1}</span>
                  <span className="text-sm font-semibold">{step}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="container px-4 py-20 text-center md:px-6 md:py-24">
        <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">Bring the idea. We can shape the rest.</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
          A short description, reference site, screenshot, or even a rough voice-note-level idea is enough to begin.
        </p>
        <Button size="lg" asChild className="mt-7 rounded-xl">
          <Link href="/contact">
            Start a project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
