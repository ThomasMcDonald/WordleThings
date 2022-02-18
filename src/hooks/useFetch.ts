import {useState, useEffect} from 'react';
import type { PokemonResponse } from '../types';

export default function useFetch(options: any): PokemonResponse & Error {
	const [response, setResponse] = useState<PokemonResponse>()
	const [error, setError] = useState<Error>()

	useEffect(() => {
		(async () => {
			try {
				if(options.url) {
					const request = await fetch(options.url, options);
					const data = await request.json();
					
					setResponse(data);
				}
			} catch(error) {
				setError(error as Error);
			}
		})();
	}, [options.url])


	return { 
		response,
		error
	};
}