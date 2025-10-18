import type { ReactNode } from "react";

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
}

export interface StudentProject {
  id: string;
  title: string;
  studentName: string;
  year: number;
  description: string;
  imageUrl: string;
}

export interface ReviewableProject extends Omit<StudentProject, 'id'> {
  id: string;
  submitterName: string;
  submitterEmail: string;
}

export interface NewsArticle {
  id:string;
  title: string;
  date: string;
  summary: string;
  imageUrl: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  category: 'labs' | 'gallery';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  fileUrl: string; // Will store base64 data URL for the PDF
}

export interface HomePageContent {
  headline: string;
  subheadline: string;
  ctaButton1Text: string;
  ctaButton2Text: string;
}

export interface AboutPageContent {
  intro: string;
  vision: string;
  mission: string;
  goals: string[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
}

export interface CurriculumContent {
  intro: string;
  year1: Course[];
  year2: Course[];
  year3: Course[];
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  workHours: string;
}

export interface QuickLink {
  id: string;
  label: string;
  url: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
}

export interface SiteConfig {
  siteName: string;
  logoUrl: string;
  homePageBackground: string;
  quickLinks: QuickLink[];
  socialLinks: SocialLinks;
  theme: 'light' | 'dark';
  curriculumCourseColor: string;
  // FIX: Add missing properties to SiteConfig to resolve type errors across the application.
  primaryColor: string;
  pageAccentColors?: {
    about?: string;
    curriculum?: string;
    news?: string;
    contact?: string;
  };
}