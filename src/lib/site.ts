import { Armchair, HardHat, ShieldCheck, type LucideIcon } from "lucide-react";

export const FACEBOOK_URL = "https://www.facebook.com/estimationmxl/";

export type Service = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "apres-sinistre",
    title: "Après sinistre",
    summary: "Dommages évalués et coûts de réparation chiffrés.",
    icon: ShieldCheck,
  },
  {
    id: "ebenisterie",
    title: "Ébénisterie",
    summary: "Meubles à réparer ou à remplacer, au juste coût.",
    icon: Armchair,
  },
  {
    id: "construction",
    title: "Construction et rénovation",
    summary: "Bâtiments neufs, réparations et rénovations.",
    icon: HardHat,
  },
];

export const certifications = [
  { name: "IICRC WRT", detail: "Certification" },
  { name: "Xactimate", detail: "Formation avancée" },
  { name: "Symbility", detail: "Formation" },
  { name: "CNESST", detail: "Formation amiante" },
];

export const projectTypes = [
  { value: "apres-sinistre", label: "Après sinistre" },
  { value: "ebenisterie", label: "Ébénisterie" },
  { value: "construction", label: "Construction ou rénovation" },
  { value: "autre", label: "Autre" },
];

export const navigation = [
  { label: "À propos", href: "#a-propos" },
  { label: "Certifications", href: "#certifications" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];
