import type { IComponent } from "../interfaces/IComponent";
import "../styles/components/Component.css";
export default function Component({
  width = "25%",
  height= "25%",
  componentName,
  onClick,
  color = 'gray',
}: IComponent) {
  return (
    <div
      className="Sidebar-component"
      style={{ width: width ?? "25%", height: height ?? '25%', backgroundColor: color ?? 'gray' }}
      key={componentName}
      onClick={onClick}
    >
      <div className="Sidebar-component-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png"
          alt="React logo"
        />
      </div>
      <span>{componentName}</span>
    </div>
  );
}
