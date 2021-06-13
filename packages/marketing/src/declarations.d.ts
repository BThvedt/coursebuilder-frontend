declare namespace JSX {
  interface IntrinsicElements {
    LottiePlayer: any
  }
}
// annoying errors when tryign to import images
// will likely have to be repeated for other extensions.. hmm
declare module "*.png" {
  export default "" as string
}
