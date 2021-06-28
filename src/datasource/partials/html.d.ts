declare module '*.html' {
  const value: string;
  export default value;
}
interface window {
  webkitIndexedDB: any;
  mozIndexedDB: any;
  msIndexedDB: any;
}
