import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
function Sidebar() {
  const [playlist, setPlaylists] = useState([]);
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="scrollbar-hide relative z-30 h-full overflow-auto bg-black bg-opacity-60 text-sm backdrop-blur-sm">
      <div className="p-5 text-gray-300">
        <button className="flex items-center space-x-2 p-3 hover:text-white">
          <HomeIcon className="h-5 w-5" onClick={() => {}} />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 p-3 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <button className="flex items-center space-x-2 p-3 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <hr className="border-t-[0.5px]" />
      </div>
      <div className="p-5 text-sm text-gray-300">
        <button className="flex items-center space-x-2 p-3 hover:text-white ">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 p-3 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <button className="flex items-center space-x-2 p-3 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <hr className="border-t-[0.5px]" />
      </div>
      {playlist.map((playlist) => {
        return (
          <div className="p-5 text-gray-300 hover:text-white" key={playlist.id}>
            <p
              className="cursor-pointer"
              onClick={() => setPlaylistId(playlist.id)}
            >
              {playlist.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
