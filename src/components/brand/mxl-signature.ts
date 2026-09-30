import type { SignatureReveal } from "@/components/ui/signature";

import { MXL_LOGO_L, MXL_LOGO_M, MXL_LOGO_X } from "./mxl-logo";

// Pen strokes that sign the real MXL logo, in the logo's coordinates. Each
// stroke runs down the middle of a bar, in writing order: the M's first leg
// and diagonal, its second leg and the stub after it, the X's long bar, the
// X's crossing stroke, then the L. Strokes start and end just outside their
// letter, so each bar fills in from its edge. A pen of MXL_LOGO_PEN_WIDTH
// covers every bar, so drawing these strokes as a mask uncovers the logo
// exactly.
export const MXL_LOGO_PEN =
  "M 9.3 356 L 241.9 45.6 L 314.9 142.7 " +
  "M 192.2 356 L 425.8 44.7 L 477.8 114.6 " +
  "M 376.1 355.3 L 664.9 -30.5 " +
  "M 446.1 71.9 L 601.5 279.3 " +
  "M 847.8 -30.1 L 583.6 324 L 879.8 293.4";

export const MXL_LOGO_PEN_WIDTH = 96;

export const MXL_LOGO_VIEWBOX = "0 0 857 325";

// Each letter shows through its own strokes only.
export const MXL_LOGO_REVEAL: SignatureReveal[] = [
  { d: MXL_LOGO_M, strokes: [0, 1] },
  { d: MXL_LOGO_X, strokes: [2, 3] },
  { d: MXL_LOGO_L, strokes: [4] },
];
