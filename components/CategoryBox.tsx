"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { useListings } from "@/app/providers/ListingProvider";
interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onCategoryClick: (label: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onCategoryClick,
}) => {
  const { activeCategory, setActiveCategory } = useListings();

  const handleCategoryClick = () => {
    setActiveCategory(label);
    onCategoryClick(label);
  };
  const router = useRouter();
  const params = useSearchParams();
  return (
    <div
      onClick={handleCategoryClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        border-zinc-400
        hover:text-zinc-200
        transition
        cursor-pointer
        ${selected ? "border-b-zinc-200" : "border-transparent"}
        ${selected ? "text-zinc-200" : "text-zinc-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
