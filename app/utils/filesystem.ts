import { FileSystem } from "@effect/platform";

const downloadVideo = async (url: string) => {
  const video = await fetch(url);
  const blob = await video.blob();
  return new File([blob], "video.mp4", { type: "video/mp4" });
};
