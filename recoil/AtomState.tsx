import { atom } from "recoil";
import { MovieType } from "types/MovieType";
export const modalState = atom({
  key: "modalState",
  default: false,
});

export const movieState = atom<MovieType | null>({
  key: "movieState",
  default: null,
});

