import {useRef, useEffect} from "../../_snowpack/pkg/react.js";
export default function useRenderCount() {
  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
  });
  return count.current;
}
