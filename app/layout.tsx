import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Magic Pedro Sostre III",
  description: "Get instant help with our Magical Assistant",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Title */}
        <title>Magic Pedro Sostre III</title>
        {/* Load Montserrat Font */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap" rel="stylesheet" />
        {/* Include n8n Chat Widget Styles */}
        <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
        {/* Custom Styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --chat--color-primary: #f1ab1c;
                --chat--color-primary-shade-50: #e8a318;
                --chat--color-primary-shade-100: #d39415;
                --chat--color-secondary: #f1ab1c;
                --chat--font-family: 'Montserrat', sans-serif;
                --chat--spacing: 1.25rem;
                --chat--border-radius: 12px;
                --chat--message--font-size: 1rem;
                --chat--message-line-height: 1.6;
                --chat--header--background: #ffffff;
                --chat--header--color: #333333;
                --chat--header--padding: 1.25rem;
                --chat--toggle--background: var(--chat--color-primary);
                --chat--toggle--hover--background: var(--chat--color-primary-shade-50);
                --chat--toggle--active--background: var(--chat--color-primary-shade-100);
                --chat--toggle--color: #ffffff;
                --chat--toggle--size: 56px;
                --chat--message--user--background: var(--chat--color-primary);
                --chat--message--user--color: #fff;
                --chat--message--bot--background: #f5f5f5;
                --chat--message--bot--color: #222;
                --chat--heading--font-size: 1.5rem;
                --chat--subtitle--font-size: 1rem;
              }
              .n8n-chat-widget * {
                font-family: 'Montserrat', sans-serif !important;
                font-weight: 300;
              }
              .n8n-chat-widget h1,
              .n8n-chat-widget h2,
              .n8n-chat-widget h3,
              .n8n-chat-widget .chat-header__title {
                font-weight: 700 !important;
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        {/* Chat Target */}
        <div id="n8n-chat"></div>
        {/* Load Chat */}
        <Script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js').then(({ createChat }) => {
                  createChat({
                    webhookUrl: 'https://automations.manymangoes.com.au/webhook/f2214341-bbde-4593-9bef-031f54a38ce0/chat',
                    target: '#n8n-chat',
                    mode: 'window',
                    showWelcomeScreen: false,
                    loadPreviousSession: false,
                    initialMessages: [
                      'Hi there! 👋',
                      'Ask me anything about his automation magic!'
                    ],
                    i18n: {
                      en: {
                        title: 'Oh hey! 👋',
                        subtitle: 'Are you ready for some magic?!',
                        getStarted: 'Start Chat',
                        inputPlaceholder: 'Type your message...',
                      },
                    },
                  });

                  // Monitor for shadow DOM to exist and clean footer safely
                  const waitForWidget = setInterval(() => {
                    try {
                      const widget = document.querySelector('n8n-chat');
                      if (!widget || !widget.shadowRoot) return;

                      const shadow = widget.shadowRoot;
                      const poweredBy = shadow.querySelector('.chat-powered-by');
                      if (poweredBy) {
                        poweredBy.remove();
                        clearInterval(waitForWidget);
                      }
                    } catch (error) {
                      console.log('Error customizing chat widget:', error);
                    }
                  }, 500);

                  setTimeout(() => clearInterval(waitForWidget), 10000);
                });
              } catch (error) {
                console.log('Chat widget failed to load:', error);
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
