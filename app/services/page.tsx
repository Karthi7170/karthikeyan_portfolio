import { Code, Database, FileCode, Laptop, Server, Smartphone, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const services = [
    {
      title: "Web Design & Development",
      description: "Custom websites that look great on any device",
      icon: <Laptop className="h-10 w-10 text-primary" />,
      features: [
        "Responsive design for all devices",
        "Modern UI/UX principles",
        "SEO optimization",
        "Content management systems",
        "E-commerce solutions",
        "Performance optimization",
      ],
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "UI/UX design for mobile",
        "App store submission",
        "Maintenance and updates",
        "Performance optimization",
      ],
    },
    {
      title: "Final Year Student Projects",
      description: "Guidance and development for academic projects",
      icon: <FileCode className="h-10 w-10 text-primary" />,
      features: [
        "Project planning and architecture",
        "Technical implementation",
        "Documentation support",
        "Research assistance",
        "Testing and debugging",
        "Presentation preparation",
      ],
    },
    {
      title: "Service Desk & IT Support",
      description: "Technical support and IT consulting services",
      icon: <Server className="h-10 w-10 text-primary" />,
      features: [
        "Technical troubleshooting",
        "System maintenance",
        "Software installation and updates",
        "Data backup and recovery",
        "Network configuration",
        "Security solutions",
      ],
    },
    {
      title: "Backend Development",
      description: "Robust server-side solutions for your applications",
      icon: <Database className="h-10 w-10 text-primary" />,
      features: [
        "API development",
        "Database design",
        "Authentication systems",
        "Cloud deployment",
        "Performance optimization",
        "Scalable architecture",
      ],
    },
    {
      title: "Custom Software Development",
      description: "Tailored software solutions for specific business needs",
      icon: <Code className="h-10 w-10 text-primary" />,
      features: [
        "Requirements analysis",
        "Custom software architecture",
        "Development and implementation",
        "Testing and quality assurance",
        "Deployment and integration",
        "Maintenance and support",
      ],
    },
  ]

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Services</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Comprehensive digital solutions tailored to your specific needs and requirements
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-2">
                <div className="p-2 w-fit rounded-full bg-primary/10 mb-4">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom service?</h2>
          <p className="max-w-[600px] mx-auto text-muted-foreground mb-6">
            Don't see exactly what you're looking for? Contact me to discuss your specific requirements and how I can
            help you achieve your goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}
