import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://portfolio.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aarav Mehta — Frontend Engineer & Cloud-Native Builder",
    template: "%s · Aarav Mehta",
  },
  description:
    "Frontend Engineer with 2+ years crafting scalable React, Next.js, and AWS serverless systems. Focused on performance, accessibility, and developer experience.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "AWS CDK",
    "Serverless",
    "UI Engineering",
    "Aarav Mehta",
  ],
  authors: [{ name: "Aarav Mehta" }],
  creator: "Aarav Mehta",
  publisher: "Aarav Mehta",
  applicationName: "Aarav Mehta — Portfolio",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Aarav Mehta — Frontend Engineer & Cloud-Native Builder",
    description:
      "Scalable React, Next.js, and AWS serverless systems built with craftsmanship, performance, and accessibility in mind.",
    url: siteUrl,
    siteName: "Aarav Mehta",
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarav Mehta — Frontend Engineer & Cloud-Native Builder",
    description:
      "Scalable React, Next.js, and AWS serverless systems built with craftsmanship, performance, and accessibility in mind.",
    creator: "@aaravmehta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07090d" },
    { media: "(prefers-color-scheme: light)", color: "#fbfcfe" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aarav Mehta",
  jobTitle: "Frontend Engineer",
  description:
    "Frontend Engineer specializing in React, Next.js, TypeScript, and AWS serverless architectures.",
  url: siteUrl,
  sameAs: [
    "https://github.com/aaravmehta",
    "https://www.linkedin.com/in/aaravmehta",
    "https://twitter.com/aaravmehta",
    "https://leetcode.com/aaravmehta",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "AWS CDK",
    "AWS Lambda",
    "API Gateway",
    "DynamoDB",
    "Redux",
    "Frontend Architecture",
    "Serverless",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-accent-electric/30 selection:text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
