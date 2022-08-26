import { useRecoilState } from "recoil";
import { playingState, songState } from "../../atoms/playlistAtom";
import spotifyApi from "../../lib/spotify";

const Song = ({ song }: any) => {
  const artists = song.track.artists.map((artist) => {
    return artist.name + ", ";
  });
  const min = Math.floor(song.track.duration_ms / 1000 / 60);
  let sec: number | string = Math.floor(
    song.track.duration_ms / 1000 - min * 60
  );
  if (sec < 10) {
    sec = "0" + sec.toString();
  }
  const [currentSong, setCurrentSong] = useRecoilState(songState);
  const [isPlaying, setIsPlaying] = useRecoilState(playingState);

  const playSong = () => {
    setCurrentSong(song);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [song.track.uri],
    });
  };
  return (
    <div
      className="custom-grid-template mb-5 grid h-16 w-11/12 grid-cols-4 items-center rounded-xl pl-5 text-white hover:bg-gray-200 hover:bg-opacity-5"
      onClick={() => {
        playSong();
      }}
    >
      <div className="grid h-full w-full place-items-center pb-4">
        <img
          src={song.track.album.images[1].url}
          alt="Album Cover"
          width={56}
          height={56}
          className="h-14 w-14 rounded"
        />
      </div>
      <div className="test-gray-300 grid h-20 grid-cols-1">
        <p className="h-3">{song.track.name}</p>

        <p className="flex text-gray-300">
          {song.track.explicit ? (
            <span className="mr-1 grid h-fit w-5 place-items-center rounded bg-white bg-opacity-10 text-black hover:bg-red-200 hover:bg-opacity-20">
              E
            </span>
          ) : null}

          {song.track.artists.length > 1 ? artists : song.track.artists[0].name}
        </p>
      </div>
      <p className="h-full px-10 text-gray-300">{song.track.album.name}</p>
      <p className="h-full">
        {min}:{sec}
      </p>
    </div>
  );
};

export default Song;
