declare function introJs(options?: IntroJsOptions): IntroJs;

interface IntroJsOptions {
  // Define the options if needed
}

interface IntroJs {
  start(): IntroJs;
  exit(): IntroJs;
  addHints(): IntroJs;
  // Add other methods and properties as needed
}

declare module 'intro.js' {
  export = introJs;
}

declare global {
  interface Window {
    introJs: IntroJs;
  }
}
