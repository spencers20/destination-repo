"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LinkedInSuccessPage() {
  const [userId, setUserId] = useState("")
  const [username, setUsername] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [caption, setCaption] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [token, setToken] = useState("")
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setUserId(params.get("user_id") || "")
    setUsername(params.get("user_name") || "")
    setProfilePic(params.get("profile_pic") || "")
    setCaption(params.get("caption") || "")
    setVideoUrl(params.get("video_url") || "")
    setToken(params.get("token") || "")
  }, [])

  const handleShare = async () => {
    const params = new URLSearchParams({
      user_id: userId,
      caption: caption,
      video_url: videoUrl,
      token: token,
      type: "video",
    })

    try {
      const res = await fetch(`/api/linkedin_post?${params.toString()}`)
      if (res.ok) {
        setToastMessage("Successfully shared to LinkedIn!")
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
          if (window.opener) {
            window.opener.postMessage({ status: "success" }, "*")
          }
          window.close()
        }, 2000)
      } else {
        throw new Error("Failed to share")
      }
    } catch (err) {
      console.error(err)
      setToastMessage("Error sharing. Try again.")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col bg-[#f3f2ef] text-gray-800">
      {/* Header */}
      <header className="flex items-center gap-2 px-4 py-3 border-b bg-white shadow-sm shrink-0">
        <svg className="w-7 h-7 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
        <h1 className="text-lg font-semibold text-[#0A66C2]">Share on LinkedIn</h1>
      </header>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50"
        >
          {toastMessage}
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          {/* User section */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              {profilePic && (
                <img
                  src={profilePic || "/placeholder.svg"}
                  alt="LinkedIn profile"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-800">{username || "User"}</p>
              <p className="text-sm text-gray-500">Posting publicly</p>
            </div>
          </div>

          {/* Video preview */}
          {videoUrl && (
            <div className="rounded-md overflow-hidden border border-gray-300 mb-4">
              <iframe
                src={videoUrl}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full"
                style={{ aspectRatio: "16 / 9" }}
              />
            </div>
          )}

          {/* Caption box */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What do you want to talk about?"
            autoFocus
            className="w-full min-h-[120px] resize-none border-0 focus:ring-0 focus:outline-none text-gray-800 text-[15px] mb-4 placeholder-gray-500"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white px-4 py-3 flex justify-end items-center gap-3 shadow-[0_-1px_2px_rgba(0,0,0,0.05)] shrink-0">
        <button
          onClick={() => window.close()}
          className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleShare}
          className="bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-2 rounded-md text-sm font-medium"
        >
          Post to LinkedIn
        </button>
      </footer>
    </div>
  )
}
