import { useEffect, useState } from "react"

import Desktop from "./Desktop"
import Loading from "./Loading"
import clsx from "clsx"

export default function Main() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (process.env.NODE_ENV === "development") setLoading(false)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      {loading && <Loading />}
      <div
        className={clsx({
          hidden: loading,
        })}
      >
        <Desktop />
      </div>
    </>
  )
}
