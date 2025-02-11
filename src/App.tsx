import './App.css';
import { ReactElement } from 'react';
import ApplicationSelection from './components/app-selection/ApplicationSelection';
import GithubButton from './components/GithubButton';

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
        <GithubButton />
      </div>
    </div>
  );
}

export default App;
