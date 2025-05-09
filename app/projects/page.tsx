import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectsPage() {
  const projects = [
    {
      title: "E-Royaltiles",
      description: "A full-featured online store with product management, cart functionality, and secure checkout.",
      image: "/images/tiles.png",
      tags: ["Next.js", "React", "Stripe", "MongoDB"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Event Management System",
      description: "A WEB application for managing events, projects, and team collaboration.",
      image: "/images/event.png",
      tags: ["React Native", "Firebase", "Redux"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website for a professional photographer showcasing their work.",
      image: "/images/port.png",
      tags: ["HTML/CSS", "JavaScript", "GSAP"],
      demoUrl: "https://karthikeyan-portfolio-six.vercel.app/",
      codeUrl: "#",
    },
    {
      title: "AI Powered Text Analyzer With Emotion Detection(Final year Prj)",
      description: "A comprehensive system for tracking inventory, sales, and generating reports.",
      image: "/images/text.png",
      tags: ["Python", "Streamlit", "NLP", "ML"],
      demoUrl: "https://textnalyzer.streamlit.app/",
      codeUrl: "#",
    },
    {
      title: "Object Detection Using Web cam (Final Year Prj)",
      description: "Real-time object detection using your device's webcam to identify and highlight objects instantly",
      image: "/images/object.png",
      tags: ["Python", "ML"],
      demoUrl: "https://object--detection.streamlit.app/",
      codeUrl: "#",
    },
    {
      title: "Cancer Cell Detection Using CNN (Final Year Prj)",
      description: "Cancer cell detection using CNN involves applying convolutional neural networks to identify and classify cancerous cells in medical images, aiding in early diagnosis and treatment planning.",
      image: "/images/cancer.png",
      tags: ["Python", "CNN", "ML"],
      demoUrl: "#",
      codeUrl: "#",
    },
  ]

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              A showcase of my recent work, personal projects, and client collaborations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={300}
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.codeUrl}>
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={project.demoUrl}>
                    Live Demo
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to see more?</h2>
          <p className="max-w-[600px] mx-auto text-muted-foreground mb-6">
            These are just a few examples of my work. Contact me to discuss your project and see more relevant examples.
          </p>
          <Link href="/contact">
            <Button size="lg">Get in Touch</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
