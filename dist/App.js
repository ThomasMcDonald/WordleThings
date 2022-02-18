import React, {useEffect, useState, useRef, createRef} from "../_snowpack/pkg/react.js";
import "./App.css.proxy.js";
import useRenderCount from "./hooks/useRenderCount.js";
import wordList from "./words.json.proxy.js";
var LetterState;
(function(LetterState2) {
  LetterState2[LetterState2["current"] = 0] = "current";
  LetterState2[LetterState2["anywhere"] = 1] = "anywhere";
})(LetterState || (LetterState = {}));
function Letter(props) {
  const {index, inputRef, onChange, onClick, onKeyDown, letter} = props;
  const {value, state} = letter;
  const onKeyPress = (e) => {
    const key = e.keyCode;
    onKeyDown(key, index);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "letter",
    onKeyDown: onKeyPress
  }, /* @__PURE__ */ React.createElement("input", {
    "data-index": index,
    key: index,
    ref: inputRef,
    value,
    maxLength: 1,
    onChange,
    style: {
      backgroundColor: state === 0 ? "green" : "white"
    }
  }), /* @__PURE__ */ React.createElement("button", {
    "data-index": index,
    onClick
  }, "Lock"));
}
function App() {
  const [wordLength, setWordLength] = useState(5);
  const [letters, setLetters] = useState([]);
  const letterInputs = useRef({});
  const count = useRenderCount();
  const onLetterChange = (e) => {
    const index = Number(e.target.getAttribute("data-index"));
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
    letterInputs.current[nextLetterIndex]?.current.focus();
  };
  const onClick = (e) => {
    const index = e.target.getAttribute("data-index");
    if (letters[index]) {
      let newLetterState = 0;
      if (letters[index].state === newLetterState) {
        newLetterState = 1;
      }
      setLetters((state) => {
        const newState = [...state];
        newState[index].state = newLetterState;
        return newState;
      });
    }
  };
  const getComputedWords = (searchBy) => {
    let filteredWords = [...wordList];
    for (const [index, letter] of searchBy.entries()) {
      filteredWords = filteredWords.filter((word) => {
        switch (letter.state) {
          case 1:
            return word.indexOf(letter.value) !== -1;
          case 0:
            return word[index] === letter.value;
          default:
            return true;
        }
      });
    }
    return filteredWords;
  };
  const onKeydown = (key, index) => {
    let nextIndex = index;
    switch (key) {
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
  };
  useEffect(() => {
    const newLetters = [];
    const newRefs = [];
    for (let i = 0; i < wordLength; i += 1) {
      newLetters.push({
        value: "",
        state: 1
      });
      newRefs.push(createRef());
    }
    setLetters(newLetters);
    letterInputs.current = newRefs;
  }, [wordLength]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("p", null, "Render Count: ", count), /* @__PURE__ */ React.createElement("div", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "row"
  }, letters.map((letter, index) => {
    return /* @__PURE__ */ React.createElement(Letter, {
      key: index,
      index,
      inputRef: letterInputs.current[index],
      letter,
      onChange: onLetterChange,
      onClick,
      onKeyDown: onKeydown
    });
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "wordContainer"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "wordRow"
  }, getComputedWords(letters).map((word, index) => {
    return /* @__PURE__ */ React.createElement("p", {
      key: `word_${index}`
    }, word);
  }))));
}
export default App;
