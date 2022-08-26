import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import { PlayIcon, MusicNoteIcon, PauseIcon } from "@heroicons/react/solid";
import { FastForwardIcon, RewindIcon } from "@heroicons/react/solid";
import Profile from "../components/Profile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  playingState,
  playlistIdState,
  playlistState,
  songState,
} from "../../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Song from "../components/Song";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [colour, setColour] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    const colourArr: Array<string> = ["red", "sky", "green", "gray", "purple"];
    const randomNum: number = Math.floor(Math.random() * colourArr.length);
    setColour(colourArr[randomNum]);
  }, [playlistId]);

  useEffect(() => {
    getPlaylist();
  }, [spotifyApi, playlistId]);

  const getPlaylist = () => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data: any) => {
          setPlaylist(data.body);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  };

  const getRecents = () => {
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 20,
      })
      .then(
        function (data) {
          // Output items
          setRecents(data.body.items);
        },
        function (err) {}
      );
  };

  const time = new Date();
  // Playback Functions
  const currentSong = useRecoilValue(songState);
  const [isPlaying, setIsPlaying] = useRecoilState(playingState);
  const [recents, setRecents] = useState(null);
  useEffect(() => {
    getRecents();
  }, [session]);
  return (
    <div className="h-screen w-full bg-black">
      <header className="absolute right-5 top-0 flex h-16 w-11/12 items-center justify-end">
        <Profile />
      </header>
      <main
        className={`flex h-full bg-gradient-to-b from-${colour}-300 via-transparent`}
      >
        <div className="scrollbar-hide absolute bottom-28 h-full w-full overflow-auto scroll-smooth bg-black bg-opacity-60 pl-52	">
          {playlist ? (
            <>
              <div className="mt-52 flex h-40 pl-10">
                {playlist?.images[0] ? (
                  <img
                    src={playlist?.images[0]?.url}
                    alt={playlist?.name}
                    className="h-full"
                  />
                ) : (
                  <div className="grid h-full w-40 place-items-center rounded bg-black bg-opacity-50">
                    <MusicNoteIcon className="p-10 text-white" />
                  </div>
                )}

                <h1 className="ml-10 h-1/2 self-center text-6xl font-bold text-white">
                  {playlist?.name}
                </h1>
              </div>
              <div className="h-96 w-full pl-10 pt-20">
                {playlist.tracks.items.map((song) => {
                  if (song.track.id) {
                    return <Song song={song} key={song.track.id} />;
                  }
                })}
              </div>
            </>
          ) : (
            <div className="mt-32 ml-10 grid h-40 pl-10 text-white">
              <h1 className=" h-1/2 text-6xl font-bold ">
                {/* {time.getHours() > 12 ? "Good Afternoon" : "Good Morning"} */}
                Recently Played
              </h1>
              <h2 className="pl-5 pb-5">
                Instructions: <br />
                <ul className="list-disc text-gray-200">
                  <li>
                    Make Sure spotify is loaded and has played a song recently
                  </li>
                  <li>Browse playlist on right-side menu</li>
                  <li></li>
                </ul>
              </h2>
              {recents ? (
                <div className="pt-5">
                  {recents.map((song) => {
                    if (song.track.id) {
                      return <Song song={song} key={song.track.id} />;
                    }
                  })}
                </div>
              ) : null}
            </div>
          )}
        </div>
        <Sidebar />
        {currentSong ? (
          <div className="absolute bottom-3 right-10 z-50 h-52 w-40">
            <img
              src={currentSong.track.album.images[0].url}
              alt=""
              className="rounded"
            />
            <h2 className="absolute right-0 w-max text-right text-xl text-gray-300">
              {currentSong.track.name}
            </h2>
            <h3 className="absolute right-0 bottom-0 w-max text-right text-gray-300">
              {currentSong?.track.artists[0].name}
            </h3>
          </div>
        ) : null}
      </main>
      <footer className="absolute bottom-0 right-0 z-20 flex h-24 w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <RewindIcon
          className="h-10 w-10 text-gray-300 hover:text-white"
          onClick={() => {
            spotifyApi.skipToPrevious();
          }}
        />
        {isPlaying ? (
          <PauseIcon
            className="mx-8 h-10 w-10 text-gray-300 hover:text-white"
            onClick={() => {
              setIsPlaying(false);
              spotifyApi.pause();
            }}
          />
        ) : (
          <PlayIcon
            className="mx-8 h-10 w-10 text-gray-300 hover:text-white"
            onClick={() => {
              setIsPlaying(true);
              spotifyApi.play();
            }}
          />
        )}

        <FastForwardIcon
          className="h-10 w-10 text-gray-300 hover:text-white"
          onClick={() => {
            spotifyApi.skipToNext();
          }}
        />
      </footer>
      <div className="hidden from-green-300 from-red-300 from-sky-300 from-gray-300 from-purple-300"></div>
    </div>
  );
};

export default Home;
