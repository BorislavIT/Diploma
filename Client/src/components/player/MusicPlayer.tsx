import { usePlayerContext } from "@/contexts/PlayerContext";
import { useSideNav } from "@/contexts/SideNavigationContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MusicPlayer = () => {
  const { isExpanded } = useSideNav();
  const { url } = usePlayerContext();

  return (
    <div className="bg-dark h-[10vh] w-full flex flex-row justify-center pb-4 px-4">
      <div
        className={`border-pink border rounded-md border-solid h-[calc(100% - 16px)] w-full ease-in-out duration-300 custom-audio-player ${
          !isExpanded ? "max-w-[1518px]" : "max-w-[1677px]"
        }`}
      >
        <AudioPlayer
          autoPlay
          className="h-full"
          src={url || ""}
          onPlay={(e) => console.log("onPlay")}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
