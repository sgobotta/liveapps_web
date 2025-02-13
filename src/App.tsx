import './App.css';
import { ReactElement } from 'react';
import ApplicationSelection from './components/app-selection/ApplicationSelection';
import GithubButton from './components/GithubButton';
import SpotifyFrame from './components/spotify/SpotifyFrame';
import { useContextMenuDisabled } from './hooks/useContextMenu';

function App(): ReactElement {
  useContextMenuDisabled();

  return (
    <div className="text-center h-screen max-h-screen overflow-y-hidden">
      <ApplicationSelection />
      <div className="fixed bottom-5 right-5 z-50 grayscale hover:grayscale-0 duration-500 translate-x-0 hover:translate-x-0 translate-y-52 hover:translate-y-0">
        <SpotifyFrame />
      </div>
      <div className="fixed bottom-2 left-2 h-12 w-12">
        <GithubButton />
      </div>
    </div>
  );
}

export default App;
