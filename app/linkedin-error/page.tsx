"use client"

import { useEffect } from "react"

export default function LinkedInErrorPage() {
  const handleRetry = () => {
    // Try to reload opener (previous page) if it exists
    if (window.opener) {
      window.opener.location.reload()
      window.close()
    } else {
      // If no opener, just reload the current window
      window.location.reload()
    }
  }

  useEffect(() => {
    // Optionally notify parent window of error
    if (window.opener) {
      window.opener.postMessage({ status: "error" }, "*")
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center">
      <h1 className="text-2xl font-semibold text-red-700 mb-2">LinkedIn Authentication Failed</h1>
      <p className="text-gray-600 mb-4">Something went wrong during authentication. Please try again.</p>
      <button
        onClick={handleRetry}
        className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  )
}
