import React, { memo, Suspense } from "react"

interface IAppWrapperProps {
  Node: React.LazyExoticComponent<React.ComponentType<any>>
  appID: string
}

const AppWrapper: React.FC<IAppWrapperProps> = ({ Node, appID }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Node appId={appID} />
    </Suspense>
  )
}

export default memo(AppWrapper)
