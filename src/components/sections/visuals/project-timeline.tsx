const WEEK_WIDTH = 60;
const RULER_LEFT = 24;
const WEEKS = 8;
const CURRENT_WEEK = 6;

const u = (value: number) => `calc(var(--u) * ${value})`;
// x position where a week starts on the ruler.
const weekStart = (week: number) => RULER_LEFT + (week - 1) * WEEK_WIDTH;
const weekMiddle = (week: number) => weekStart(week) + WEEK_WIDTH / 2;

const phases = [
  { title: "Démolition", start: 1, end: 2, top: 92 },
  { title: "Structure et charpente", start: 3, end: 6, top: 150 },
  { title: "Finition intérieure", start: 5, end: 8, top: 208 },
];

export function ProjectTimeline() {
  const playheadX = weekMiddle(CURRENT_WEEK);

  return (
    <div
      role="img"
      aria-label="Exemple d'échéancier de rénovation : démolition, structure et charpente, puis finition intérieure"
      className="@container"
    >
      <div className="relative aspect-[520/300] w-full scaled-canvas overflow-hidden [--canvas-width:520]">
        <div
          className="absolute h-px bg-neutral-800"
          style={{
            left: u(RULER_LEFT),
            width: u(WEEKS * WEEK_WIDTH),
            top: u(64),
          }}
        />
        {Array.from({ length: WEEKS * 2 + 1 }, (_, index) => {
          const major = index % 2 === 0;
          return (
            <div
              key={index}
              className="absolute w-px bg-neutral-800"
              style={{
                left: u(RULER_LEFT + (index * WEEK_WIDTH) / 2),
                top: u(major ? 56 : 59),
                height: u(major ? 8 : 5),
              }}
            />
          );
        })}
        {[1, 3, 5, 7].map((week) => (
          <span
            key={week}
            className="absolute -translate-x-1/2 text-[length:calc(var(--u)*10)] font-medium tracking-wide text-neutral-500"
            style={{ left: u(weekMiddle(week)), top: u(38) }}
          >
            SEM. {week}
          </span>
        ))}

        {phases.map((phase) => (
          <div
            key={phase.title}
            className="absolute z-10 rounded-xl bg-linear-to-b from-neutral-900 to-neutral-950 px-4 py-2.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.07)] ring-1 ring-white/8"
            style={{
              left: u(weekStart(phase.start)),
              width: u((phase.end - phase.start + 1) * WEEK_WIDTH - 6),
              top: u(phase.top),
            }}
          >
            <p className="truncate font-medium tracking-tight text-neutral-100">
              {phase.title}
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">
              Sem. {phase.start} à {phase.end}
            </p>
          </div>
        ))}

        <div
          className="absolute bottom-0 z-20 w-12 -translate-x-1/2 bg-mxl-blue/15 blur-2xl"
          style={{ left: u(playheadX), top: u(40) }}
        />
        <div
          className="absolute bottom-0 z-30 w-px bg-mxl-blue-light/70"
          style={{ left: u(playheadX), top: u(32) }}
        />
        <div
          className="absolute z-40 -translate-x-1/2 rounded-md bg-linear-to-b from-[#3d77f7] to-mxl-blue px-2.5 py-1 text-[length:calc(var(--u)*10)] font-semibold tracking-wide text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]"
          style={{ left: u(playheadX), top: u(8) }}
        >
          SEM. {CURRENT_WEEK}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-50 w-8 bg-linear-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-50 w-8 bg-linear-to-l from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-10 bg-linear-to-t from-black to-transparent" />
      </div>
    </div>
  );
}
