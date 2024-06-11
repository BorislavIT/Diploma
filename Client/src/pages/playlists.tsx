import { usePlayerContext } from "@/contexts/PlayerContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Mp3File } from "@/components/shop/useMp3s";
import usePlaylist from "@/components/playlist/usePlaylist";
import Track from "@/components/shop/Track";
import useRemovePlaylistMp3 from "@/components/shop/useRemovePlaylistMp3";
import { combineMp3PathWithFile } from "@/shared/utilities";
import { useToast } from "@/contexts/ToastContext";

const Playlists = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutate = useRemovePlaylistMp3();
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const { url } = usePlayerContext();
  const { data } = usePlaylist();

  const initialUrlRef = useRef(url);

  const onRemoveMp3FromPlaylist = async (mp3: Mp3File) => {
    try {
      await mutate.mutateAsync(mp3);
      queryClient.invalidateQueries({
        queryKey: ["getPlaylist", global.isAuthorized],
      });
      toast.success(`Successfully removed ${mp3.name} from your playlist.`);
    } catch (error) {
      toast.error((error as any).response?.data?.error as string);
    }
  };

  useEffect(() => {
    if (!url) {
      const timeoutId = setTimeout(() => {
        if (!initialUrlRef.current) {
          if (currentSongIndex + 1 <= (data?.mp3s?.length ?? 0)) {
            setCurrentSongIndex(currentSongIndex + 1);
          }
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [url]);

  useEffect(() => {
    initialUrlRef.current = url;
  }, [url]);

  return (
    <div className="container mx-auto p-6 gap-4 flex flex-col flex-wrap">
      <h1 className="text-3xl font-bold mb-6">Playlist</h1>
      {data?.mp3s?.length === 0 && <span>Your playlist is empty.</span>}
      {data?.mp3s.map((mp3, index) => {
        const showBorder = url === combineMp3PathWithFile(mp3.name + ".mp3");

        return (
          <div
            key={mp3.id}
            className={`w-full flex flex-row flex-nowrap justify-between items-center ${
              showBorder && "border-b border-solid border-pink"
            }`}
          >
            <div>
              <Track
                mp3={mp3}
                height={64}
                width={64}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                index={index}
              />
            </div>
            <div>
              <i
                className="pi pi-trash pi-xl cursor-pointer"
                onClick={() => onRemoveMp3FromPlaylist(mp3)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Playlists;
