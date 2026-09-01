import { useEffect, useRef } from 'react';
import { MOTION_META, type MotionKey } from '../../data/motionMap';
import { cx } from '../../lib/utils';

/**
 * A looping, illustrated SVG motion demo.
 *
 * - Standing movements use one rigged stick figure whose limb segments rotate
 *   about their joints via CSS keyframes (squat, lunge, march, reach, twist…).
 * - Positions the upright rig can't show (Cat–Cow, Plank, Cobra, Bridge, Down
 *   Dog, tabletop, lying and seated releases) are drawn directly in their real
 *   orientation as small dedicated scenes, animated with SMIL path/point morphs.
 *
 * Reusable for every exercise and yoga technique — resolve a `motion` key from
 * data with `resolveMotion(id)`.
 */

const RIG_MOTIONS = new Set<MotionKey>([
  'sway',
  'hinge',
  'squat',
  'lunge',
  'march',
  'high-knee',
  'jumping-jack',
  'calf-raise',
  'reach-up',
  'side-bend',
  'twist',
  'neck-stretch',
]);

interface MotionFigureProps {
  motion: MotionKey;
  paused?: boolean;
  className?: string;
}

export function MotionFigure({ motion, paused = false, className }: MotionFigureProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const loop = MOTION_META[motion]?.loop ?? 4;
  const isRig = RIG_MOTIONS.has(motion);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof svg.pauseAnimations !== 'function') return;
    if (paused) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused, motion]);

  return (
    <div
      className={cx('mfx flex w-full items-center justify-center', paused && 'is-paused', className)}
      data-motion={motion}
      style={{ ['--mf-loop' as string]: `${loop}s` }}
    >
      <style>{MOTION_CSS}</style>
      <svg
        ref={svgRef}
        viewBox="0 0 200 210"
        className="h-full w-full text-slate-700 dark:text-white/90"
        role="img"
        aria-label={`Looping demonstration: ${MOTION_META[motion]?.label ?? motion}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {isRig ? <BipedRig /> : <Scene motion={motion} loop={loop} animate={!reduce} />}
      </svg>
    </div>
  );
}

/* ---------------- Standing rig ---------------- */

const seg = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Ground({ y = 202 }: { y?: number }) {
  return <line x1="24" y1={y} x2="176" y2={y} stroke="currentColor" strokeWidth={3} strokeLinecap="round" opacity={0.28} />;
}

function BipedRig() {
  return (
    <g {...seg}>
      <Ground y={202} />
      <g className="mf-fig">
        <g className="mf-legL">
          <line x1="108" y1="120" x2="108" y2="160" />
          <g className="mf-shinL">
            <line x1="108" y1="160" x2="108" y2="200" />
          </g>
        </g>
        <g className="mf-legR">
          <line x1="92" y1="120" x2="92" y2="160" />
          <g className="mf-shinR">
            <line x1="92" y1="160" x2="92" y2="200" />
          </g>
        </g>
        <g className="mf-torso">
          <line x1="100" y1="120" x2="100" y2="62" />
          <g className="mf-head">
            <circle cx="100" cy="46" r="12" fill="currentColor" stroke="none" />
          </g>
          <g className="mf-armL">
            <line x1="110" y1="66" x2="114" y2="92" />
            <g className="mf-forearmL">
              <line x1="114" y1="92" x2="116" y2="118" />
            </g>
          </g>
          <g className="mf-armR">
            <line x1="90" y1="66" x2="86" y2="92" />
            <g className="mf-forearmR">
              <line x1="86" y1="92" x2="84" y2="118" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

/* ---------------- Dedicated scenes ---------------- */

function Scene({ motion, loop, animate }: { motion: MotionKey; loop: number; animate: boolean }) {
  const dur = `${loop}s`;
  const spline = { calcMode: 'spline' as const, keyTimes: '0;0.5;1', keySplines: '0.4 0 0.6 1;0.4 0 0.6 1' };

  switch (motion) {
    case 'cat-cow':
      return (
        <g {...seg}>
          <Ground y={172} />
          <line x1="60" y1="120" x2="60" y2="172" />
          <line x1="140" y1="120" x2="140" y2="172" />
          <path d="M60 120 Q100 96 140 120">
            {animate && (
              <animate attributeName="d" dur={dur} repeatCount="indefinite" {...spline}
                values="M60 120 Q100 88 140 120;M60 120 Q100 132 140 120;M60 120 Q100 88 140 120" />
            )}
          </path>
          <g>
            <line x1="60" y1="120" x2="46" y2="110" />
            <circle cx="44" cy="108" r="11" fill="currentColor" stroke="none" />
            {animate && (
              <animateTransform attributeName="transform" type="translate" dur={dur} repeatCount="indefinite" keyTimes="0;0.5;1" values="0 -10;0 12;0 -10" />
            )}
          </g>
        </g>
      );

    case 'quadruped':
      return (
        <g {...seg}>
          <Ground y={172} />
          <line x1="64" y1="120" x2="64" y2="172" />
          <line x1="138" y1="120" x2="138" y2="172" />
          <line x1="64" y1="104" x2="138" y2="104" />
          <line x1="64" y1="104" x2="50" y2="96" />
          <circle cx="48" cy="94" r="11" fill="currentColor" stroke="none" />
          <line x1="138" y1="104" x2="176" y2="96">
            {animate && <animateTransform attributeName="transform" type="rotate" dur={dur} repeatCount="indefinite" keyTimes="0;0.5;1" values="10 138 104;-8 138 104;10 138 104" />}
          </line>
          <line x1="64" y1="104" x2="26" y2="114">
            {animate && <animateTransform attributeName="transform" type="rotate" dur={dur} repeatCount="indefinite" keyTimes="0;0.5;1" values="-8 64 104;10 64 104;-8 64 104" />}
          </line>
        </g>
      );

    case 'cobra':
      return (
        <g {...seg}>
          <Ground y={172} />
          <line x1="178" y1="164" x2="108" y2="164" />
          <g>
            <line x1="108" y1="164" x2="90" y2="128" />
            <circle cx="84" cy="120" r="11" fill="currentColor" stroke="none" />
            <line x1="98" y1="164" x2="88" y2="138" />
            {animate && <animateTransform attributeName="transform" type="rotate" dur={dur} repeatCount="indefinite" keyTimes="0;0.5;1" values="0 108 164;-24 108 164;0 108 164" />}
          </g>
        </g>
      );

    case 'prone-lift':
      return (
        <g {...seg}>
          <Ground y={172} />
          <polyline points="56 150 84 158 120 162 152 158 178 150">
            {animate && (
              <animate attributeName="points" dur={dur} repeatCount="indefinite" {...spline}
                values="56 150 84 158 120 162 152 158 178 150;54 132 84 154 120 160 152 154 178 132;56 150 84 158 120 162 152 158 178 150" />
            )}
          </polyline>
          <circle cx="46" cy="146" r="11" fill="currentColor" stroke="none" />
        </g>
      );

    case 'plank':
      return (
        <g {...seg}>
          <Ground y={172} />
          <g>
            <line x1="52" y1="150" x2="80" y2="150" />
            <line x1="80" y1="150" x2="90" y2="130" />
            <polyline points="90 130 140 148 180 158" />
            <circle cx="46" cy="146" r="11" fill="currentColor" stroke="none" />
            {animate && <animateTransform attributeName="transform" type="translate" dur={dur} repeatCount="indefinite" keyTimes="0;0.5;1" values="0 0;0 3;0 0" />}
          </g>
        </g>
      );

    case 'pushup':
      return (
        <g {...seg}>
          <Ground y={172} />
          <line x1="52" y1="150" x2="70" y2="150" />
          <polyline points="70 150 90 132 140 150 180 158">
            {animate && (
              <animate attributeName="points" dur={dur} repeatCount="indefinite" {...spline}
                values="70 150 90 132 140 150 180 158;70 150 90 152 140 158 180 160;70 150 90 132 140 150 180 158" />
            )}
          </polyline>
          <g>
            <circle cx="46" cy="128" r="11" fill="currentColor" stroke="none" />
            {animate && <animateTransform attributeName="transform" type="translate" dur={dur} repeatCount="indefinite" keyTimes="0;0.5;1" values="0 0;0 20;0 0" />}
          </g>
        </g>
      );

    case 'bridge':
      return (
        <g {...seg}>
          <Ground y={178} />
          <circle cx="152" cy="172" r="11" fill="currentColor" stroke="none" />
          <polyline points="150 174 118 168 92 160 74 178">
            {animate && (
              <animate attributeName="points" dur={dur} repeatCount="indefinite" {...spline}
                values="150 174 118 170 92 164 74 178;150 174 118 126 92 126 74 178;150 174 118 170 92 164 74 178" />
            )}
          </polyline>
        </g>
      );

    case 'downdog':
      return (
        <g {...seg}>
          <Ground y={178} />
          <polyline points="52 178 120 84 178 178">
            {animate && (
              <animate attributeName="points" dur={dur} repeatCount="indefinite" {...spline}
                values="52 178 120 84 178 178;52 178 112 70 172 178;52 178 120 84 178 178" />
            )}
          </polyline>
          <circle cx="76" cy="140" r="10" fill="currentColor" stroke="none" />
        </g>
      );

    case 'supine':
      return (
        <g {...seg}>
          <Ground y={172} />
          <line x1="52" y1="166" x2="150" y2="166" />
          <circle cx="42" cy="166" r="11" fill="currentColor" stroke="none" />
          <g>
            <polyline points="122 166 106 132 124 118" />
            {animate && <animateTransform attributeName="transform" type="rotate" dur={dur} repeatCount="indefinite" keyTimes="0;0.25;0.75;1" values="0 122 166;12 122 166;-12 122 166;0 122 166" />}
          </g>
        </g>
      );

    case 'seated':
    default:
      return (
        <g {...seg}>
          <Ground y={178} />
          <path d="M84 178 L150 178 L120 150 Z" />
          <g className="mf-seat">
            <line x1="120" y1="150" x2="120" y2="96" />
            <circle cx="120" cy="82" r="12" fill="currentColor" stroke="none" />
            <line x1="120" y1="112" x2="100" y2="146" />
            <line x1="120" y1="112" x2="140" y2="146" />
          </g>
        </g>
      );
  }
}

/* ---------------- keyframes (rig only) ---------------- */

const MOTION_CSS = `
.mfx svg * { transform-box: view-box; }
.mfx .mf-fig { transform-origin: 100px 202px; }
.mfx .mf-legL { transform-origin: 108px 120px; }
.mfx .mf-shinL { transform-origin: 108px 160px; }
.mfx .mf-legR { transform-origin: 92px 120px; }
.mfx .mf-shinR { transform-origin: 92px 160px; }
.mfx .mf-torso { transform-origin: 100px 120px; }
.mfx .mf-head { transform-origin: 100px 60px; }
.mfx .mf-armL { transform-origin: 110px 66px; }
.mfx .mf-forearmL { transform-origin: 114px 92px; }
.mfx .mf-armR { transform-origin: 90px 66px; }
.mfx .mf-forearmR { transform-origin: 86px 92px; }
.mfx .mf-seat { transform-origin: 120px 178px; }
.mfx [class*="mf-"] { animation-duration: var(--mf-loop); animation-timing-function: cubic-bezier(.4,0,.6,1); animation-iteration-count: infinite; }
.mfx.is-paused [class*="mf-"] { animation-play-state: paused; }

@keyframes mf-breathe { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.03); } }
@keyframes mf-swayfig { 0%,100% { transform: rotate(-1.6deg); } 50% { transform: rotate(1.6deg); } }
.mfx[data-motion="sway"] .mf-fig { animation-name: mf-swayfig; }
.mfx[data-motion="sway"] .mf-torso { animation-name: mf-breathe; }

.mfx[data-motion="seated"] .mf-seat { animation-name: mf-seatsway; }
@keyframes mf-seatsway { 0%,100% { transform: rotate(-2deg) scaleY(1); } 50% { transform: rotate(2deg) scaleY(1.03); } }

@keyframes mf-squat-fig { 0%,100% { transform: translateY(0); } 50% { transform: translateY(28px); } }
@keyframes mf-squat-torso { 0%,100% { transform: rotate(0); } 50% { transform: rotate(12deg); } }
@keyframes mf-squat-thighL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(20deg); } }
@keyframes mf-squat-thighR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-20deg); } }
@keyframes mf-squat-shinL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-20deg); } }
@keyframes mf-squat-shinR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(20deg); } }
@keyframes mf-squat-armL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(76deg); } }
@keyframes mf-squat-armR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-76deg); } }
.mfx[data-motion="squat"] .mf-fig { animation-name: mf-squat-fig; }
.mfx[data-motion="squat"] .mf-torso { animation-name: mf-squat-torso; }
.mfx[data-motion="squat"] .mf-legL { animation-name: mf-squat-thighL; }
.mfx[data-motion="squat"] .mf-legR { animation-name: mf-squat-thighR; }
.mfx[data-motion="squat"] .mf-shinL { animation-name: mf-squat-shinL; }
.mfx[data-motion="squat"] .mf-shinR { animation-name: mf-squat-shinR; }
.mfx[data-motion="squat"] .mf-armL { animation-name: mf-squat-armL; }
.mfx[data-motion="squat"] .mf-armR { animation-name: mf-squat-armR; }

@keyframes mf-hinge-torso { 0%,100% { transform: rotate(0); } 50% { transform: rotate(72deg); } }
@keyframes mf-hinge-armL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-60deg); } }
@keyframes mf-hinge-armR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(60deg); } }
@keyframes mf-hinge-head { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-26deg); } }
.mfx[data-motion="hinge"] .mf-torso { animation-name: mf-hinge-torso; }
.mfx[data-motion="hinge"] .mf-armL { animation-name: mf-hinge-armL; }
.mfx[data-motion="hinge"] .mf-armR { animation-name: mf-hinge-armR; }
.mfx[data-motion="hinge"] .mf-head { animation-name: mf-hinge-head; }

@keyframes mf-lunge-fig { 0%,100% { transform: translateY(0); } 50% { transform: translateY(22px); } }
@keyframes mf-lunge-thighL { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(-26deg); } }
@keyframes mf-lunge-shinL { 0%,100% { transform: rotate(8deg); } 50% { transform: rotate(24deg); } }
@keyframes mf-lunge-thighR { 0%,100% { transform: rotate(8deg); } 50% { transform: rotate(28deg); } }
@keyframes mf-lunge-shinR { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(-46deg); } }
.mfx[data-motion="lunge"] .mf-fig { animation-name: mf-lunge-fig; }
.mfx[data-motion="lunge"] .mf-legL { animation-name: mf-lunge-thighL; }
.mfx[data-motion="lunge"] .mf-shinL { animation-name: mf-lunge-shinL; }
.mfx[data-motion="lunge"] .mf-legR { animation-name: mf-lunge-thighR; }
.mfx[data-motion="lunge"] .mf-shinR { animation-name: mf-lunge-shinR; }

@keyframes mf-march-thighL { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-44deg); } 50% { transform: rotate(0); } }
@keyframes mf-march-shinL { 0%,100% { transform: rotate(0); } 25% { transform: rotate(44deg); } 50% { transform: rotate(0); } }
@keyframes mf-march-thighR { 0%,50% { transform: rotate(0); } 75% { transform: rotate(-44deg); } 100% { transform: rotate(0); } }
@keyframes mf-march-shinR { 0%,50% { transform: rotate(0); } 75% { transform: rotate(44deg); } 100% { transform: rotate(0); } }
@keyframes mf-march-armL { 0%,100% { transform: rotate(0); } 25% { transform: rotate(28deg); } 50% { transform: rotate(0); } }
@keyframes mf-march-armR { 0%,50% { transform: rotate(0); } 75% { transform: rotate(-28deg); } 100% { transform: rotate(0); } }
@keyframes mf-march-fig { 0%,100% { transform: translateY(0); } 25%,75% { transform: translateY(-4px); } }
.mfx[data-motion="march"] .mf-fig { animation-name: mf-march-fig; }
.mfx[data-motion="march"] .mf-legL { animation-name: mf-march-thighL; }
.mfx[data-motion="march"] .mf-shinL { animation-name: mf-march-shinL; }
.mfx[data-motion="march"] .mf-legR { animation-name: mf-march-thighR; }
.mfx[data-motion="march"] .mf-shinR { animation-name: mf-march-shinR; }
.mfx[data-motion="march"] .mf-armL { animation-name: mf-march-armL; }
.mfx[data-motion="march"] .mf-armR { animation-name: mf-march-armR; }

@keyframes mf-hk-thighL { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-74deg); } 50% { transform: rotate(0); } }
@keyframes mf-hk-thighR { 0%,50% { transform: rotate(0); } 75% { transform: rotate(-74deg); } 100% { transform: rotate(0); } }
@keyframes mf-hk-shinL { 0%,100% { transform: rotate(0); } 25% { transform: rotate(64deg); } 50% { transform: rotate(0); } }
@keyframes mf-hk-shinR { 0%,50% { transform: rotate(0); } 75% { transform: rotate(64deg); } 100% { transform: rotate(0); } }
.mfx[data-motion="high-knee"] .mf-fig { animation-name: mf-march-fig; }
.mfx[data-motion="high-knee"] .mf-legL { animation-name: mf-hk-thighL; }
.mfx[data-motion="high-knee"] .mf-shinL { animation-name: mf-hk-shinL; }
.mfx[data-motion="high-knee"] .mf-legR { animation-name: mf-hk-thighR; }
.mfx[data-motion="high-knee"] .mf-shinR { animation-name: mf-hk-shinR; }
.mfx[data-motion="high-knee"] .mf-armL { animation-name: mf-march-armL; }
.mfx[data-motion="high-knee"] .mf-armR { animation-name: mf-march-armR; }

@keyframes mf-jj-fig { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes mf-jj-legL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(16deg); } }
@keyframes mf-jj-legR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-16deg); } }
@keyframes mf-jj-armL { 0%,100% { transform: rotate(8deg); } 50% { transform: rotate(155deg); } }
@keyframes mf-jj-armR { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(-155deg); } }
.mfx[data-motion="jumping-jack"] .mf-fig { animation-name: mf-jj-fig; }
.mfx[data-motion="jumping-jack"] .mf-legL { animation-name: mf-jj-legL; }
.mfx[data-motion="jumping-jack"] .mf-legR { animation-name: mf-jj-legR; }
.mfx[data-motion="jumping-jack"] .mf-armL { animation-name: mf-jj-armL; }
.mfx[data-motion="jumping-jack"] .mf-armR { animation-name: mf-jj-armR; }

@keyframes mf-calf-fig { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-13px); } }
.mfx[data-motion="calf-raise"] .mf-fig { animation-name: mf-calf-fig; }
.mfx[data-motion="calf-raise"] .mf-torso { animation-name: mf-breathe; }

@keyframes mf-reach-armL { 0%,100% { transform: rotate(6deg); } 50% { transform: rotate(166deg); } }
@keyframes mf-reach-armR { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(-166deg); } }
.mfx[data-motion="reach-up"] .mf-armL { animation-name: mf-reach-armL; }
.mfx[data-motion="reach-up"] .mf-armR { animation-name: mf-reach-armR; }
.mfx[data-motion="reach-up"] .mf-torso { animation-name: mf-breathe; }

@keyframes mf-sb-torso { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-16deg); } 75% { transform: rotate(16deg); } }
@keyframes mf-sb-armL { 0%,100% { transform: rotate(0); } 25% { transform: rotate(150deg); } 75% { transform: rotate(10deg); } }
@keyframes mf-sb-armR { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(-150deg); } }
.mfx[data-motion="side-bend"] .mf-torso { animation-name: mf-sb-torso; }
.mfx[data-motion="side-bend"] .mf-armL { animation-name: mf-sb-armL; }
.mfx[data-motion="side-bend"] .mf-armR { animation-name: mf-sb-armR; }

@keyframes mf-tw-torso { 0%,100% { transform: scaleX(1); } 25% { transform: scaleX(0.82); } 75% { transform: scaleX(1); } }
@keyframes mf-tw-armL { 0%,100% { transform: rotate(24deg); } 25% { transform: rotate(120deg); } 75% { transform: rotate(-70deg); } }
@keyframes mf-tw-armR { 0%,100% { transform: rotate(-24deg); } 25% { transform: rotate(70deg); } 75% { transform: rotate(-120deg); } }
.mfx[data-motion="twist"] .mf-torso { animation-name: mf-tw-torso; }
.mfx[data-motion="twist"] .mf-armL { animation-name: mf-tw-armL; }
.mfx[data-motion="twist"] .mf-armR { animation-name: mf-tw-armR; }

@keyframes mf-neck-head { 0% { transform: rotate(0); } 15% { transform: rotate(24deg); } 38% { transform: rotate(24deg); } 52% { transform: rotate(0); } 68% { transform: rotate(-24deg); } 90% { transform: rotate(-24deg); } 100% { transform: rotate(0); } }
.mfx[data-motion="neck-stretch"] .mf-head { animation-name: mf-neck-head; }
.mfx[data-motion="neck-stretch"] .mf-torso { animation-name: mf-breathe; }

@media (prefers-reduced-motion: reduce) {
  .mfx [class*="mf-"] { animation: none !important; }
}
`;
