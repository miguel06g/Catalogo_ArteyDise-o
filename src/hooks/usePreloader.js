import { useEffect, useState } from "react";

export default function usePreloader(time = 2000) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, time);

    return () => clearTimeout(timer);
  }, [time]);

  return loading;
}
