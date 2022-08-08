import { ApplicationType } from "../../types/ApplicationType";
import Terminal from "../Terminal";

const items = (useApps: ApplicationType) => {
    const { addApp } = useApps;

    return [
        {
            id: "1",
            node: <div>About the DuckOS</div>,
        },
        {
            id: "2",
            node: (
                <div
                    onClick={() =>
                        addApp({
                            id: "terminal",
                            title: "Terminal",
                            node: Terminal,
                            start: Date.now(),
                        })
                    }
                >
                    Open Terminal
                </div>
            ),
        },
    ]
}

export { items };