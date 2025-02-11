import { ReactComponent as Octocat } from './svg/github.svg';
import './App.css';
import { ReactElement } from 'react';
import ApplicationSelection from './components/app-selection/ApplicationSelection';

function App(): ReactElement {
  return (
    <div className="App h-screen max-h-screen overflow-y-hidden">
      <ApplicationSelection />
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
    </div>
  );
}

export default App;
