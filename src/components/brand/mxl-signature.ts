// The MXL logo drawn as pen strokes, in the logo's own proportions (the
// logo's viewBox scaled by 1/4). One stroke writes the M and runs on down its
// last diagonal through the X, as the logo does; the pen then lifts for the
// X's long bar and for the L. Each line follows the outer edge of the logo
// stroke it stands for, inset by half the pen width, so the tops and the
// baseline line up with the logo's.
export const MXL_SIGNATURE =
  "M 7.5 77.2 L 60.4 6.4 L 83.5 36.9 L 53.2 77.2 L 106.5 6.2 L 144 56.3 " +
  "M 103.1 77.2 L 156.9 5.5 " +
  "M 202.2 5.5 L 148.7 77.2 L 203.7 77.2";

export const MXL_SIGNATURE_VIEWBOX = "0 0 214.25 81.25";

// The pen width the path was laid out for.
export const MXL_SIGNATURE_STROKE = 7.5;
