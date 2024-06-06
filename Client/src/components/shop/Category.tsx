import Image, { StaticImageData } from "next/image";
import { FC } from "react";

type CategoryProps = {
  label: string;
  image: StaticImageData;
};

const Category: FC<CategoryProps> = ({ label, image }) => {
  return (
    <div className="flex flex-col gap-2 flex-wrap cursor-pointer">
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
