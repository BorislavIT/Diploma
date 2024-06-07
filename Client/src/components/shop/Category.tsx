import Image, { StaticImageData } from "next/image";
import { FC } from "react";

type CategoryProps = {
  label: string;
  image: StaticImageData;
  toggleCategory: () => void;
  isSelected: boolean;
};

const Category: FC<CategoryProps> = ({
  label,
  image,
  toggleCategory,
  isSelected,
}) => {
  return (
    <div
      className={`flex flex-col gap-2 flex-wrap cursor-pointer p-2 border-b-2 border-solid ${
        isSelected ? " border-pink" : "border-transparent"
      }`}
      onClick={toggleCategory}
    >
      <Image
        priority={true}
        src={image.src}
        alt="Headphones logo"
        style={{ width: 200, height: 200 }}
        width={200}
        height={200}
      />
      <span>{label}</span>
    </div>
  );
};

export default Category;
