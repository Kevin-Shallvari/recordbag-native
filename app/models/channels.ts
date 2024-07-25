import * as t from "io-ts";
import { Schema } from "@effect/schema";

export const ChannelSchema = Schema.Struct({
  id: Schema.String,
  thumbnail: Schema.String,
  title: Schema.String,
});

export const ChannelsSchema = Schema.Array(ChannelSchema);
export type Channels = Schema.Schema.Type<typeof ChannelsSchema>;

export const channelContent = t.type({
  nextPageToken: t.string,
  regionCode: t.string,
  items: t.readonlyArray(
    t.type({
      id: t.type({
        videoId: t.string,
      }),
      snippet: t.type({
        title: t.string,
        thumbnails: t.type({
          default: t.type({
            url: t.string,
          }),
        }),
      }),
    })
  ),
});

export type ChannelsContent = t.TypeOf<typeof channelContent>;
