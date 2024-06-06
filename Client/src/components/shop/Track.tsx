import { FC } from "react";
import { Mp3File } from "./useMp3s";
import {
  combineMp3PathWithFile,
  combineThumbnailPathWithFile,
} from "@/shared/utilities";
import { usePlayerContext } from "@/contexts/PlayerContext";

const Track: FC<{ mp3: Mp3File }> = ({ mp3: { thumbnail, name } }) => {
  const { url, setUrl } = usePlayerContext();

  const onTrackClicked = () => {
    // in case we click the same track and we want to replay it
    setUrl("");
    setTimeout(() => {
      setUrl(combineMp3PathWithFile(name));
    }, 50);
  };

  const labelScrolling = url === combineMp3PathWithFile(name);

  return (
    <div
      className="flex flex-col track gap-2 flex-wrap rounded-md border border-solid border-pink p-4 h-72 w-64 overflow-hidden relative cursor-pointer"
      onClick={onTrackClicked}
    >
      <img
        src={combineThumbnailPathWithFile(thumbnail)}
        alt="Description of image"
        style={{
          maxWidth: 224,
          maxHeight: 190,
          minWidth: 224,
          minHeight: 190,
        }}
      />
      <span
        className={`${
          labelScrolling
            ? "scrolling-text"
            : "text-nowrap max-w-[224px] overflow-hidden"
        }`}
      >
        {name.split(".mp3")[0]}
      </span>
      <span>5.44$</span>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 flex justify-center items-center hover:opacity-100">
        <div className="bg-white rounded shadow-lg text-pink py-2 px-4 text-center">
          <i className="pi pi-play text-3xl pr-1 mr-[-9px]" />
        </div>
      </div>
    </div>
  );
};

export default Track;
