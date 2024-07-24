import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "@config/firebase";
import { pipe, identity, flow } from "fp-ts/function";
import { channelContent, channels, ChannelsContent } from "@models/channels";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { failure, RemoteData, success } from "@devexperts/remote-data-ts";
import { youtubeEntryPoint } from "./const";

export const fetchAllChannels = async () =>
  await pipe(
    collection(firestoreDb, "shops"),
    (collection) =>
      TE.tryCatch(
        () => getDocs(collection),
        () => failure(new Error("fetch error"))
      ),
    TE.map((shopsSnapshots) => shopsSnapshots.docs.map((doc) => doc.data())),
    TE.match(
      identity,
      flow(
        channels.decode,
        E.matchW(() => failure(new Error("decode error")), success)
      )
    )
  )();

export const fetchChannelVideos = (channelId: string): Promise<RemoteData<Error, ChannelsContent>> => {
  const operation = fetch(
    `${youtubeEntryPoint}search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${process.env.EXPO_PUBLIC_YOUTUBE_API_KEY}`
  );

  return pipe(
    TE.tryCatch(
      () => operation.then((res) => res.json()),
      () => failure(new Error("fetch error"))
    ),
    TE.match(
      identity,
      flow(
        channelContent.decode,
        E.matchW(() => failure(new Error("decode error")), success)
      )
    )
  )();
};
