import React, { useEffect, useState, useRef, createRef } from 'react';
import './App.css';
import wordList from './words';

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
	inputRef: React.RefObject<HTMLInputElement>; // whatever react ref type is
	onChange: (e:any) => void;
	onClick: (e:any) => void;
	letter: LetterType
}

// type RefArray = React.RefObject<HTMLInputElement>[];
interface RefArray {
	[key: number]: React.RefObject<HTMLInputElement>
}

function Letter(props: LetterProps): JSX.Element {
	const { index, inputRef, onChange, onClick, letter } = props;
	const { value, state } = letter;

	return (
		<div className={'letter'} onKeyDown={onChange} data-index={index}>
			<input
				readOnly={true}
				ref={inputRef} 
				value={value} 
				maxLength={1}
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
	const [filteredWords, setFilteredWords] = useState([...wordList]);
	const [letters, setLetters] = useState<LetterType[]>([]);
	const letterInputs = useRef<RefArray>({})

	const onLetterChange = (e: React.KeyboardEvent) => {
		const key = e.keyCode;
		const index = Number(e.currentTarget.getAttribute('data-index'));
		let nextLetterIndex = index;

		let newLetter: string | number = -1; // jank to get the ts rules to stop yelling at me

		switch (key) {
			case 8: // backspace
				newLetter = '';
				nextLetterIndex -= 1;
				break;
			case 37: // left arrow
				nextLetterIndex -= 1;
				break;
			case 39: // right arrow
				nextLetterIndex += 1;
				break;
			default: 
				if (key >= 65 && key <= 122) {
					newLetter = String.fromCharCode(key);
					nextLetterIndex += 1;
				}			
				break;
		}


		if (newLetter !== -1) {
			setLetters((state) => {
				const newState = [...state];
				newState[index].value = newLetter as string;
				return newState;
			});
		}	

		// change focus to next available letter
		letterInputs.current[nextLetterIndex].current?.focus();
	}
	
	const onClick = (e: React.MouseEvent) => {
		const index = Number(e.currentTarget.getAttribute('data-index'));

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

	const getComputedWords = () => {
		let words: string[] = [...wordList];
		
		for (const [index, letter] of letters.entries()) {
			const value = letter.value?.toLowerCase();
			if (value) {
				words = words.filter((word) => {
					switch(letter.state) {
						case LetterState.anywhere: 
							return word.indexOf(value) !== -1;
							// just needs to exist somewhere in the string
						case LetterState.current: 
							return word[index] === value;
							// needs to exist at current index
						default:
							return true;
					}
				});
			}
		}

		setFilteredWords(words);
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
		letterInputs.current = newRefs as RefArray;

	}, [wordLength])

	return (
		<div className="App">
			<button onClick={getComputedWords}>Filter</button>
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
								/>
							)
						})
					}
				</div>
			</div>
					
			<div className='wordContainer'>
				<div className='wordRow'>
					{filteredWords.map((word, index) => {
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