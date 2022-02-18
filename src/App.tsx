import React, { useEffect, useState, useRef, createRef } from 'react';
import './App.css';
import useRenderCount from './hooks/useRenderCount';
import wordList from './words.json';

enum LetterState {
	current,
	anywhere
}

type LetterType = {
	value: string;
	state: LetterState
}

type LetterProps = {
	index: number;
	inputRef: any; // whatever react ref type is
	onChange: (e:any) => void;
	onClick: (e:any) => void;
	onKeyDown: (key: number, index: number) => void;
	letter: LetterType
}

function Letter(props: LetterProps): JSX.Element {
	const { index, inputRef, onChange, onClick, onKeyDown, letter } = props;
	const { value, state } = letter;

	const onKeyPress = (e) => {
		const key = e.keyCode
		onKeyDown(key, index);
	}



	return (
		<div className={'letter'} onKeyDown={onKeyPress}>

			<input 
				data-index={index} 
				key={index} 
				ref={inputRef} 
				value={value} 
				maxLength={1}
				onChange={onChange}
				style= {{
					backgroundColor: state === LetterState.current ? 'green' : 'white'
				}}
				/>

				<button data-index={index} onClick={onClick}>Lock</button>
		</div>
	)
}

function App() {
	const [wordLength, setWordLength] = useState(5);
	const [letters, setLetters] = useState<LetterType[]>([]);
	const letterInputs = useRef({})
	const count = useRenderCount();

	const onLetterChange = (e) => {
		const index = Number(e.target.getAttribute('data-index'));
		const value = e.target.value;

		setLetters((state) => {
			const newState = [...state];
			newState[index].value = value;
			return newState;
		});

		let nextLetterIndex = index + 1;

		if (!value.length) {
			nextLetterIndex = index - 1;
		} 
		
		// change focus to next available letter
		letterInputs.current[nextLetterIndex]?.current.focus();
	}
	
	const onClick = (e) => {
		const index = e.target.getAttribute('data-index');

		if (letters[index]) {
			let newLetterState = LetterState.current;

			if (letters[index].state === newLetterState) {
				newLetterState = LetterState.anywhere
			}

			setLetters((state) => {
				const newState = [...state];
				newState[index].state = newLetterState;
				return newState;
			});
		}
	}

	const getComputedWords = (searchBy: LetterType[]): string[] => {
		let filteredWords: string[] = [...wordList];

		for (const [index, letter] of searchBy.entries()) {
			filteredWords = filteredWords.filter((word) => {
				switch(letter.state) {
					case LetterState.anywhere: 
						return word.indexOf(letter.value) !== -1;
						// just needs to exist somewhere in the string
					case LetterState.current: 
						return word[index] === letter.value;
						// needs to exist at current index
					default:
						return true;
				}
			});
		}

		return filteredWords
	}

	const onKeydown = (key: number, index: number) => {

		
		let nextIndex = index;
		switch(key) {
			case 8:
			case 37: 
				nextIndex -= 1;
				break;
			case 39:
				nextIndex += 1;
				break;
			default:
				break;
		}

		letterInputs.current[nextIndex]?.current.focus();
	}


	useEffect(() => {
		const newLetters: LetterType[] = [];
		const newRefs = [];
		for (let i = 0; i < wordLength; i += 1) {
			newLetters.push({
				value: '',
				state: LetterState.anywhere,
			});

			newRefs.push(createRef());
		}	

		setLetters(newLetters);
		letterInputs.current = newRefs;

	}, [wordLength])

	return (
		<div className="App">
			<p>Render Count: {count}</p>

			<div className='container'> 
				<div className='row'> 
					{	
						letters.map((letter, index) => {
							return (
								<Letter 
									key={index} 
									index={index} 
									inputRef={letterInputs.current[index]} 
									letter={letter}
									onChange={onLetterChange}
									onClick={onClick}
									onKeyDown={onKeydown}
								/>
							)
						})
					}
				</div>
			</div>
					
			<div className='wordContainer'>
				<div className='wordRow'>
					{getComputedWords(letters).map((word, index) => {
						return (
							<p key={`word_${index}`}>
								{word}
							</p>
						)
					})}
				</div>
			</div>


		</div>
	);
}

export default App;