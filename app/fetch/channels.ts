import {
  Channels,
  ChannelContent,
  ChannelsSchema,
  ChannelContentSchema,
} from "@models/channels";
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
  HttpClientError,
} from "@effect/platform";
import { youtubeEntryPoint } from "./const";
import * as E from "effect/Effect";
import { Effect, identity, pipe } from "effect";
import { Cause } from "effect/Cause";
import { Schema } from "@effect/schema";
import { ParseError } from "@effect/schema/ParseResult";
import { supabase } from "@config/supabase";

export type Fetch<T> =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Cause<Error> };

export const fetchAllChannels = (): E.Effect<Channels, Error, never> => {
  const request = () => supabase.from("shop").select("*").throwOnError();

  return pipe(
    E.tryPromise({
      try: () => supabase.from("shop").select("*").throwOnError(),
      catch: (e) => new Error("Failed to fetch channels"),
    }),
    E.flatMap((data) =>
      pipe(
        data.data,
        Schema.decodeUnknown(ChannelsSchema),
        E.mapBoth({
          onFailure: (e) => new Error(e.message),
          onSuccess: identity,
        })
      )
    )
  );
};

export const fetchAllVideosFromChannel = (
  channelId: string
): E.Effect<
  ChannelContent,
  ParseError | HttpClientError.HttpClientError,
  never
> => {
  return HttpClientRequest.get(
    `${youtubeEntryPoint}search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${process.env.EXPO_PUBLIC_YOUTUBE_API_KEY}`
  ).pipe(
    HttpClient.fetch,
    Effect.andThen(HttpClientResponse.schemaBodyJson(ChannelContentSchema)),
    Effect.scoped
  );
};
