import type { ComponentProps } from "react";

// Vectorized from the client's white PNG logo (public/brand/mxl-logo-blanc.png),
// one closed shape per letter.
export const MXL_LOGO_M =
  "M0 324L0 323L239.5 3.5L241.6 0.8L261.6 26.5L330.8 118.6L333.7 121L352.7 96.5L410.3 19.5L425.2 0.9L427 1.5L470 59.4L470 61.5L448.5 89.7L437.5 103.9L436.5 103.9L425.1 89.9L304.5 250.5L249.5 324L183 324L183 322.8L286.5 184.5L298 167.6L298 165L243 91.5L241 91.5L123.5 247.6L66.5 323.9Z";
export const MXL_LOGO_X =
  "M369.5 324L367.2 322.5L455.2 204.5L481.1 168.9L482.2 166.1L475.6 156.5L454.9 129L453.8 126L459.3 117.5L469.5 103.5L486.3 81.8L489.5 85.9L516.5 120.9L517.7 121L607.4 2L610.5 1.1L643.5 0.7L673 1L673 2.9L612.4 84.5L552.4 164.5L550.9 167L581.6 208.5L593.8 225.4L591.8 229.2L565.1 264.5L561.3 269.2L554.5 261.2L517.5 212.2L514.2 215.5L432.9 324Z";
export const MXL_LOGO_L =
  "M550 325L550 322.7L657.3 179.5L787.5 6.5L793.5 0L856.4 1.1L857 1.8L729.2 173.5L657.1 269.5L711.5 270.7L857 271L857 273L818.8 324L658.3 324Z";
export const MXL_LOGO_PATH = MXL_LOGO_L + MXL_LOGO_M + MXL_LOGO_X;

type MxlLogoProps = Omit<ComponentProps<"svg">, "children"> & {
  title?: string;
};

export function MxlLogo({ title = "MXL", ...props }: MxlLogoProps) {
  return (
    <svg
      viewBox="0 0 857 325"
      fill="currentColor"
      role="img"
      aria-label={title}
      {...props}
    >
      <path d={MXL_LOGO_PATH} />
    </svg>
  );
}
