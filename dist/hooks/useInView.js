import {useState, useEffect, useRef} from "../../_snowpack/pkg/react.js";
export default function useInView(ref) {
  const observable = useRef(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    observable.current = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
  }, []);
  useEffect(() => {
    observable.current.observe(ref.current);
    return () => {
      observable.current.disconnect();
    };
  }, [ref]);
  return inView;
}
