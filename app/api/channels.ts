import {
  ChannelContent,
  ChannelContentSchema,
  Channels,
  ChannelsSchema,
} from "@models/channels";
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
  HttpClientError,
} from "@effect/platform";
import { youtubeEntryPoint } from "./const";
import * as E from "effect/Effect";
import { Effect, pipe } from "effect";
import { ParseResult, Schema } from "@effect/schema";
import { match, P } from "ts-pattern";
import { PostgrestError } from "@supabase/supabase-js";

export type FetchAllChannels = E.Effect<
  Channels,
  PostgrestError | Error | ParseResult.ParseError,
  never
>;

export const fetchAllChannels: FetchAllChannels = pipe(
  E.promise(() => ),
  E.andThen(({ status, error, data }) =>
    match([status, data, error] as const)
      .with([200, P.nonNullable, P.nullish], ([_status, data]) =>
        E.succeed(data)
      )
      .with([P.number, P.nullish, P.nonNullable], ([_status, _data, error]) =>
        E.fail(error)
      )
      .otherwise(() => E.fail(new Error("unknown error")))
  ),
  E.flatMap((data) => pipe(data, Schema.decodeUnknown(ChannelsSchema)))
);

export const fetchAllVideosFromChannel = (
  channelId: string
): E.Effect<
  ChannelContent,
  ParseResult.ParseError | HttpClientError.HttpClientError,
  never
> => {
  return HttpClientRequest.get(
    `${youtubeEntryPoint}search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${process.env.EXPO_PUBLIC_YOUTUBE_API_KEY}`
  ).pipe(
    HttpClient.fetch,
    Effect.flatMap(HttpClientResponse.schemaBodyJson(ChannelContentSchema)),
    Effect.scoped
  );
};
