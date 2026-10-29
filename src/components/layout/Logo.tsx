import { cn } from "@/lib/utils";

/** Feuilles de l'arbre : [x, y, rotation, échelle], relevées dans les maquettes. */
const LEAVES: [number, number, number, number][] = [
  [63.0, 35.2, -5, 0.85], [60.1, 30.3, -39, 0.85], [39.9, 30.3, -141, 0.85], [37.0, 35.2, -175, 0.85],
  [71.0, 35.4, -2, 1], [69.8, 30.7, -19, 1], [64.2, 24.2, -47, 1], [59.0, 21.6, -65, 1],
  [49.0, 20.0, -93, 1], [42.9, 21.0, -110, 1], [34.4, 25.3, -138, 1], [30.9, 29.3, -155, 1],
  [29.0, 37.0, -183, 1], [79.0, 36.9, 2, 1], [78.3, 31.3, -12, 1], [74.7, 24.4, -32, 1],
  [70.0, 20.1, -46, 1], [61.9, 15.9, -66, 1], [54.9, 14.3, -80, 1], [45.1, 14.3, -100, 1],
  [38.1, 15.9, -114, 1], [30.0, 20.1, -134, 1], [25.3, 24.4, -148, 1], [21.7, 31.3, -168, 1],
  [21.0, 36.9, -182, 1],
];
const LEAF = "M-4.2 0C-2.1-2.7 2.1-2.7 4.2 0C2.1 2.7-2.1 2.7-4.2 0Z";

const palettes = {
  white: { fields: "#FFFFFF", fieldsOpacity: 0.6, rail: "#FFFFFF", railOpacity: 0.85, tree: "#FFFFFF" },
  color: { fields: "#E6DCCB", fieldsOpacity: 1, rail: "#D39A7C", railOpacity: 1, tree: "#3D6B4F" },
};

/** Emblème de la commune : arbre, trois bandes de champs et voie ferrée, sans contour. */
export function Emblem({ variant = "white", size = 52, className }: { variant?: "white" | "color"; size?: number; className?: string }) {
  const p = palettes[variant];
  return (
    <svg width={size} height={size} viewBox="6 8 88 86" aria-hidden="true" focusable="false" className={cn("flex-none", className)}>
      <g fill="none" stroke={p.fields} strokeLinecap="round" opacity={p.fieldsOpacity}>
        <path d="M11 50C31 50 43 61 48 90" strokeWidth="9" />
        <path d="M13 63C28 64 37 72 40 89" strokeWidth="8" />
        <path d="M17 75C25 76 30 81 32 88" strokeWidth="7" />
      </g>
      <g fill="none" stroke={p.rail} strokeLinecap="round" strokeWidth="3.5" opacity={p.railOpacity}>
        <path d="M52 89C52 72 62 56 84 45" />
        <path d="M53.5 81H67M55.5 73H71M59 65H75M64.5 58H79M71 52H83" />
      </g>
      <g fill="none" stroke={p.tree} strokeLinecap="round">
        <path d="M51 86C50 73 51 62 49 52" strokeWidth="5" />
        <path d="M49 52C47 44 50 34 53 23" strokeWidth="3.2" />
        <path d="M49.5 57C45 50 39 46 32 43" strokeWidth="2.6" />
        <path d="M50 52C55 47 60 44 66 42" strokeWidth="2.6" />
        <path d="M49 44C46 38 43 34 40 29" strokeWidth="2" />
      </g>
      <g fill={p.tree}>
        <path d="M63 44C66 36 74 33 79 35C76 43 69 47 63 44Z" />
        {LEAVES.map(([x, y, r, s]) => (
          <path key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} d={LEAF} />
        ))}
      </g>
    </svg>
  );
}

/** Logo cliquable de l'en-tête : emblème + logotype. */
export function Logo({ variant = "white", withPrefix = false }: { variant?: "white" | "color"; withPrefix?: boolean }) {
  const white = variant === "white";
  return (
    <>
      <Emblem variant={variant} className="size-11 md:size-[52px]" />
      <span className="flex flex-col leading-[1.1]">
        {withPrefix && (
          <span className={cn("hidden text-[12px] uppercase tracking-[0.14em] md:inline", white ? "text-[#D9DED9]" : "text-muted")}>
            Mairie de
          </span>
        )}
        <span className="font-display text-[16px] font-bold md:text-[19px]">Saint-Yzan-de-Soudiac</span>
      </span>
    </>
  );
}
