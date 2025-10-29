import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function StarRating({ label, value, onChange }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-700">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoverValue || value)
                  ? "fill-[#00A6ED] text-[#00A6ED]"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        <span className="ml-3 text-gray-600">{value > 0 ? `${value}/5` : "Chưa đánh giá"}</span>
      </div>
    </div>
  );
}
