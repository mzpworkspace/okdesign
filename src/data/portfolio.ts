import content from "./portfolio.json";

export interface Brief {
  id?: string;
  name: string;
  category: string;
  color: string;
  summary: string;
  blocks: string[][];
}
export interface Project extends Brief {
  id: string;
  headline: string;
  audience: string;
  focus: string[];
  description: string;
  form: string;
  alt: string;
}
export const projects: Project[] = content.projects;
export const companyBrief: Brief = content.brief;
export const CONTACT_EMAIL = "mhdali@storive.in";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/mhdali-palsaniya-68233923b";
export const COMPANY_PDF = "/catalogs/Ideolect-Company-Brief.pdf";
export const projectImage = (project: Project) => `/images/${project.id}.webp`;
