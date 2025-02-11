import { ReactElement } from 'react';

export default function SpotifyFrame(): ReactElement {
  return (
    <iframe
      title="Some playlist"
      className="rounded-xl"
      src="https://open.spotify.com/embed/playlist/2WvKikeI3TfwsMBiNYQUjJ?utm_source=generator"
      width="100%"
      height="352"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
