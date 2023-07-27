import { ApplicationType } from "../../contexts/ApplicationContext"

const items = (useApps: ApplicationType) => {
  const { addApp } = useApps

  return [
    {
      id: "1",
      Node: (
        <button onClick={() => addApp({ name: "terminal" })}>
          Open Terminal
        </button>
      ),
    },
  ]
}

export { items }
