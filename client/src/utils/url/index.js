export const checkURLByString = (string) => {
  if(window !== undefined) {
    return window.location.href.indexOf(string) > 0;
  }
  throw new Error(`Window is undefined`);
}
