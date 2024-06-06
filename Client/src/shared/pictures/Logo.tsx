import Headphones from "./headphones.jpg";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      priority={true}
      src={Headphones.src}
      alt="Headphones logo"
      style={{ width: "auto", height: "auto" }}
      width={200}
      height={200}
    />
  );
};

export default Logo;
