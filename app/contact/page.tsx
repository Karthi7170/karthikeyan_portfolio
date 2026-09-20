"use client"

import type React from "react"
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { Mail, MapPin, Phone, Send, Sparkles, SquareTerminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_rmrfi9p",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_z97wyye",
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "5uVDO8f6LjnDh8rmd",
      )

      if (result.status === 200) {
        toast({
          title: "Message sent",
          description: "Thanks — I will get back to you soon.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Message not sent",
        description: "Please try again or contact me directly by email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="tech-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]" />

      <section className="container px-4 pb-12 pt-20 text-center md:px-6 md:pb-16 md:pt-28">
        <div className="eyebrow mb-5">
          <Sparkles className="h-3.5 w-3.5" />
          Start a build
        </div>
        <h1 className="gradient-text mx-auto max-w-4xl text-5xl font-black tracking-[-0.05em] sm:text-6xl">
          Send the idea. It does not need to be polished yet.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          Tell me what you want to build, what currently exists, or what is not working. I can help turn the rough
          brief into a clearer digital product direction.
        </p>
      </section>

      <section className="container grid gap-6 px-4 pb-20 md:px-6 md:pb-28 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-3 border-b border-border/60 pb-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
              <SquareTerminal className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold">Project brief</h2>
              <p className="text-xs text-muted-foreground">A few useful details are enough to start.</p>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required className="h-12 rounded-xl bg-background/60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="h-12 rounded-xl bg-background/60" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">What are we building?</Label>
              <Input id="subject" name="subject" placeholder="Portfolio, business website, automation, product idea..." value={formData.subject} onChange={handleChange} required className="h-12 rounded-xl bg-background/60" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Brief</Label>
              <Textarea id="message" name="message" placeholder="What should it do? Who is it for? Do you have any reference or existing site?" rows={7} value={formData.message} onChange={handleChange} required className="rounded-xl bg-background/60" />
            </div>

            <Button type="submit" className="h-12 w-full rounded-xl font-semibold" disabled={isSubmitting}>
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send project brief
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="space-y-5">
          <div className="tech-card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Direct contact</p>
            <div className="mt-6 space-y-5">
              <a href="mailto:karthifreelancer7170@gmail.com" className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="mt-1 break-all text-sm text-muted-foreground">karthifreelancer7170@gmail.com</div>
                </div>
              </a>
              <a href="tel:+919944754339" className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-semibold">Phone</div>
                  <div className="mt-1 text-sm text-muted-foreground">+91 99447 54339</div>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-semibold">Working mode</div>
                  <div className="mt-1 text-sm text-muted-foreground">Remote collaboration available</div>
                </div>
              </div>
            </div>
          </div>

          <div className="tech-card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Good first message</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
              <p>1. What are you trying to build?</p>
              <p>2. Who needs to use it?</p>
              <p>3. Is there an existing website, design, or reference?</p>
              <p>4. What would make the first version successful?</p>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5 text-sm leading-7 text-muted-foreground">
            You do not need to choose the framework, database, or AI tool before contacting me. Those decisions should
            come after the product need is clear.
          </div>
        </div>
      </section>
    </div>
  )
}
