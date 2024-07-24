import * as t from "io-ts";

export const channel = t.type({
  id: t.string,
  thumbnail: t.string,
  title: t.string,
});

export const channels = t.readonlyArray(channel);
export type Channels = t.TypeOf<typeof channels>;

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
