import Link from "next/link"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Film,
  Github,
  MapPinned,
  ScanLine,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    number: "01",
    title: "Sugumar Portfolio",
    category: "Creative portfolio / Video editor",
    icon: Film,
    repo: "https://github.com/Karthi7170/sugumar_portfolio",
    summary:
      "A cinematic portfolio engineered around motion, media, and personality. The experience uses scroll-led interactions and video-first presentation to make the editor's work feel like the interface itself.",
    challenge:
      "Present a video editor's identity without falling back to a static grid of thumbnails and generic portfolio sections.",
    outcome:
      "A responsive, motion-rich portfolio with a cinematic hero, curated work presentation, and interaction patterns designed around viewing creative work.",
    highlights: [
      "GSAP-powered scroll interactions",
      "Video-first project presentation",
      "Responsive cinematic layout",
      "Portfolio storytelling and hierarchy",
    ],
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Responsive Media"],
  },
  {
    number: "02",
    title: "New Royal Tiles",
    category: "Retail / Multi-showroom experience",
    icon: MapPinned,
    repo: "https://github.com/Karthi7170/Royal-tiles",
    summary:
      "A premium mobile-first website for a real tile business, designed to connect four showrooms with product discovery, visualisation, calculators, directions, and WhatsApp conversion flows.",
    challenge:
      "Turn an offline showroom business into a useful digital buying journey instead of building a brochure-style website.",
    outcome:
      "A richer customer experience that helps visitors explore rooms, preview tile direction, calculate quantity, find the right branch, and move directly into enquiry.",
    highlights: [
      "Browser-based room visualiser",
      "Tile area and wastage calculator",
      "Four-branch finder and local SEO structure",
      "Branch-aware WhatsApp lead journey",
    ],
    stack: ["Next.js", "Mobile-first UX", "Visualizer", "Local SEO", "Conversion UX"],
  },
  {
    number: "03",
    title: "VIP-Hunter",
    category: "Automation / Job discovery",
    icon: BriefcaseBusiness,
    repo: "https://github.com/Karthi7170/vip-hunter",
    summary:
      "A focused job-matching engine built to reduce repetitive search work. It scans public employer ATS feeds, filters by candidate rules, removes obvious mismatches, and scores relevant openings locally.",
    challenge:
      "Make daily job discovery useful without depending on expensive AI calls or fabricating vacancies when a source has no matching jobs.",
    outcome:
      "A repeatable job-search workflow with role and location filtering, relevance scoring, deduplication, daily scheduling, and optional notification integrations.",
    highlights: [
      "Public Lever and SmartRecruiters feed scanning",
      "Local relevance scoring and filtering",
      "Supabase-ready persistence workflow",
      "Scheduled daily search architecture",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "ATS Feeds", "Automation"],
  },
]

export default function ProjectsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="tech-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px]" />

      <section className="container px-4 pb-14 pt-20 text-center md:px-6 md:pb-20 md:pt-28">
        <div className="eyebrow mb-5">
          <Sparkles className="h-3.5 w-3.5" />
          Selected builds
        </div>
        <h1 className="gradient-text mx-auto max-w-4xl text-5xl font-black tracking-[-0.05em] sm:text-6xl">
          Real projects, built around real product problems.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          I&apos;m more interested in systems that solve a clear problem than in filling a portfolio with demo cards.
          These are the three projects that best represent how I currently build.
        </p>
      </section>

      <section className="container space-y-6 px-4 pb-20 md:px-6 md:pb-28">
        {projects.map((project) => {
          const Icon = project.icon
          return (
            <article key={project.title} className="tech-card p-6 sm:p-8 lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black tracking-[0.22em] text-primary">{project.number}</span>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {project.category}
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">{project.title}</h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{project.summary}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>

                  <Button asChild variant="outline" className="mt-8 rounded-xl border-border/80 bg-background/50">
                    <Link href={project.repo}>
                      <Github className="mr-2 h-4 w-4" />
                      View repository
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-border/70 bg-background/45 p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      <Target className="h-4 w-4" /> Product challenge
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{project.challenge}</p>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-background/45 p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      <WandSparkles className="h-4 w-4" /> Build outcome
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{project.outcome}</p>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-background/45 p-5">
                    <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      <ScanLine className="h-4 w-4" /> Key systems
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.highlights.map((item) => (
                        <div key={item} className="rounded-xl border border-border/60 bg-card/60 px-4 py-3 text-xs font-medium">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="container px-4 py-16 text-center md:px-6 md:py-20">
          <h2 className="text-3xl font-black tracking-[-0.04em]">Have a rough idea, not a finished brief?</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
            That is enough to start. I can help turn the idea into a clearer product flow and a buildable first version.
          </p>
          <Button size="lg" asChild className="mt-7 rounded-xl">
            <Link href="/contact">Start the conversation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
