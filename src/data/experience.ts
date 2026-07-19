import type { ExperienceItem } from "@/types/portfolio";

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "current",
    role: "Software Developer",
    company: "Confidential",
    location: "Punjab, India · Onsite",
    period: "2024 — Present",
    summary:
      "Developed and maintained scalable React/Next.js web applications with AWS serverless backends, reusable UI components, and centralized state management for end-to-end feature delivery.",
    highlights: [
      "Developed and maintained scalable web applications using React.js, Next.js, JavaScript, and TypeScript.",
      "Designed and implemented serverless backend services using AWS CDK (TypeScript), AWS Lambda, and Amazon API Gateway.",
      "Built RESTful APIs and integrated Amazon DynamoDB for scalable data storage and retrieval.",
      "Worked with Amazon SQS, Amazon S3, Amazon Cognito, and Amazon CloudWatch to build and monitor cloud-native applications.",
      "Implemented centralized state management using Redux and Redux Toolkit, improving application maintainability.",
      "Built reusable UI components and integrated frontend applications with backend APIs.",
      "Collaborated with cross-functional teams in an Agile/Scrum environment to deliver end-to-end features.",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "AWS CDK",
      "AWS Lambda",
      "API Gateway",
      "DynamoDB",
      "TailwindCSS",
    ],
    accent: "electric",
  },
];
