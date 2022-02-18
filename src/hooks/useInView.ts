import React, {useState, useEffect, useRef, RefObject} from 'react';

export default function useInView(ref: RefObject<HTMLElement>) {
	const observable = useRef<IntersectionObserver | null>(null);
	const [inView, setInView] = useState(true);

	useEffect(() => {
		observable.current = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
	}, [])


	useEffect(() => {
		observable.current.observe(ref.current);

		return () => {
			observable.current.disconnect();
		};
	}, [ref]);


	return inView
}