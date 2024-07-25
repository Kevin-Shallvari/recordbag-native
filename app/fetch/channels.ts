import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "@config/firebase";
import {
  channelContent,
  Channels,
  channels,
  ChannelsContent,
  ChannelsSchema,
} from "@models/channels";

import * as TE from "fp-ts/TaskEither";
import { youtubeEntryPoint } from "./const";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { match, P } from "ts-pattern";
import * as E from "effect/Effect";
import { identity, Effect, flow, Either, pipe } from "effect";
import { Schema } from "@effect/schema";

export type Fetch<T> =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export const fetchAllChannels = async (): Promise<
  Effect.Effect<Channels, Error>
> => {
  const x = pipe(
    E.try({
      try: () =>
        getDocs(collection(firestoreDb, "shops")).then((res) =>
          res.docs.map((doc) => doc.data())
        ),
      catch: () => new Error("fetch error"),
    }),
    E.map(
      flow(
        Schema.decodeEither(ChannelsSchema),
        E.match({
          onFailure: () => E.fail(new Error("decode error")),
          onSuccess: E.succeed,
        })
      )
    )
  );

  return x;

  /* await pipe(
    collection(firestoreDb, "shops"),
    (collection) =>
      TE.tryCatch(
        () => getDocs(collection),
        () => ({
          status: "error" as const,
          error: new Error("fetch error"),
        })
      ),
    TE.map((shopsSnapshots) => shopsSnapshots.docs.map((doc) => doc.data())),
    TE.match(
      identity,
      flow(
        channels.decode,
        E.matchW(
          () => ({
            status: "error" as const,
            error: new Error("decode error"),
          }),
          (data) => ({ status: "success" as const, data })
        )
      )
    )
  ); */
};

export const useFetchChannelVideos = (
  channelId: string
): Fetch<ChannelsContent> => {
  const [queryState, setQueryState] = useState<Fetch<ChannelsContent>>({
    status: "initial",
  });

  const query = useQuery({
    queryKey: ["videos", channelId],
    queryFn: () =>
      fetch(
        `${youtubeEntryPoint}search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${process.env.EXPO_PUBLIC_YOUTUBE_API_KEY}`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    const result = match<
      UseQueryResult<Response, Error>,
      Fetch<ChannelsContent>
    >(query)
      .with({ status: "pending" }, () => ({
        status: "loading",
      }))
      .with({ status: "error" }, (e) => ({
        status: "error",
        error: e.error,
      }))
      .with({ status: "success", data: P.nullish }, () => ({
        status: "error",
        error: new Error("fetch error"),
      }))
      .with({ status: "success" }, ({ data }) =>
        pipe(
          data,
          channelContent.decode,
          E.matchW(
            () => ({ status: "error", error: new Error("decode error") }),
            (data) => ({ status: "success", data })
          )
        )
      )
      .exhaustive();

    setQueryState(result);
  }, [query.status]);

  return queryState;
};
