import type { SVGProps } from "react";

/** Pictogrammes au trait repris tels quels des maquettes (viewBox 24). */
const paths = {
  school: ["M3 10l9-5 9 5-9 5-9-5z", "M7 12v5c3 2 7 2 10 0v-5"],
  hall: ["M4 21V9l8-5 8 5v12", "M9 21v-6h6v6"],
  trash: ["M5 7h14", "M9 7V4h6v3", "M7 7l1 13h8l1-13"],
  building: ["M3 21h18", "M5 21V10l7-5 7 5v11", "M10 14h4"],
  document: ["M7 3h7l5 5v13H7z", "M14 3v5h5", "M10 13h6M10 17h6"],
  file: ["M7 3h7l5 5v13H7z", "M14 3v5h5"],
  warning: ["M12 3l9 17H3z", "M12 10v4M12 17v.5"],
  search: ["M20 20l-4-4"],
  chevron: ["M6 9l6 6 6-6"],
  download: ["M12 4v12M6 10l6 6 6-6M5 20h14"],
  chart: ["M4 20V10M10 20V4M16 20v-7M22 20H2"],
  briefcase: ["M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"],
  idCard: ["M14 10h4M14 14h4"],
  heart: ["M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"],
  facebook: ["M15 3h-3a4 4 0 00-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 011-1h3z"],
  mail: ["M3 7l9 6 9-6"],
  link: ["M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1", "M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1"],
  calendar: ["M3 10h18M8 3v4M16 3v4"],
  menu: ["M4 8h16M4 16h16"],
  close: ["M6 6l12 12M18 6L6 18"],
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24, strokeWidth = 1.6, ...props }: { name: IconName; size?: number; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {name === "search" && <circle cx="11" cy="11" r="7" />}
      {name === "briefcase" && <rect x="3" y="7" width="18" height="13" rx="2" />}
      {name === "idCard" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="12" r="2.5" />
        </>
      )}
      {name === "mail" && <rect x="3" y="5" width="18" height="14" rx="2" />}
      {name === "calendar" && <rect x="3" y="5" width="18" height="16" rx="2" />}
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
