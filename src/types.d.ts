type Pokemon = {
	name: string;
	url: string;
	[v: string]: string | number | JSX.Element
}

type PokemonResponse = {
	results: Pokemon[];
	next: string;
	previous: string;
	count: number
}

export {
	PokemonResponse,
	Pokemon
}