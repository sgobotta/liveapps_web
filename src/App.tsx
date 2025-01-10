import livedj from './svg/live-dj-iso-black.svg';
import { ReactComponent as Octocat } from './svg/github.svg';
import './App.css';
import useImages from './hooks/tile-game/useImages';

import { takeSome } from './utils';

import { useTileAsset } from './hooks/tile-game/useTileAsset';
import { TileAsset as TileAssetT } from './types';
import { ReactElement } from 'react';
import ApplicationSelection from './components/app-selection/ApplicationSelection';

function App() {
  return (
    <div className="App h-screen max-h-screen overflow-y-hidden">
      <header
        className="
        App-header absolute w-full z-40
      "
      >
        <a href="https://dj.liveapps.com.ar" target="_blank" rel="noreferrer">
          <div
            className="
              transition duration-500
              animate-fade-right animate-infinite animate-duration-[5000ms] animate-ease-in-out animate-alternate animate-fill-forwards
              h-20 w-20
              hover:animate-pulse
              backdrop-filter backdrop-invert hover:backdrop-brightness-150 hover:backdrop-blur-3xl backdrop-blur-md
              -translate-x-4 hover:-translate-x-0 scale-100 active:scale-95 active:-translate-x-6
              fixed top-24 flex items-center
              shadow-2xl
              bg-gradient-to-r from-primary-500/0 via-accent-p-500/30 to-secondary-500/0
              border-accent-s-900/70 border-y-[1px] border-r-[1px]
              rounded-e-xl
              opacity-100 hover:bg-accent-p-300/0
            "
          >
            <div className="absolute right-2 z-50">
              <img src={livedj} className="App-logo" alt="livedj logo" />
            </div>
          </div>
        </a>
      </header>
      <div className="fixed bottom-5 right-5 z-50 grayscale hover:grayscale-0 duration-500 translate-x-0 hover:translate-x-0 translate-y-52 hover:translate-y-0">
        <iframe
          title="Some playlist"
          className="rounded-xl"
          src="https://open.spotify.com/embed/playlist/2WvKikeI3TfwsMBiNYQUjJ?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
      <div className="fixed bottom-2 left-2 h-12 w-12">
        <a
          href="https://github.com/sgobotta/liveapps_web"
          target="_blank"
          rel="noreferrer"
        >
          <Octocat
            className={`
            transition duration-500
            cursor-default hover:cursor-pointer
            fill-accent-s-300 stroke-accent-s-700
            hover:fill-primary-300 hover:stroke-primary-700 hover:animate-jump
            active:fill-accent-p-500 active:stroke-accent-p-900
            active:shadow-2xl active:scale-95
          `}
          />
        </a>
      </div>
      {/* <TileGameComponent tiles={tileAssets} /> */}
      <ApplicationSelection />
    </div>
  );
}

const ApplicationOption = (): ReactElement => {
  return <p className="text-white">Picture cards</p>;
};

export default App;
