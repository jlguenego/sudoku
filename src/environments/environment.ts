// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC4Fr8jwgplyLOFObrSlI9KfnXSeJYZvlQ",
    authDomain: "sudoku-8ba24.firebaseapp.com",
    databaseURL: "https://sudoku-8ba24.firebaseio.com",
    projectId: "sudoku-8ba24",
    storageBucket: "sudoku-8ba24.appspot.com",
    messagingSenderId: "695752632217"
  }
};
