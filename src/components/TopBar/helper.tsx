import { ApplicationType } from "../../types/ApplicationType";
import Terminal from "../Terminal";

const items = (useApps: ApplicationType) => {
  const { addApp } = useApps;

  return [
    {
      id: "1",
      Node: <div>About the DuckOS</div>,
    },
    {
      id: "2",
      Node: (
        <div
          onClick={() =>
            addApp({
              id: "terminal",
              title: "Terminal",
              Node: Terminal,
              start: Date.now(),
            })
          }
        >
          Open Terminal
        </div>
      ),
    },
  ];
};

export { items };
