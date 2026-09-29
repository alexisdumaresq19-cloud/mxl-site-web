// Sample after-claim estimate for the site's illustrations only (always
// labelled "Exemple" in the UI).

const lineItems = [
  {
    code: "DÉM",
    description: "Retrait du gypse endommagé",
    quantity: 48,
    unit: "pi²",
    unitPrice: 2.1,
  },
  {
    code: "ASS",
    description: "Assèchement, déshumidificateur",
    quantity: 3,
    unit: "jour",
    unitPrice: 95,
  },
  {
    code: "GYP",
    description: "Gypse 1/2 po, pose et joints",
    quantity: 48,
    unit: "pi²",
    unitPrice: 4.25,
  },
  {
    code: "PNT",
    description: "Apprêt et peinture, 2 couches",
    quantity: 320,
    unit: "pi²",
    unitPrice: 1.85,
  },
  {
    code: "MOU",
    description: "Plinthes MDF 5 po",
    quantity: 24,
    unit: "pi lin.",
    unitPrice: 6.5,
  },
  {
    code: "ÉBÉ",
    description: "Caisson bas 24 po, remplacement",
    quantity: 1,
    unit: "unité",
    unitPrice: 640,
  },
];

const TPS_RATE = 0.05;
const TVQ_RATE = 0.09975;

const currency = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
});

export const formatCents = (cents: number) => currency.format(cents / 100);

export const estimateRows = lineItems.map((item) => ({
  ...item,
  cents: Math.round(item.quantity * item.unitPrice * 100),
}));

const subtotal = estimateRows.reduce((sum, row) => sum + row.cents, 0);
const tps = Math.round(subtotal * TPS_RATE);
const tvq = Math.round(subtotal * TVQ_RATE);

export const estimateTotals = {
  subtotal,
  tps,
  tvq,
  total: subtotal + tps + tvq,
};

export const estimateTaxLines = [
  { label: "Sous-total", cents: subtotal },
  { label: "TPS (5 %)", cents: tps },
  { label: "TVQ (9,975 %)", cents: tvq },
];

export const estimateFile = {
  number: "2026-0418",
  lossType: "Dégât d'eau",
  rooms: "Sous-sol, salle de lavage",
  lossDate: "12 septembre 2026",
  photos: 24,
};
