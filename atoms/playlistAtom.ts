import { atom } from "recoil";

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "",
});
export const playlistState = atom({
  key: "playlistState",
  default: "",
});
export const songState = atom({
  key: "songState",
  default: null,
});
export const playingState = atom({ key: "playingState", default: false });
