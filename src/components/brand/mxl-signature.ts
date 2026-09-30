import type { SignatureReveal } from "@/components/ui/signature";

import { MXL_LOGO_L, MXL_LOGO_M, MXL_LOGO_X } from "./mxl-logo";

// Pen strokes that sign the real MXL logo, in the logo's coordinates. Each
// stroke runs down the middle of a bar, in writing order: the M's first leg
// and diagonal, its second leg and the stub after it, the X's long bar, the
// X's crossing stroke, then the L. A pen of MXL_LOGO_PEN_WIDTH covers every
// bar, so drawing these strokes as a mask uncovers the logo exactly.
export const MXL_LOGO_PEN =
  "M 33.2 324 L 241.9 45.6 L 286.1 104.3 " +
  "M 216.2 324 L 425.8 44.7 L 453.9 82.5 " +
  "M 400 323.2 L 640.9 1.5 " +
  "M 470.1 103.9 L 577.5 247.3 " +
  "M 823.9 2 L 583.6 324 L 840 297.5";

export const MXL_LOGO_PEN_WIDTH = 96;

export const MXL_LOGO_VIEWBOX = "0 0 857 325";

// Each letter shows through its own strokes only.
export const MXL_LOGO_REVEAL: SignatureReveal[] = [
  { d: MXL_LOGO_M, strokes: [0, 1] },
  { d: MXL_LOGO_X, strokes: [2, 3] },
  { d: MXL_LOGO_L, strokes: [4] },
];
