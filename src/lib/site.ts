import {
  Calculator,
  FileCheck2,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";

export const FACEBOOK_URL = "https://www.facebook.com/estimationmxl/";

export type Service = {
  id: string;
  title: string;
  /** Shorter title for the header menu, when `title` runs long. */
  menuTitle?: string;
  /** One line for the header menu. */
  summary: string;
  icon: LucideIcon;
};

// Estimation MXL are after-claim estimators: each service is a step of the
// same after-claim estimate, worded from estimationmxl.com.
export const services: Service[] = [
  {
    id: "evaluation-des-dommages",
    title: "Évaluation des dommages",
    summary: "Chaque dommage, évalué un à un.",
    icon: SearchCheck,
  },
  {
    id: "couts-de-reparation",
    title: "Coûts de réparation ou de remplacement",
    menuTitle: "Coûts de réparation",
    summary: "Réparer ou remplacer vos biens.",
    icon: Calculator,
  },
  {
    id: "rapport-et-indemnites",
    title: "Rapport et indemnités",
    summary: "Pour établir les indemnités à verser.",
    icon: FileCheck2,
  },
];

export type Certification = {
  name: string;
  detail: string;
  /** Logo in /public (e.g. "/certifications/iicrc.svg"), shown in white. */
  logo?: { src: string; width: number; height: number };
};

export const certifications: Certification[] = [
  { name: "IICRC WRT", detail: "Certification" },
  { name: "Xactimate", detail: "Formation avancée" },
  { name: "Symbility", detail: "Formation" },
  { name: "CNESST", detail: "Formation amiante" },
];

export const navigation = [
  { label: "À propos", href: "#a-propos" },
  { label: "Certifications", href: "#certifications" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];
