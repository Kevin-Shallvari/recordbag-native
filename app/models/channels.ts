import { Schema } from "@effect/schema";

export const ChannelSchema = Schema.Struct({
  id: Schema.String,
  thumbnail: Schema.String,
  title: Schema.String,
});

export const ChannelsSchema = Schema.Array(ChannelSchema);
export type Channels = Schema.Schema.Type<typeof ChannelsSchema>;

export const ChannelContentSchema = Schema.Struct({
  nextPageToken: Schema.String,
  regionCode: Schema.String,
  items: Schema.Array(
    Schema.Struct({
      id: Schema.Struct({
        videoId: Schema.String,
      }),
      snippet: Schema.Struct({
        title: Schema.String,
        thumbnails: Schema.Struct({
          default: Schema.Struct({
            url: Schema.String,
          }),
        }),
      }),
    })
  )
});



export type ChannelContent = Schema.Schema.Type<typeof ChannelContentSchema>;
