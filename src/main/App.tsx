import { useState } from "react";
import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import Label from "./components/Label";
import Component from "./components/Component";
import type { MyModule, TAppComponents } from "./interfaces/IApp";
import Notify from "./components/Notify";
import { type INotify } from "./interfaces/INotify";
import { getFileName } from "./services/appService";
import { AppContext } from "./services/context";

const files = import.meta.glob<MyModule>("../apps/*/*.tsx");
const componentsArr: TAppComponents = [];
for (const file in files) {
  componentsArr.push({
    name: getFileName(file),
    path: file,
  });
}
let notificationKey: number = 0;

function App() {
  const [ActiveComponent, setActiveComponent] = useState<React.ComponentType>();
  const [activeNotifications, setActiveNotification] = useState<INotify[]>([]) 

  function addNotify({ type, message, code, codeSubName }: INotify) {
    setActiveNotification((prev) => {
      notificationKey++;
      if (prev.length >= 5) {
        prev = prev.slice(1);
        return [...prev, { type, message, code, codeSubName, notifyIndex: notificationKey }];
      }
      return [...prev, { type, message, code, codeSubName, notifyIndex: notificationKey }];
    });
  }

  async function onComponentClick(filePath: string) {
    const executedFile = await files[filePath]();
    setActiveComponent(() => executedFile.default);
  }

  return (
    <div className="Dynamic-Component-Container">
      <Sidebar width="15vw" height="100vh">
        <Label width="100%" height="3%" color="rgba(27, 27, 27, 0.13)" text="Dynamic component viewer" />
        {componentsArr &&
          componentsArr.map((el, i) => (
            <Component
              key={i}
              componentName={el.name}
              color="rgb(27,27,27)"
              onClick={() => {
                onComponentClick(el.path);
              }}
              width="100%"
              height="3%"
            />
          ))}
      </Sidebar>

      <div className="react-container">
        <div className="react-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" />
        </div>
        <AppContext.Provider value={addNotify}>{ActiveComponent && <ActiveComponent />}</AppContext.Provider>
      </div>
      <div className="react-notifications">
        {activeNotifications.map((notify) => (
          <Notify key={notify.notifyIndex} type={notify.type} message={notify.message} code={notify.code} codeSubName={notify.codeSubName} />
        ))}
      </div>
      <div className="script-info">
        <span className="script-info-version">Beta version</span>
      </div>
    </div>
  );
}

export default App;
