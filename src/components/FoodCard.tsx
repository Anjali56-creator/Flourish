import type { Food } from '../types';

const GROUP_ICON: Record<Food['group'], string> = { Energy: '⚡', Wellness: '🌿', Lifestyle: '🍽️' };

export function FoodCard({ food }: { food: Food }) {
  return (
    <div className="card-hover animate-fade-up flex flex-col p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-2xl" aria-hidden>{GROUP_ICON[food.group]}</span>
        <span className="chip !py-1 !text-[11px]">{food.category}</span>
      </div>
      <h3 className="mb-1 text-base font-bold leading-snug">{food.name}</h3>
      <p className="mb-3 text-xs text-soft">Best: {food.bestTime}</p>

      <div className="mb-3 grid grid-cols-4 gap-1 rounded-xl surface-2 p-2 text-center text-[11px]">
        <div><p className="font-bold">{food.calories}</p><p className="text-soft">kcal</p></div>
        <div><p className="font-bold">{food.protein}g</p><p className="text-soft">protein</p></div>
        <div><p className="font-bold">{food.carbs}g</p><p className="text-soft">carbs</p></div>
        <div><p className="font-bold">{food.fat}g</p><p className="text-soft">fat</p></div>
      </div>

      <p className="mb-2 text-xs text-soft"><span className="font-semibold text-current">Key nutrients: </span>{food.keyNutrients.join(', ')}</p>
      <p className="mb-2 text-xs text-soft"><span className="font-semibold text-current">Serving: </span>{food.serving}</p>
      <p className="text-xs text-soft"><span className="font-semibold text-current">Prep: </span>{food.prep}</p>
    </div>
  );
}
