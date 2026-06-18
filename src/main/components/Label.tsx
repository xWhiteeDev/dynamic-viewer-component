import type { ILabel } from "../interfaces/ILabel";
import '../styles/components/Label.css'
export default function Label({ width="25%", height="25%", color='gray', text='chuj' }: ILabel) {
  return <div className="Sidebar-label" style={{ width: width, height: height, backgroundColor:color }}>{text && <span>{text}</span>}</div>;
}
