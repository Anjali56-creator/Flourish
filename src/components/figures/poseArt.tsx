import type { ReactNode } from 'react';

/**
 * Minimalist line-art figures that depict the actual shape of each pose or
 * movement. Every figure draws with `currentColor` so it inherits the accent
 * colour and adapts to light/dark automatically. viewBox is a shared
 * 240 x 170 so all figures sit at a consistent scale and aspect ratio.
 *
 * These are instructional, not decorative: the silhouette shows the body
 * position a beginner should aim for.
 */

const S = {
  fill: 'none' as const,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 5,
};

function Head({ cx, cy, r = 11 }: { cx: number; cy: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="currentColor" />;
}

function Ground() {
  return <line x1="24" y1="162" x2="216" y2="162" stroke="currentColor" strokeWidth={3} strokeLinecap="round" opacity={0.35} />;
}

/** Each entry returns the inner SVG content for one figure. */
export const POSE_ART: Record<string, ReactNode> = {
  // ---------- Standing ----------
  mountain: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={38} />
      <path d="M120 49 V108" />
      <path d="M120 60 L100 100 M120 60 L140 100" />
      <path d="M120 108 L109 160 M120 108 L131 160" />
    </g>
  ),
  'forward-fold': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M118 92 L112 160 M122 92 L128 160" />
      <path d="M120 92 C120 120 118 138 112 150" />
      <Head cx={107} cy={150} r={10} />
      <path d="M116 112 L104 150 M120 112 L132 150" />
    </g>
  ),
  chair: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M114 160 L118 128 M130 160 L124 128" />
      <path d="M121 128 L138 112" />
      <path d="M138 112 L122 72" />
      <Head cx={118} cy={62} r={10} />
      <path d="M126 80 L118 44 M126 80 L134 46" />
    </g>
  ),
  tree: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={44} />
      <path d="M120 55 V110" />
      <path d="M120 110 L118 160" />
      <path d="M120 110 L150 124 L122 134" />
      <path d="M120 55 L106 40 L120 24 L134 40 L120 55" />
    </g>
  ),
  'standing-balance': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={112} cy={44} />
      <path d="M112 54 C104 70 100 84 96 92" />
      <path d="M112 60 L150 92 L166 78" />
      <path d="M100 88 L150 88" />
      <path d="M96 92 L94 160" />
    </g>
  ),
  walking: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={40} />
      <path d="M120 50 V104" />
      <path d="M120 104 L140 158 M120 104 L108 134 L102 158" />
      <path d="M120 62 L106 96 M120 62 L138 88" />
    </g>
  ),

  // ---------- Kneeling / table ----------
  child: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M150 158 L150 130" />
      <path d="M150 130 C130 138 108 146 92 150" />
      <Head cx={84} cy={150} r={10} />
      <path d="M148 138 L96 148 M150 128 L104 140" />
    </g>
  ),
  cat: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M86 150 V120" />
      <path d="M154 150 V122" />
      <path d="M86 120 C100 100 140 100 154 122" />
      <Head cx={80} cy={134} r={10} />
    </g>
  ),
  cow: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M86 150 V122" />
      <path d="M154 150 V120" />
      <path d="M86 122 C104 140 140 140 154 120" />
      <Head cx={78} cy={110} r={10} />
    </g>
  ),
  camel: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M104 156 L140 156" />
      <path d="M110 156 L110 120" />
      <path d="M110 120 C118 96 130 86 140 96" />
      <Head cx={146} cy={100} r={10} />
      <path d="M118 106 C128 120 136 140 140 152" />
    </g>
  ),
  puppy: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M150 156 V128" />
      <path d="M150 128 C124 128 96 132 78 140" />
      <Head cx={72} cy={143} r={9} />
      <path d="M150 122 L86 122" />
    </g>
  ),
  'thread-needle': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M154 156 V130" />
      <path d="M154 130 C130 128 104 136 86 150" />
      <Head cx={80} cy={150} r={9} />
      <path d="M150 124 L96 150" />
      <path d="M150 118 L150 96" />
    </g>
  ),

  // ---------- Prone (belly down) ----------
  cobra: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M176 152 L112 152" />
      <path d="M112 152 C104 140 96 124 90 110" />
      <Head cx={84} cy={102} r={10} />
      <path d="M104 152 L92 118" />
    </g>
  ),
  sphinx: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M180 154 L110 154" />
      <path d="M110 154 C106 140 106 128 108 120" />
      <Head cx={102} cy={112} r={10} />
      <path d="M108 152 L92 152" />
    </g>
  ),
  locust: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M90 148 C110 140 150 140 176 132" />
      <Head cx={82} cy={140} r={10} />
      <path d="M100 146 L96 128 M150 142 L156 126" />
    </g>
  ),
  bow: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M94 150 C104 132 108 120 106 112" />
      <Head cx={100} cy={104} r={10} />
      <path d="M120 150 C140 150 152 132 150 118" />
      <path d="M110 118 C128 118 146 122 150 120" />
    </g>
  ),

  // ---------- Supine (back down) ----------
  savasana: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M72 150 L176 150" />
      <Head cx={62} cy={150} r={10} />
      <path d="M100 150 L94 162 M176 150 L186 145 M176 150 L186 156" />
    </g>
  ),
  bridge: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M164 152 L120 122" />
      <path d="M120 122 L92 122" />
      <path d="M92 122 L78 152" />
      <Head cx={172} cy={152} r={9} />
    </g>
  ),
  'legs-up-wall': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <line x1="158" y1="150" x2="158" y2="70" stroke="currentColor" strokeWidth={3} opacity={0.4} />
      <path d="M76 150 L142 150" />
      <path d="M142 150 L146 84" />
      <Head cx={68} cy={150} r={10} />
      <path d="M104 150 L98 160" />
    </g>
  ),
  'happy-baby': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M112 150 L150 150" />
      <Head cx={158} cy={150} r={9} />
      <path d="M116 150 L96 116 L112 98" />
      <path d="M140 146 L112 104" />
    </g>
  ),
  'supine-twist': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M112 146 L156 146" />
      <Head cx={164} cy={146} r={9} />
      <path d="M112 146 L90 136 M112 146 L90 156" />
      <path d="M118 146 L100 122 L118 110" />
    </g>
  ),
  'knees-to-chest': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M110 150 L150 150" />
      <Head cx={158} cy={150} r={9} />
      <path d="M118 150 L104 122 L124 118" />
      <path d="M138 146 L120 122" />
    </g>
  ),
  fish: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M78 150 L172 150" />
      <path d="M96 150 C112 138 116 132 116 124" />
      <Head cx={72} cy={144} r={9} />
    </g>
  ),

  // ---------- Seated ----------
  'seated-meditation': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M94 158 L146 158 L120 132 Z" />
      <path d="M120 132 V70" />
      <Head cx={120} cy={58} />
      <path d="M120 90 L100 126 M120 90 L140 126" />
    </g>
  ),
  'seated-forward-fold': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M96 152 L182 152" />
      <path d="M96 152 C96 130 100 116 112 108" />
      <Head cx={120} cy={112} r={10} />
      <path d="M108 120 L150 140" />
    </g>
  ),
  butterfly: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M120 150 L120 134" />
      <path d="M120 134 L96 150 M120 134 L144 150" />
      <path d="M96 150 L120 150 L144 150" />
      <path d="M120 150 V92" />
      <Head cx={120} cy={80} />
      <path d="M120 108 L118 132 M120 108 L122 132" />
    </g>
  ),
  'seated-twist': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M96 152 L150 152" />
      <path d="M120 152 L120 84" />
      <Head cx={126} cy={74} />
      <path d="M122 100 C136 106 140 118 132 128" />
      <path d="M118 96 L96 120" />
    </g>
  ),
  boat: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M120 142 L176 96" />
      <path d="M120 142 L82 100" />
      <Head cx={76} cy={92} r={10} />
      <path d="M98 118 L150 96" />
    </g>
  ),
  'staff-pose': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M100 152 L182 152" />
      <path d="M100 152 V96" />
      <Head cx={100} cy={84} />
      <path d="M100 110 L118 140 M100 110 L82 140" />
    </g>
  ),
  'neck-release': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M96 122 L144 122" />
      <path d="M120 122 V158" />
      <path d="M120 122 L128 102" />
      <Head cx={134} cy={92} r={10} />
      <path d="M144 120 C142 104 140 96 136 90" />
    </g>
  ),
  'wrist-stretch': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={44} />
      <path d="M120 54 V120" />
      <path d="M120 120 L110 160 M120 120 L130 160" />
      <path d="M120 66 L150 78" />
      <path d="M150 78 L142 62" />
      <path d="M120 72 L146 86" />
    </g>
  ),

  // ---------- Lunges & hips ----------
  'low-lunge': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M92 160 L96 124" />
      <path d="M96 124 L126 120" />
      <path d="M126 120 L166 158 L184 158" />
      <path d="M126 120 L124 72" />
      <Head cx={122} cy={62} />
      <path d="M128 82 L122 46" />
    </g>
  ),
  'crescent-lunge': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M92 160 L98 126" />
      <path d="M98 126 L128 120" />
      <path d="M128 120 L178 156" />
      <path d="M128 120 L126 70" />
      <Head cx={124} cy={60} />
      <path d="M128 78 L120 40 M128 78 L136 42" />
    </g>
  ),
  pigeon: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M92 152 L134 152" />
      <path d="M134 138 L188 156" />
      <path d="M134 138 L96 152" />
      <path d="M134 138 L130 84" />
      <Head cx={128} cy={74} />
      <path d="M132 100 L112 140" />
    </g>
  ),
  malasana: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M98 160 L92 132 M142 160 L148 132" />
      <path d="M92 132 L120 146 L148 132" />
      <path d="M120 146 V86" />
      <Head cx={120} cy={74} />
      <path d="M120 100 L102 122 M120 100 L138 122" />
    </g>
  ),
  goddess: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M86 160 L92 128 M154 160 L148 128" />
      <path d="M92 128 L120 128 L148 128" />
      <path d="M120 128 V72" />
      <Head cx={120} cy={60} />
      <path d="M120 84 L100 78 L94 60 M120 84 L140 78 L146 60" />
    </g>
  ),
  'figure-four': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M96 150 L150 150" />
      <Head cx={88} cy={150} r={9} />
      <path d="M132 150 L120 120 L138 108" />
      <path d="M120 132 L142 138" />
    </g>
  ),

  // ---------- Warriors & wide stance ----------
  warrior1: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M78 160 L96 128" />
      <path d="M96 128 L122 106" />
      <path d="M122 106 L168 158" />
      <path d="M122 106 L122 62" />
      <Head cx={122} cy={52} />
      <path d="M122 72 L112 34 M122 72 L132 34" />
    </g>
  ),
  warrior2: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M74 160 L92 126 L96 160" />
      <path d="M92 126 L122 116" />
      <path d="M122 116 L176 158" />
      <path d="M122 116 L122 66" />
      <Head cx={122} cy={56} />
      <path d="M86 74 L158 74" />
    </g>
  ),
  triangle: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M70 160 L96 120 L96 160" />
      <path d="M96 120 L176 158" />
      <path d="M96 120 L124 138" />
      <path d="M124 138 L108 100 L124 138 L118 158" />
      <path d="M110 118 L120 84" />
      <Head cx={104} cy={150} r={9} />
    </g>
  ),
  'half-moon': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M90 158 L96 118" />
      <path d="M96 118 L140 96" />
      <path d="M96 118 L150 112" />
      <path d="M120 106 L124 72 M120 112 L118 150" />
      <Head cx={150} cy={108} r={9} />
    </g>
  ),
  'side-angle': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M74 160 L92 126 L96 160" />
      <path d="M92 126 L120 118" />
      <path d="M120 118 L176 158" />
      <path d="M120 118 L150 80" />
      <path d="M110 120 L92 138" />
      <Head cx={156} cy={72} r={9} />
    </g>
  ),

  // ---------- Inversions / arm balance ----------
  downdog: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M64 156 L126 74" />
      <path d="M126 74 L182 156" />
      <Head cx={84} cy={132} r={9} />
      <path d="M64 156 L92 156 M182 156 L154 156" />
    </g>
  ),
  dolphin: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M70 152 L84 152" />
      <path d="M84 152 L128 78" />
      <path d="M128 78 L182 154" />
      <Head cx={94} cy={130} r={9} />
    </g>
  ),
  plank: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M82 152 L88 118" />
      <path d="M88 118 L184 150" />
      <Head cx={80} cy={112} r={9} />
    </g>
  ),
  'side-plank': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M84 152 L92 118" />
      <path d="M92 118 L182 150" />
      <path d="M92 118 L98 82" />
      <Head cx={86} cy={110} r={9} />
    </g>
  ),
  pushup: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M86 152 L90 132 L100 120" />
      <path d="M100 120 L184 148" />
      <Head cx={92} cy={112} r={9} />
    </g>
  ),
  'crow-pose': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M96 156 L104 126" />
      <path d="M104 126 C120 118 138 122 146 110" />
      <path d="M110 128 C108 108 118 96 134 92" />
      <Head cx={100} cy={122} r={9} />
    </g>
  ),

  // ---------- Backbends standing ----------
  dancer: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M112 112 L110 160" />
      <path d="M112 112 C104 100 98 92 92 88" />
      <Head cx={84} cy={82} r={10} />
      <path d="M112 112 L150 96 L164 78" />
      <path d="M96 90 L152 92" />
      <path d="M90 86 L68 78" />
    </g>
  ),
  'upward-dog': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M176 156 L120 150" />
      <path d="M120 150 C110 132 104 112 104 96" />
      <Head cx={100} cy={86} r={10} />
      <path d="M104 100 L96 152" />
    </g>
  ),
  'reverse-warrior': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M74 160 L92 126 L96 160" />
      <path d="M92 126 L120 116" />
      <path d="M120 116 L176 158" />
      <path d="M120 116 C118 96 122 80 134 66" />
      <Head cx={118} cy={64} r={9} />
      <path d="M108 118 L96 138" />
    </g>
  ),

  // ---------- Exercises ----------
  squat: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M104 160 L100 128 M136 160 L140 128" />
      <path d="M100 128 L120 134 L140 128" />
      <path d="M120 134 L120 78" />
      <Head cx={120} cy={66} />
      <path d="M120 92 L150 100 M120 92 L150 110" />
    </g>
  ),
  lunge: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M88 160 L96 122" />
      <path d="M96 122 L124 118" />
      <path d="M124 118 L160 158 L160 138" />
      <path d="M124 118 L124 70" />
      <Head cx={124} cy={58} />
      <path d="M124 86 L110 116 M124 86 L138 116" />
    </g>
  ),
  'wall-sit': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <line x1="150" y1="160" x2="150" y2="60" stroke="currentColor" strokeWidth={3} opacity={0.4} />
      <path d="M110 160 L110 122 L142 122" />
      <path d="M142 122 L142 74" />
      <Head cx={142} cy={62} />
      <path d="M142 92 L120 108" />
    </g>
  ),
  'calf-raise': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={44} />
      <path d="M120 54 V116" />
      <path d="M120 116 L112 152 L118 158 M120 116 L128 152 L122 158" />
      <path d="M120 66 L102 96 M120 66 L138 96" />
      <path d="M106 150 L132 150" opacity={0.4} />
    </g>
  ),
  'dead-bug': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M84 150 L140 150" />
      <Head cx={76} cy={150} r={9} />
      <path d="M120 150 L118 118 L134 104" />
      <path d="M100 150 L112 120" />
      <path d="M92 150 L90 120" />
    </g>
  ),
  'bird-dog': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M92 150 V122 M140 150 V122" />
      <path d="M92 122 L140 122" />
      <Head cx={84} cy={116} r={9} />
      <path d="M140 122 L178 108" />
      <path d="M92 122 L58 108" />
    </g>
  ),
  superman: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M66 138 C96 128 150 128 180 116" />
      <Head cx={58} cy={132} r={9} />
      <path d="M78 134 L60 118 M164 122 L182 108" />
    </g>
  ),
  'mountain-climber': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M84 150 L90 120" />
      <path d="M90 120 L170 150" />
      <Head cx={80} cy={112} r={9} />
      <path d="M130 138 L120 112 L134 100" />
      <path d="M150 144 L178 156" />
    </g>
  ),
  'jumping-jack': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={40} />
      <path d="M120 50 V104" />
      <path d="M120 104 L98 158 M120 104 L142 158" />
      <path d="M120 60 L96 34 M120 60 L144 34" />
    </g>
  ),
  'high-knees': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={42} />
      <path d="M120 52 V104" />
      <path d="M120 104 L122 158" />
      <path d="M120 104 L104 108 L112 132" />
      <path d="M120 64 L102 92 M120 64 L138 88" />
    </g>
  ),
  'side-lunge': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M72 158 L96 126" />
      <path d="M96 126 L168 150" />
      <path d="M96 126 L118 118" />
      <path d="M118 118 L118 72" />
      <Head cx={118} cy={62} />
      <path d="M118 90 L100 110" />
    </g>
  ),
  'step-up': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M150 160 L150 128 L184 128" opacity={0.4} />
      <path d="M120 160 L124 126" />
      <path d="M124 126 L150 122" />
      <path d="M150 122 L150 96" />
      <path d="M150 100 L150 66" />
      <Head cx={150} cy={56} />
      <path d="M150 82 L132 104" />
    </g>
  ),
  clamshell: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M84 150 L138 150" />
      <Head cx={76} cy={150} r={9} />
      <path d="M120 150 L128 128 L112 118" />
      <path d="M120 150 L112 130 L100 138" />
    </g>
  ),
  'hip-circle': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={42} />
      <path d="M120 52 V108" />
      <path d="M120 108 L110 160 M120 108 L130 160" />
      <path d="M120 74 L104 98 M120 74 L136 98" />
      <ellipse cx="120" cy="108" rx="26" ry="10" opacity={0.4} />
    </g>
  ),
  'farmer-carry': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={40} />
      <path d="M120 50 V106" />
      <path d="M120 106 L110 160 M120 106 L130 160" />
      <path d="M120 60 L100 104 M120 60 L140 104" />
      <path d="M96 104 L104 104 M136 104 L144 104" strokeWidth={8} />
    </g>
  ),
  burpee: (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M70 154 L78 128" />
      <path d="M78 128 L150 150" />
      <Head cx={66} cy={122} r={9} />
      <path d="M150 150 L176 150" />
      <path d="M120 142 C126 122 126 104 118 92" opacity={0.5} />
    </g>
  ),
  'shoulder-tap': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M84 152 L90 124" />
      <path d="M90 124 L182 150" />
      <Head cx={82} cy={116} r={9} />
      <path d="M96 126 L118 108" />
    </g>
  ),
  'band-pull-apart': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={42} />
      <path d="M120 52 V110" />
      <path d="M120 110 L110 160 M120 110 L130 160" />
      <path d="M120 64 L92 64 M120 64 L148 64" />
      <path d="M92 58 C104 68 136 68 148 58" opacity={0.4} />
    </g>
  ),
  'doorway-stretch': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <line x1="150" y1="160" x2="150" y2="48" stroke="currentColor" strokeWidth={3} opacity={0.4} />
      <Head cx={118} cy={46} />
      <path d="M118 56 V114" />
      <path d="M118 114 L108 160 M118 114 L128 160" />
      <path d="M118 66 L148 60" />
      <path d="M118 74 L146 92" />
    </g>
  ),
  'wall-slide': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <line x1="150" y1="160" x2="150" y2="40" stroke="currentColor" strokeWidth={3} opacity={0.4} />
      <Head cx={140} cy={50} />
      <path d="M140 60 V116" />
      <path d="M140 116 L128 160 M140 116 L148 160" />
      <path d="M140 74 L120 74 L120 56 M140 82 L124 92 L124 108" />
    </g>
  ),
  'thoracic-rotation': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M86 150 L96 122 M96 122 L96 150" />
      <path d="M96 122 L96 150" />
      <path d="M92 150 L150 150" />
      <Head cx={86} cy={116} r={9} />
      <path d="M96 128 L128 108" />
      <path d="M96 134 L120 150" opacity={0.5} />
    </g>
  ),
  'worlds-greatest': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <path d="M84 158 L94 124" />
      <path d="M94 124 L122 124" />
      <path d="M122 124 L176 156" />
      <path d="M94 124 L92 150" />
      <Head cx={90} cy={112} r={9} />
      <path d="M94 118 L96 88" />
    </g>
  ),
  'ankle-circle': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={110} cy={44} />
      <path d="M110 54 V112" />
      <path d="M110 112 L104 152" />
      <path d="M110 112 L128 128 L140 120" />
      <path d="M110 70 L94 96 M110 70 L126 96" />
      <ellipse cx="142" cy="122" rx="12" ry="6" opacity={0.4} />
    </g>
  ),
  'standing-march': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={116} cy={42} />
      <path d="M116 52 V106" />
      <path d="M116 106 L118 158" />
      <path d="M116 106 L102 110 L110 134" />
      <path d="M116 66 L100 92 M116 66 L132 88" />
    </g>
  ),
  'step-touch': (
    <g stroke="currentColor" {...S}>
      <Ground />
      <Head cx={120} cy={44} />
      <path d="M120 54 V108" />
      <path d="M120 108 L100 158 M120 108 L140 158" />
      <path d="M120 66 L98 78 M120 66 L142 78" />
    </g>
  ),
};

/** Poses that read best with a specific tint. */
export const POSE_KEYS = Object.keys(POSE_ART);
