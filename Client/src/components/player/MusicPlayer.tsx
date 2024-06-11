import { usePlayerContext } from "@/contexts/PlayerContext";
import { useSideNav } from "@/contexts/SideNavigationContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MusicPlayer = () => {
  const { isExpanded } = useSideNav();
  const { url, setUrl } = usePlayerContext();

  const baseUrl = `${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/mp3`;
  const extension = ".mp3";

  const songName = url?.substring(
    baseUrl.length + 1,
    url.length - extension.length
  );

  return (
    <div className="bg-dark h-[10vh] w-full flex flex-row flex-wrap justify-center pb-4 px-4">
      <div
        className={`h-10 w-full bg-pink text-white rounded-t-md flex justify-center items-center font-bold transition-all duration-300 ease-in-out  ${
          !isExpanded ? "max-w-[1518px]" : "max-w-[1677px]"
        }`}
      >
        {songName && <span>Currently playing - "{songName}"</span>}
      </div>

      <div
        className={`border-pink border rounded-md rounded-t-none border-solid h-[calc(100% - 16px)] w-full ease-in-out duration-300 custom-audio-player ${
          !isExpanded ? "max-w-[1518px]" : "max-w-[1677px]"
        }`}
      >
        <AudioPlayer
          className="h-full"
          src={url || ""}
          onEnded={() => setUrl("")}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
