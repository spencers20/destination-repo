"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { PlayCircle, Music, Mic, Video, Heart, ArrowRight, Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type MediaItem = {
  title: string
  type: "video" | "audio" | "videolist"
  thumbnail: string
  icon: React.ElementType
  embedUrl: string | string[]
  description?: string
}

const mediaContent: MediaItem[] = [
  {
    title: "Full Interview",
    type: "video",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Full%20Interview-fEcqDHjh6KERaiP2L5UgNnwK4ch4wY.png",
    icon: PlayCircle,
    embedUrl: "https://drive.google.com/file/d/1T5B111ulT1bqfP9eK15BW2J0ynWQpXUk/preview",
    description: "Complete interview with Pedro Sostre III discussing automation and AI",
  },
  {
    title: "Amazing Song",
    type: "audio",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Amazing%20Song-Dcsp7hrncqoSnev0LlnXA4Vn5pJSYX.png",
    icon: Music,
    embedUrl: "https://drive.google.com/file/d/1wRZ9tny_JmNnJSSTm54iqHDqtCPlvpq9/preview",
    description: "Pedro's magical musical creation",
  },
  {
    title: "Speaker Introduction",
    type: "video",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Introduction-Va6zz71NB0N919I05eHJNSfPFPW3VV.png",
    icon: Mic,
    embedUrl: "https://drive.google.com/file/d/1RT5Wal-3Kh7gjmA1-e1NeHxhlLaBNxtI/preview",
    description: "Introduction to Pedro Sostre III",
  },
  {
    title: "Interview Highlights",
    type: "videolist",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Highlights-iF52Y7jD88Ky7CxHNpyoFoy2sT9W2C.png",
    icon: Video,
    embedUrl: [
      "https://drive.google.com/file/d/14lTbafis-RGkpZWClRmbFCALN51HJWaP/preview",
      "https://drive.google.com/file/d/1VQGElAwC48yNKAwCKDAUTxc7IyytKg_b/preview",
      "https://drive.google.com/file/d/1930AX2K6klZkp0SH2pTUpzMyFi98bVDs/preview",
      "https://drive.google.com/file/d/1IcdHkwdof2aeqmw3mgDQIBSfbRSaYDFw/preview",
      "https://drive.google.com/file/d/1wDhZYcWCjeIWubz45XPHJjuR0vtldLm4/preview",
      "https://drive.google.com/file/d/1IsUlmpcojL7A_BgPtsblOVGt7-vDdcNG/preview",
      "https://drive.google.com/file/d/1L589j3guddWbqJ1BzBsYktAJYJrjaNx0/preview",
      "https://drive.google.com/file/d/1lAIfG8StmLXCqLbuV8sNlVdiXqAs6eUL/preview",
      "https://drive.google.com/file/d/19JfkW97mN7Dc-jOecBfudwJTtwHU4Ko8/preview",
      "https://drive.google.com/file/d/1Hg2VHJPScVDKcZhKHyfDtVSwpMPbU_uu/preview",
      "https://drive.google.com/file/d/1IMNCEBMRExJRd19ThIyRLhwuVA0jB0mQ/preview",
      "https://drive.google.com/file/d/1ior5gab9zSIAUSzK5MKQUrNjbssbIHmQ/preview",
      "https://drive.google.com/file/d/1Pmk0SQ3ZX46kG-FHplaBDocGAJ-7uagV/preview",
      "https://drive.google.com/file/d/1qjLtmUs_q3rJvPDU1UQ1U-tdaTAORi2j/preview",
      "https://drive.google.com/file/d/1oy-cVv_I6p3_UaL1FbYtGOhVqt2BqDmP/preview",
      "https://drive.google.com/file/d/1Kf3DSeV836kp0-3LgZuXg0C47K5UspsE/preview",
      "https://drive.google.com/file/d/1I6mnjpKTMFMNs7JbNuzJ-AT0cvadxXRv/preview",
      "https://drive.google.com/file/d/1PIIPMtwtiFDewUgy5jPQm1u3YaTpw7Aq/preview",
      "https://drive.google.com/file/d/1hDOfnXoNEF-ldFRWvGZezeg6h05U-RHx/preview",
      "https://drive.google.com/file/d/1cjtIXxD3M13_Yq02X3ogL03RBNIK1-Fb/preview",
      "https://drive.google.com/file/d/1x8__YPby9Lckt3oAUcRexkESDyy1YaV9/preview",
      "https://drive.google.com/file/d/1lAvikQdJhgT5mJKec36xZwyqKvSP5SZG/preview",
      "https://drive.google.com/file/d/1fLEsVNtOBqd35Jy6WeKfnEF9DCPmv1gV/preview",
      "https://drive.google.com/file/d/15QZKvwVBj5rYvtd5bJ4ubJw0QwvQQf2j/preview",
      "https://drive.google.com/file/d/1X14-HxXp9hmUnn0zApjufNjRBAugpPkc/preview",
      "https://drive.google.com/file/d/123n0KS-fOkw92KrMzBcUymVyAA1VIVfw/preview",
      "https://drive.google.com/file/d/1yOMTWM-YIG9LCGdJWc0L6WpnjJsiuq12/preview",
      "https://drive.google.com/file/d/1wHi1b9TlAg4i8_E_g_UwmUEFHm4Jq-pI/preview",
    ],
    description: "Key moments and insights from the interview",
  },
]

const workflows = [
  {
    title: "Marketing Campaign Automation",
    nodes: [
      "Trigger",
      "Google Sheets Read",
      "OpenAI API Generate Content",
      "Email Marketing Service Send Email",
      "WhatsApp Business API Send Message",
      "Google Sheets Update Status",
      "Error Handling Node",
      "Quality Control Node",
      "Delay Node",
      "Notification Node",
    ],
    description:
      "Automated marketing campaigns generating customized content and audience outreach via email and WhatsApp. Alleviates manual effort in writing emails and ensures timely reminders for follow-ups.",
  },
  {
    title: "Customer Support Automation",
    nodes: [
      "Webhook Trigger",
      "Chatbot API Initiate Chat",
      "Ticketing System Create Ticket",
      "OpenAI API Generate Response",
      "Notification Service Send Notification",
      "Ticketing System Update Ticket Status",
      "Quality Control Node",
      "Error Handling Node",
      "Google Sheets Log Interaction",
      "Email Service Send Confirmation",
    ],
    description:
      "Streamlined customer inquiries handled by AI, significantly reducing wait times. This alleviates pressure on human support staff, improving overall response efficiency.",
  },
  {
    title: "Sales Outreach Automation",
    nodes: [
      "Webhook Trigger",
      "CRM Read Lead Data",
      "OpenAI API Generate Personalized Outreach Message",
      "WhatsApp Business API Send Message",
      "Reporting Tool Log Outreach",
      "Email Marketing Service Send Follow-Up Email",
      "Error Handling Node",
      "Quality Control Node",
      "Google Sheets Update Interaction Status",
      "Notification Node",
    ],
    description:
      "Automated personalized outreach to leads via WhatsApp and email, enhancing engagement and follow-ups. This reduces the manual reach efforts and ensures timely communication.",
  },
  {
    title: "Content Creation Automation",
    nodes: [
      "Trigger",
      "Content Management System New Content Request",
      "OpenAI API Generate Draft Content",
      "Quality Control Node Review Content",
      "Content Management System Publish Content",
      "Notification Service Alert Team",
      "Error Handling Node",
      "Google Sheets Log Activity",
      "Social Media API Publish Post",
      "Email Service Notify Users",
    ],
    description:
      "Facilitated content creation process with AI-generated drafts leading to quicker publication. This reduces delays in posting and simplifies the review process for the team.",
  },
]

const highlightTitles = [
  "Automation Philosophy and Business Impact",
  "AI-Powered Marketing Strategies",
  "Customer Support Excellence",
  "Sales Outreach Best Practices",
  "Content Creation Workflows",
  "WhatsApp Business Integration",
  "Email Marketing Automation",
  "CRM and Data Management",
  "Quality Control Systems",
  "Error Handling Techniques",
  "AI Tools and Technology Stack",
  "Workflow Design Principles",
  "Google Sheets Integration",
  "Notification Systems",
  "Time-Saving Automation Tips",
  "Client Success Stories",
  "Building Scalable Workflows",
  "Integration Strategies",
  "Analytics and Reporting",
  "OpenAI API Implementation",
  "Chatbot Development",
  "Ticketing System Automation",
  "Lead Generation Automation",
  "Business Process Optimization",
  "Future of Automation and AI",
  "Social Media Automation",
  "Marketing Campaign Planning",
  "Customer Engagement Strategies",
]

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<MediaItem | null>(null)

  const openModal = (item: MediaItem) => {
    setModalContent(item)
    setModalOpen(true)
  }

  useEffect(() => {
    const handleLinkedInShare = async (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest(".share-link")

      if (!link) return

      const caption = link.getAttribute("data-caption") || ""
      const title = link.getAttribute("data-clip-id") || "Unknown Clip"
      const videoUrl = link.getAttribute("data-url") || ""

      const params = new URLSearchParams({
        clip_id: title,
        video_url: videoUrl,
        type: "video",
      })

      const width = 600
      const height = 700

      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2

      try {
        const res = await fetch(`/api/n8n?${params}`)
        const data = await res.json()

        if (data.redirectUrl) {
          window.open(
            data.redirectUrl,
            "linkedinPopup",
            `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars`,
          )
        }
      } catch (error) {
        console.error("Error initiating LinkedIn share:", error)
      }
    }

    document.addEventListener("click", handleLinkedInShare as EventListener)
    return () => document.removeEventListener("click", handleLinkedInShare as EventListener)
  }, [])

  return (
    <div className="bg-black text-white font-light-body">
      <main>
        {/* Hero Section */}
        <section className="relative text-center h-[70vh] md:h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="relative z-20 p-4 flex flex-col items-center">
            <div className="mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pedro%20Sostre%20III%20%20profile%20picture-wt2kJWZECQkeo8umsMWuB7KYBBEeq0.jpeg"
                alt="Pedro Sostre III"
                width={200}
                height={200}
                className="rounded-full border-4 border-[#F1ab1c] shadow-2xl"
                priority
              />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold-title tracking-tight text-white">
              Magic <span className="text-[#F1ab1c]">Pedro Sostre III</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white font-light-body">
              Exploring the art of automation and AI-powered creativity.
            </p>
          </div>
        </section>

        {/* Media Content Section */}
        <section id="media" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl text-center mb-12 text-black font-bold-title">
              Discover The <span className="text-[#F1ab1c]">Magic</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mediaContent.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 bg-white"
                  onClick={() => openModal(item)}
                >
                  <div className="aspect-video relative">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col items-center justify-center p-4">
                      <item.icon className="w-16 h-16 text-[#F1ab1c] opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
                      <h3 className="mt-4 text-xl text-center text-white font-bold-title">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Workflows Section */}
        <section id="workflows" className="py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl text-center mb-12 text-white font-bold-title">
              Automation <span className="text-[#F1ab1c]">Workflows</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workflows.map((flow) => (
                <div
                  key={flow.title}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col hover:shadow-2xl transition-shadow duration-300 min-h-[600px]"
                >
                  <h3 className="text-xl mb-4 leading-tight font-bold-title text-[#F1ab1c]">{flow.title}</h3>

                  {/* Workflow Steps - Vertical Layout */}
                  <div className="mb-6 space-y-3 max-h-80 overflow-y-auto">
                    {flow.nodes.map((node, index) => (
                      <div key={node} className="flex items-center">
                        <div className="flex items-center justify-center w-6 h-6 bg-[#F1ab1c] text-white text-xs font-bold-title rounded-full mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg border border-gray-200 text-sm flex-grow font-light-body">
                          {node}
                        </span>
                        {index < flow.nodes.length - 1 && (
                          <div className="ml-3 flex flex-col items-center">
                            <ArrowRight className="w-4 h-4 transform rotate-90 text-[#F1ab1c]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-800 text-sm flex-grow leading-relaxed font-light-body">{flow.description}</p>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <a
                      href="https://meet.manymangoes.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-[#F1ab1c] hover:bg-[#e8a318] text-white font-bold-title py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105"
                    >
                      Build the Magic
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-center py-6">
        <p className="text-white flex items-center justify-center gap-2 font-light-body">
          2025 Made with <Heart className="w-4 h-4 text-[#F1ab1c]" /> by ManyMangoes
        </p>
      </footer>

      {modalContent && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-white border-gray-300 text-black max-w-6xl w-full p-0 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="p-4 border-b border-gray-300">
              <DialogTitle className="font-bold-title text-[#F1ab1c]">{modalContent.title}</DialogTitle>
              {modalContent.description && (
                <p className="text-gray-600 font-light-body mt-2">{modalContent.description}</p>
              )}
            </DialogHeader>
            <div className="p-1 md:p-2">
              {modalContent.type === "video" && (
                <div className="aspect-video">
                  <iframe
                    src={modalContent.embedUrl as string}
                    className="w-full h-full rounded-b-lg"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={modalContent.title}
                    loading="lazy"
                  />
                </div>
              )}
              {modalContent.type === "audio" && (
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="mb-6">
                    <Music className="w-24 h-24 text-[#F1ab1c]" />
                  </div>
                  <div className="aspect-video w-full max-w-2xl">
                    <iframe
                      src={modalContent.embedUrl as string}
                      className="w-full h-full rounded-lg"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={modalContent.title}
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
              {modalContent.type === "videolist" && (
                <div className="max-h-[70vh] overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(modalContent.embedUrl as string[]).map((url, index) => (
                    <div key={url} className="flex flex-col">
                      <h4 className="text-center text-black font-bold-title text-sm mb-2">
                        {highlightTitles[index] || `Interview Moment ${index + 1}`}
                      </h4>
                      <div className="aspect-[9/16] mb-3">
                        <iframe
                          src={url}
                          className="w-full h-full rounded-lg"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title={`Highlight ${index + 1}`}
                          loading="lazy"
                        />
                      </div>
                      <button
                        className="share-link w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold-title rounded-lg transition-colors"
                        data-caption={highlightTitles[index] || `Interview Moment ${index + 1}`}
                        data-clip-id={highlightTitles[index] || `Interview Moment ${index + 1}`}
                        data-url={url}
                        title="Share on LinkedIn"
                      >
                        <Share2 className="w-4 h-4" />
                        Share to LinkedIn
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
