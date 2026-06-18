import { Children } from "react";
import type { ISidebar } from "../interfaces/ISidebar";
import "../styles/components/Sidebar.css";

export default function Sidebar({ width, height, children }: ISidebar) {
  return (
    <div className="Sidebar-window" style={{ height: height, width: width }}>
      {Children.map(children, (child) => {
       return child;
      })}
    </div>
  );
}
