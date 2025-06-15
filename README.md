# Liveapps Web

<p align="center">
  <a
    href="https://github.com/sgobotta/liveapps_web/actions/workflows/ci.yml"
    target="_blank" rel="noopener noreferrer"
  >
    <img
      src="https://github.com/sgobotta/liveapps_web/actions/workflows/ci.yml/badge.svg"
      alt="CI Status"
    />
  </a>
  <a
    href="https://github.com/sgobotta/liveapps_web/actions/workflows/cd-dev.yml"
    target="_blank" rel="noopener noreferrer"
  >
    <img
      src="https://github.com/sgobotta/liveapps_web/actions/workflows/cd-dev.yml/badge.svg"
      alt="CD Status"
    />
  </a>
</p>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Do not replicate this project structure, seems that `create-react-app` is not standard anymore. The recommended way to work with react applications is to bootstrap your frontent repository using any of the [following recommended frameworks](https://react.dev/learn/creating-a-react-app#full-stack-frameworks).

This piece of work started merely an excuse to get me to write typescript code, I wanted to play around with types, interfaces and data structures so I could feel used to the language flow, understand it's constraints, get used to common compilation errors, etc. When this site was created it was just a wall of squared pictures that randomly appeared every time someone visited the site. I wanted to write a simple game from scratch, using css animations, where users could somehow interact with those squared images. Eventually I had the picture cards game working. Later I added some user feedback components since friends would keep asking for ways to know their game stats. I still owe them a ranking system, which could possibly happen someday.

In this website you'd also find a few more applications I work on: the finance website and the live dj web application. The first one shows off dollar rates in Argentina while the second one serves a way to listen to music with other people in real time, using a shared player. Feel free to take a look at those and let me know if you have any suggestions. They'll be pretty much appreciated :)

## Development Requirements

- [asdf](https://asdf-vm.com/guide/getting-started.html#_1-install-asdf) (Optional)
- [yarn](https://yarnpkg.com/)

Use asdf if you want to install yarn in a quick way.

```bash
asdf plugin-add yarn
asdf install yarn latest
```

## Available Scripts

In the project directory, you can run:

### `make server`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `make test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `make build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `make check`

Checks the code format follows the prettier rules

### `make lint`

Runs a code formatter on the whole project.
