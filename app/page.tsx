import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Laptop, Server, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Turning Ideas into Digital Reality
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Professional web design, app development, and IT solutions for businesses and students.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="gap-1.5">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button size="lg" variant="outline">
                    View My Work
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border">
                <Image src="/images/profile.png" alt="Profile" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 md:py-24" id="about">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Me</h2>
              <p className="text-muted-foreground">
                I'm a passionate freelance developer with expertise in web design, app development, and IT solutions.
                With a strong background in modern technologies, I help businesses and students bring their ideas to
                life.
              </p>
              <p className="text-muted-foreground">
                My approach combines technical expertise with creative problem-solving to deliver solutions that not
                only meet but exceed client expectations. I believe in clean code, intuitive design, and seamless user
                experiences.
              </p>
              <p className="text-muted-foreground">
                Whether you need a stunning website, a powerful mobile app, assistance with your final year project, or
                IT support, I'm here to help you succeed in the digital world.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">My Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <Laptop className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Web Development</h4>
                      <p className="text-sm text-muted-foreground">React, Next.js, HTML/CSS</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <Server className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Backend Development</h4>
                      <p className="text-sm text-muted-foreground">Node.js, Express, MongoDB</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <Zap className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Mobile Development</h4>
                      <p className="text-sm text-muted-foreground">React Native, Flutter</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <Code className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Programming</h4>
                      <p className="text-sm text-muted-foreground">JavaScript, TypeScript, Python</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">My Services</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Comprehensive digital solutions tailored to your needs
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              {
                title: "Web Design",
                description: "Custom, responsive websites that look great on any device",
                icon: <Laptop className="h-10 w-10 text-primary" />,
              },
              {
                title: "App Development",
                description: "Native and cross-platform mobile applications",
                icon: <Zap className="h-10 w-10 text-primary" />,
              },
              {
                title: "Student Projects",
                description: "Guidance and development for final year projects",
                icon: <Code className="h-10 w-10 text-primary" />,
              },
              {
                title: "Service Desk",
                description: "Technical support and IT consulting services",
                icon: <Server className="h-10 w-10 text-primary" />,
              },
            ].map((service, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 rounded-full bg-primary/10">{service.icon}</div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/services">
              <Button size="lg" variant="outline">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
