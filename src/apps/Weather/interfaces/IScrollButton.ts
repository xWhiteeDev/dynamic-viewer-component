export interface IScrollButton {
    scrollSide: TScrollSide
    onClick?:()=>void
}
type TScrollSide = 'left' | 'right'