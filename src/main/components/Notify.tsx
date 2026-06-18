import type { INotify, INotifyProperties, TNotifyContextType } from "../interfaces/INotify";
import "../styles/components/Notify.css";
const messageData: Record<TNotifyContextType, INotifyProperties> = {
  Error: {
    context: "Wystapił błąd!",
    borderColor: "rgba(255, 36, 36, 0.671)",
    bgColor: "rgba(255, 36, 36, 0.671)",
    boxShadow: "-4px 0px 1px 1px rgba(255, 36, 36, 0.274)",
  },
  Info: {
    context: "Informacja",
    borderColor: "rgba(63, 201, 255, 0.81)",
    bgColor: "rgba(63, 201, 255, 0.671)",
    boxShadow: "-4px 0px 1px 1px rgba(63, 201, 255, 0.44)",
  },
  Success: {
    context: "Sukces",
    borderColor: "rgba(64, 223, 58, 0.87)",
    bgColor: "rgba(64, 223, 58, 0.815)",
    boxShadow: "-4px 0px 1px 1px rgba(64, 223, 58, 0.274)",
  },
  Warn: {
    context: "Ostrzeżenie",
    borderColor: "rgba(214, 211, 16, 0.93)",
    bgColor: "rgba(214, 211, 16, 0.815)",
    boxShadow: " -4px 0px 1px 1px rgba(214, 211, 16, 0.274)",
  },
};

export default function Notify({ type, message, code, codeSubName }: INotify) {
  const notifi = messageData[type];
  return (
    <div className="notification-box" style={{ backgroundColor: notifi.bgColor, borderColor: notifi.borderColor, boxShadow: notifi.boxShadow }}>
      <span className="notification-type">{notifi.context}</span>
      <span style={{ margin: "2%", fontSize: "0.8rem", width: "100%" }}>{message}</span>
      <span style={{ fontWeight: 600, textIndent: "3%" }}>
        {code} {codeSubName && `| ${codeSubName}`}
      </span>
    </div>
  );
}
