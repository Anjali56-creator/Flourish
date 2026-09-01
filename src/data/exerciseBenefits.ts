/** One-line "why do this" for each exercise, surfaced on cards and detail pages. */
export const EXERCISE_BENEFIT: Record<string, string> = {
  'e-bodyweight-squat': 'Builds lower-body strength for everyday movement like standing and stairs.',
  'e-glute-bridge': 'Wakes up and strengthens the glutes, easing load on the lower back.',
  'e-wall-sit': 'Builds quad and glute endurance with zero impact on the joints.',
  'e-lunges': 'Strengthens each leg individually and improves balance and coordination.',
  'e-calf-raise': 'Strengthens the calves and supports ankle stability for walking and running.',
  'e-plank': 'Builds deep core and shoulder stability that supports better posture.',
  'e-dead-bug': 'Teaches the core to stay stable while the arms and legs move — safe for the back.',
  'e-bird-dog': 'Strengthens the core and lower back while training balanced, controlled movement.',
  'e-crunch': 'Targets the abs and obliques with a controlled, low-equipment movement.',
  'e-pushup': 'Builds upper-body pushing strength and full-body tension in one move.',
  'e-incline-pushup': 'An accessible push-up that builds chest and arm strength without full load.',
  'e-superman': 'Strengthens the whole back of the body to counter hours of sitting.',
  'e-band-pull-apart': 'Strengthens the upper back and rear shoulders to open rounded posture.',
  'e-doorway-stretch': 'Opens a chest tightened by screens and desk work.',
  'e-scapular-wall-slide': 'Improves shoulder-blade control and overhead mobility.',
  'e-jumping-jacks': 'A simple full-body cardio burst to raise the heart rate and warm up.',
  'e-high-knees': 'Raises the heart rate fast while activating the hip flexors and core.',
  'e-mountain-climbers': 'Combines core stability with a cardio challenge in one movement.',
  'e-step-touch': 'A joint-friendly way to get moving and lift energy with low impact.',
  'e-side-lunge': 'Opens and strengthens the inner thighs and hips through side-to-side motion.',
  'e-hip-thrust': 'Builds strong glutes with more range than a bridge.',
  'e-clamshell': 'Targets the side glutes that stabilise the hips and knees.',
  'e-hip-circles': 'A gentle mobility drill to loosen hips stiffened by sitting.',
  'e-ankle-circles': 'Restores ankle range for squatting, balance and everyday movement.',
  'e-worlds-greatest': 'One move that opens the hips, hamstrings, spine and shoulders together.',
  'e-thoracic-rotation': 'Restores rotation to a stiff upper back from desk posture.',
  'e-farmer-carry': 'Builds grip, core and posture strength by simply carrying load and walking tall.',
  'e-burpee': 'A full-body strength-and-cardio move; use the step version for low impact.',
  'e-shoulder-taps': 'Trains anti-rotation core strength on top of a plank hold.',
  'e-standing-march': 'A gentle, supported way to build hip and core strength and balance.',
  'e-step-up': 'Builds single-leg strength and power using any sturdy step.',
};

export function benefitFor(id: string): string {
  return EXERCISE_BENEFIT[id] ?? 'Builds strength and mobility for everyday movement.';
}
