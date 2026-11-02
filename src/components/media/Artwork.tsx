import { useId } from "react";
import type { ArtworkScene } from "@/content/types";

/**
 * Original, hand-built SVG illustrations used wherever authentic resort photography
 * has not yet been supplied. They are deliberately stylised so they cannot be mistaken
 * for photographs of the property, and <Media> always labels them "Illustration".
 */

const W = 1600;
const H = 1000;

/** Deterministic PRNG so server and client render identical markup. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function towerPath(cx: number, baseY: number, baseW: number, height: number, tiers: number) {
  // Stepped pyramidal vimana silhouette, in the manner of Pallava temple towers.
  const pts: [number, number][] = [];
  const tierH = (height * 0.82) / tiers;
  let w = baseW / 2;
  let y = baseY;
  pts.push([cx - w, y]);
  for (let i = 0; i < tiers; i++) {
    const ny = y - tierH;
    pts.push([cx - w, ny + tierH * 0.25]);
    w *= 0.8;
    pts.push([cx - w * 1.08, ny + tierH * 0.25]);
    pts.push([cx - w, ny]);
    y = ny;
  }
  const capW = w * 0.9;
  const top = baseY - height;
  const left = pts.map(([x, py]) => `${x.toFixed(1)},${py.toFixed(1)}`);
  const right = [...pts].reverse().map(([x, py]) => `${(2 * cx - x).toFixed(1)},${py.toFixed(1)}`);
  return `M${left.join(" L")} Q${cx - capW},${y - tierH * 0.6} ${cx},${top} Q${cx + capW},${y - tierH * 0.6} ${(cx + w).toFixed(1)},${y.toFixed(1)} L${right.join(" L")} Z`;
}

function palm(x: number, baseY: number, h: number, lean: number, rand: () => number, color: string) {
  const topX = x + lean;
  const topY = baseY - h;
  const trunk = `M${x - 9},${baseY} Q${x + lean * 0.2},${baseY - h * 0.55} ${topX - 4},${topY} L${topX + 4},${topY} Q${x + lean * 0.2 + 12},${baseY - h * 0.55} ${x + 9},${baseY} Z`;
  const fronds: string[] = [];
  const count = 9;
  for (let i = 0; i < count; i++) {
    const a = (-Math.PI * (0.05 + (0.9 * i) / (count - 1))) + (rand() - 0.5) * 0.25;
    const len = h * (0.32 + rand() * 0.14);
    const ex = topX + Math.cos(a) * len;
    const ey = topY - Math.sin(a) * len * 0.55 + len * 0.42;
    const cxp = topX + Math.cos(a) * len * 0.5;
    const cyp = topY - Math.sin(a) * len * 0.75;
    const wdt = 10 + rand() * 8;
    fronds.push(
      `M${topX},${topY} Q${cxp - wdt},${cyp - wdt} ${ex},${ey} Q${cxp + wdt},${cyp + wdt * 0.6} ${topX},${topY} Z`,
    );
  }
  return (
    <g fill={color}>
      <path d={trunk} />
      {fronds.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
}

function Shore({ id }: { id: string }) {
  const r = rng(7);
  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9dfd9" />
          <stop offset="0.55" stopColor="#efe2cf" />
          <stop offset="1" stopColor="#f2cfaa" />
        </linearGradient>
        <linearGradient id={`${id}sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f8f8a" />
          <stop offset="0.45" stopColor="#3f6a6b" />
          <stop offset="1" stopColor="#1f3a4b" />
        </linearGradient>
        <linearGradient id={`${id}sand`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3d2b4" />
          <stop offset="1" stopColor="#cdb894" />
        </linearGradient>
        <radialGradient id={`${id}glow`} cx="0.66" cy="0.53" r="0.35">
          <stop offset="0" stopColor="#fbe3c4" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fbe3c4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}sky)`} />
      <rect width={W} height={H} fill={`url(#${id}glow)`} />
      <circle cx={1060} cy={505} r={58} fill="#f7dcbc" />
      <rect y={530} width={W} height={H - 530} fill={`url(#${id}sea)`} />
      {Array.from({ length: 22 }).map((_, i) => {
        const y = 545 + i * i * 0.55 + i * 6;
        const w = 60 + r() * 260;
        return (
          <rect key={i} x={1060 - w / 2 + (r() - 0.5) * 120} y={y} width={w} height={1.6 + i * 0.12} fill="#f8e0c0" opacity={0.55 - i * 0.02} />
        );
      })}
      <path d="M0,790 C220,760 420,800 640,778 C880,754 1100,800 1320,780 C1450,768 1530,774 1600,770 L1600,1000 L0,1000 Z" fill="#9fb9b0" opacity="0.55" />
      <path d="M0,820 C260,790 470,836 720,812 C980,786 1180,836 1400,812 C1500,802 1560,806 1600,804 L1600,1000 L0,1000 Z" fill={`url(#${id}sand)`} />
      <path d="M0,820 C260,790 470,836 720,812 C980,786 1180,836 1400,812 C1500,802 1560,806 1600,804" fill="none" stroke="#fbf6ec" strokeWidth="5" opacity="0.85" />
      <path d="M120,905 q40,-6 80,0 M980,930 q30,-5 60,0 M1300,880 q34,-6 68,0" stroke="#b59f7c" strokeWidth="3" fill="none" opacity="0.6" />
    </>
  );
}

function Dusk({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d3344" />
          <stop offset="0.45" stopColor="#6d6a74" />
          <stop offset="0.8" stopColor="#d79f7f" />
          <stop offset="1" stopColor="#efc59c" />
        </linearGradient>
        <linearGradient id={`${id}sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f5160" />
          <stop offset="1" stopColor="#12232f" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}sky)`} />
      <circle cx={420} cy={600} r={46} fill="#f5c79a" opacity="0.95" />
      <rect y={610} width={W} height={H - 610} fill={`url(#${id}sea)`} />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={420 - (30 + i * 9)} y={625 + i * 22} width={60 + i * 18} height={2} fill="#f0c49a" opacity={0.6 - i * 0.04} />
      ))}
      {/* Kattumaram fishing boat */}
      <g fill="#14222c">
        <path d="M1040,640 L1240,640 Q1230,656 1200,660 L1070,660 Q1048,656 1040,640 Z" />
        <path d="M1130,640 L1130,520 L1190,620 Z" opacity="0.92" />
        <rect x={1128} y={505} width={3} height={136} />
      </g>
      <path d="M0,930 C300,900 620,940 900,918 C1180,896 1400,930 1600,918 L1600,1000 L0,1000 Z" fill="#0f1d27" opacity="0.8" />
    </>
  );
}

function Temple({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9d3cf" />
          <stop offset="0.6" stopColor="#ecd6bb" />
          <stop offset="1" stopColor="#e9b98e" />
        </linearGradient>
        <linearGradient id={`${id}stone`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7b6b5a" />
          <stop offset="1" stopColor="#4a4038" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}sky)`} />
      <rect y={700} width={W} height={300} fill="#486e70" />
      <rect y={700} width={W} height={10} fill="#9db7b0" opacity="0.6" />
      <path d={towerPath(980, 760, 300, 470, 6)} fill={`url(#${id}stone)`} />
      <path d={towerPath(700, 770, 190, 290, 4)} fill={`url(#${id}stone)`} opacity="0.92" />
      <rect x={560} y={756} width={600} height={34} fill="#5a4e43" />
      <path d="M0,800 C240,780 520,812 800,796 C1100,780 1360,812 1600,792 L1600,1000 L0,1000 Z" fill="#d7c4a3" />
      <path d="M0,800 C240,780 520,812 800,796 C1100,780 1360,812 1600,792" stroke="#f6efe2" strokeWidth="4" fill="none" opacity="0.8" />
      {[300, 380, 1300].map((x, i) => (
        <circle key={i} cx={x} cy={850 + i * 30} r={4} fill="#8f8371" opacity="0.5" />
      ))}
    </>
  );
}

function Pool({ id }: { id: string }) {
  const r = rng(11);
  return (
    <>
      <defs>
        <linearGradient id={`${id}water`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9fc8c0" />
          <stop offset="0.5" stopColor="#6fa7a3" />
          <stop offset="1" stopColor="#3f7f86" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="#e8dcc8" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1={i * 100} y1={0} x2={i * 100} y2={H} stroke="#d8c8ad" strokeWidth="2" />
      ))}
      <rect x={250} y={170} width={1100} height={560} fill="#f4ede0" />
      <rect x={280} y={200} width={1040} height={500} fill={`url(#${id}water)`} />
      {Array.from({ length: 26 }).map((_, i) => {
        const y = 220 + i * 18 + r() * 8;
        const amp = 6 + r() * 8;
        let d = `M290,${y}`;
        for (let x = 290; x < 1310; x += 60) d += ` q30,${(r() > 0.5 ? 1 : -1) * amp} 60,0`;
        return <path key={i} d={d} stroke="#e8fbf6" strokeWidth={1.2 + r() * 1.6} fill="none" opacity={0.25 + r() * 0.25} />;
      })}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${420 + i * 230},800)`}>
          <rect width="150" height="64" fill="#f7f2e9" />
          <rect width="40" height="64" fill="#e5d7bf" />
        </g>
      ))}
      <g fill="#1f3a4b" opacity="0.16">
        <path d="M1500,0 Q1340,180 1180,240 Q1360,210 1480,120 Q1420,260 1300,360 Q1460,280 1540,140 Q1560,300 1500,420 Q1600,300 1600,120 Z" />
        <path d="M0,640 Q160,720 260,880 Q140,760 40,730 Q160,840 200,1000 L0,1000 Z" />
      </g>
    </>
  );
}

function Palms({ id }: { id: string }) {
  const r = rng(23);
  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bcd0c8" />
          <stop offset="1" stopColor="#f1e6d4" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}sky)`} />
      <rect y={690} width={W} height={70} fill="#5f8a85" />
      <rect y={752} width={W} height={248} fill="#a9b996" />
      <rect y={752} width={W} height={248} fill="#4f7468" opacity="0.35" />
      {palm(260, 1000, 760, 90, r, "#29453f")}
      {palm(520, 1000, 600, -60, r, "#355a51")}
      {palm(1180, 1000, 820, -110, r, "#223a35")}
      {palm(1430, 1000, 560, 40, r, "#3b6158")}
      <path d="M0,960 C400,930 800,975 1200,950 C1400,940 1520,950 1600,945 L1600,1000 L0,1000 Z" fill="#2f4a42" />
    </>
  );
}

function Room({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}view`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfdcd6" />
          <stop offset="0.55" stopColor="#efe3cf" />
          <stop offset="0.56" stopColor="#6f9693" />
          <stop offset="1" stopColor="#3c6670" />
        </linearGradient>
        <linearGradient id={`${id}light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6e6" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff6e6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="#efe6d6" />
      <rect y={720} width={W} height={280} fill="#cdb894" />
      <rect x={180} y={140} width={520} height={560} fill={`url(#${id}view)`} />
      <rect x={180} y={140} width={520} height={560} fill="none" stroke="#8f8371" strokeWidth="14" />
      <line x1={440} y1={140} x2={440} y2={700} stroke="#8f8371" strokeWidth="8" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={120 + i * 14} y={120} width={8} height={600} fill="#fbf7ef" opacity="0.55" />
      ))}
      <path d="M180,720 L700,720 L980,1000 L380,1000 Z" fill={`url(#${id}light)`} />
      <rect x={880} y={430} width={600} height={170} fill="#a88752" />
      <rect x={860} y={600} width={640} height={130} fill="#f7f2e9" />
      <rect x={860} y={700} width={640} height={40} fill="#e5d7bf" />
      <rect x={910} y={540} width={230} height={90} rx={40} fill="#fbf8f2" />
      <rect x={1180} y={540} width={230} height={90} rx={40} fill="#fbf8f2" />
      <rect x={1080} y={640} width={420} height={70} fill="#4f7468" opacity="0.85" />
      <rect x={1520} y={600} width={80} height={130} fill="#8f8371" />
    </>
  );
}

function Dining({ id }: { id: string }) {
  const lights = (y0: number, sag: number, n: number, offset: number) =>
    Array.from({ length: n }).map((_, i) => {
      const t = i / (n - 1);
      const x = 60 + t * 1480 + offset;
      const y = y0 + Math.sin(t * Math.PI) * sag;
      return (
        <g key={i}>
          <circle cx={x} cy={y} r={22} fill="#f5c58d" opacity="0.18" />
          <circle cx={x} cy={y} r={6} fill="#fbe1b6" />
        </g>
      );
    });
  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12232f" />
          <stop offset="0.7" stopColor="#3c4c55" />
          <stop offset="1" stopColor="#8d6a52" />
        </linearGradient>
        <radialGradient id={`${id}warm`} cx="0.5" cy="0.85" r="0.6">
          <stop offset="0" stopColor="#e7a86e" stopOpacity="0.55" />
          <stop offset="1" stopColor="#e7a86e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}sky)`} />
      <rect width={W} height={H} fill={`url(#${id}warm)`} />
      <path d="M0,170 Q800,330 1600,170" stroke="#0c171f" strokeWidth="2" fill="none" />
      <path d="M0,300 Q800,440 1600,300" stroke="#0c171f" strokeWidth="2" fill="none" />
      {lights(170, 160, 14, 0)}
      {lights(300, 140, 12, 20)}
      {[260, 640, 1020, 1380].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={800} rx={150} ry={34} fill="#f3e7d4" />
          <rect x={x - 140} y={800} width={280} height={170} fill="#1a2a35" />
          <circle cx={x - 60} cy={792} r={14} fill="#fbf6ec" />
          <circle cx={x + 60} cy={792} r={14} fill="#fbf6ec" />
          <rect x={x - 3} y={762} width={6} height={30} fill="#f5c58d" />
          <circle cx={x} cy={758} r={9} fill="#ffd9a3" opacity="0.8" />
        </g>
      ))}
    </>
  );
}

function Lawn({ id }: { id: string }) {
  const r = rng(5);
  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c4352" />
          <stop offset="0.6" stopColor="#8a8f8f" />
          <stop offset="1" stopColor="#e2b58c" />
        </linearGradient>
        <linearGradient id={`${id}grass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d7d62" />
          <stop offset="1" stopColor="#2d4637" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}sky)`} />
      <rect y={640} width={W} height={360} fill={`url(#${id}grass)`} />
      {palm(120, 700, 520, 50, r, "#1c2d2a")}
      {palm(1500, 700, 560, -60, r, "#1c2d2a")}
      {/* Canopy */}
      <g>
        <rect x={560} y={400} width={12} height={330} fill="#f2e6d0" />
        <rect x={1028} y={400} width={12} height={330} fill="#f2e6d0" />
        <path d="M540,404 Q800,300 1060,404 Z" fill="#f7efe1" />
        <path d="M566,404 Q620,520 566,600 M1034,404 Q980,520 1034,600" stroke="#f7efe1" strokeWidth="18" fill="none" opacity="0.9" />
        <rect x={650} y={640} width={300} height={70} fill="#a85a36" opacity="0.85" />
      </g>
      {Array.from({ length: 30 }).map((_, i) => {
        const t = i / 29;
        const x = t * W;
        const y = 330 + Math.sin(t * Math.PI) * 110;
        return <circle key={i} cx={x} cy={y} r={4.5} fill="#ffe2b0" />;
      })}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={180 + i * 110} y={820 + (i % 2) * 40} width={46} height={70} fill="#f2e6d0" opacity="0.8" />
      ))}
    </>
  );
}

function Hall({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bba27a" />
          <stop offset="1" stopColor="#7d6a50" />
        </linearGradient>
        <radialGradient id={`${id}lamp`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff1d6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff1d6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="#e9dfcd" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path d={`M${240 + i * 260},560 L${240 + i * 260},260 Q${310 + i * 260},180 ${380 + i * 260},260 L${380 + i * 260},560 Z`} fill="#c9d8d2" />
          <path d={`M${240 + i * 260},560 L${240 + i * 260},260 Q${310 + i * 260},180 ${380 + i * 260},260 L${380 + i * 260},560 Z`} fill="none" stroke="#a88752" strokeWidth="6" />
        </g>
      ))}
      <path d="M0,600 L1600,600 L1600,1000 L0,1000 Z" fill={`url(#${id}floor)`} />
      {[300, 800, 1300].map((x) => (
        <ellipse key={x} cx={x} cy={110} rx={140} ry={70} fill={`url(#${id}lamp)`} />
      ))}
      <path d="M500,690 L1100,690 L1260,860 L340,860 Z" fill="#f7f2e9" />
      <path d="M340,860 L1260,860 L1260,890 L340,890 Z" fill="#cdb894" />
      {Array.from({ length: 5 }).map((_, i) => {
        const t = (i + 0.5) / 5;
        const sc = 0.7 + 0.6 * t;
        const y = 690 + 170 * t;
        const lx = 500 - 160 * t - 46 * sc;
        const rx = 1100 + 160 * t + 12 * sc;
        return (
          <g key={i} fill="#4f7468">
            <rect x={lx} y={y - 40 * sc} width={34 * sc} height={50 * sc} />
            <rect x={rx} y={y - 40 * sc} width={34 * sc} height={50 * sc} />
          </g>
        );
      })}
    </>
  );
}

function Stone({ id }: { id: string }) {
  const r = rng(3);
  return (
    <>
      <defs>
        <radialGradient id={`${id}shade`} cx="0.3" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#d9cdb8" />
          <stop offset="1" stopColor="#9c8f7b" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}shade)`} />
      {Array.from({ length: 180 }).map((_, i) => (
        <circle
          key={i}
          cx={r() * W}
          cy={r() * H}
          r={1 + r() * 5}
          fill={["#5f564a", "#efe6d6", "#7b6e5e", "#b7a990"][Math.floor(r() * 4)]}
          opacity={0.35 + r() * 0.4}
        />
      ))}
      {/* Carved lotus relief */}
      <g fill="none" stroke="#6f6354" strokeWidth="5" opacity="0.55" transform="translate(800 520)">
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d="M0,0 C60,-60 60,-180 0,-260 C-60,-180 -60,-60 0,0 Z" transform={`rotate(${i * 30})`} />
        ))}
        <circle r={70} />
        <circle r={300} />
        <circle r={330} strokeWidth="2" />
      </g>
      <g fill="none" stroke="#f3eadb" strokeWidth="3" opacity="0.35" transform="translate(803 523)">
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d="M0,0 C60,-60 60,-180 0,-260 C-60,-180 -60,-60 0,0 Z" transform={`rotate(${i * 30})`} />
        ))}
      </g>
    </>
  );
}

const scenes: Record<ArtworkScene, (p: { id: string }) => React.ReactElement> = {
  shore: Shore,
  dusk: Dusk,
  temple: Temple,
  pool: Pool,
  palms: Palms,
  room: Room,
  dining: Dining,
  lawn: Lawn,
  hall: Hall,
  stone: Stone,
};

export const artworkScenes = Object.keys(scenes) as ArtworkScene[];

/** Bump when artwork changes so long-cached /art/*.svg files are refetched. */
export const ARTWORK_VERSION = "1";

export function artworkUrl(scene: ArtworkScene) {
  return `/art/${scene}.svg?v=${ARTWORK_VERSION}`;
}

/** Renders the SVG markup. Pages use the static /art/<scene>.svg files via <Media>; `standalone` adds the XML namespace. */
export function Artwork({ scene, className, standalone }: { scene: ArtworkScene; className?: string; standalone?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "") || "a";
  const Scene = scenes[scene];
  return (
    <svg
      {...(standalone ? { xmlns: "http://www.w3.org/2000/svg", width: W, height: H } : {})}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <Scene id={id} />
    </svg>
  );
}
