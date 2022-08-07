import { lazy, useEffect, useState } from "react";

const Loading = lazy(() => import("./Loading"));
import Desktop from "./Desktop";

export default function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return <>{loading ? <Loading /> : <Desktop />}</>;
}
