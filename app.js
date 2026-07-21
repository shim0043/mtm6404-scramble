/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

const root = ReactDOM.createRoot(document.getElementById("root"));

const wordList = [
  'nickel',
  'oxygen',
  'xenon',
  'copper',
  'hydrogen',
  'monoxide',
  'silver',
  'gold',
  'lithium',
  'carbon'
];

function App() {
  // game state initialization 
  const [points, setPoints] = React.useState(function() {
    return Number(localStorage.getItem('points')) || 0;
  });

  const [strikes, setStrikes] = React.useState(function() {
    return Number(localStorage.getItem('strikes')) || 0;
  });

  const [passes, setPasses] = React.useState(function() {
    const saved = localStorage.getItem('passes');
    return saved !== null ? Number(saved) : 3;
  });

  const [currentIndex, setCurrentIndex] = React.useState(function() {
    return Number(localStorage.getItem('currentIndex')) || 0;
  });

  const [scrambledWord, setScrambledWord] = React.useState(function() {
    return localStorage.getItem('scrambledWord') || shuffle(wordList[0]);
  });

  const [guess, setGuess] = React.useState('');
  const [feedback, setFeedback] = React.useState('');

  // local storage
  React.useEffect(function() {
    localStorage.setItem('points', points);
  }, [points]);

  React.useEffect(function() {
    localStorage.setItem('strikes', strikes);
  }, [strikes]);

  React.useEffect(function() {
    localStorage.setItem('passes', passes);
  }, [passes]);

  React.useEffect(function() {
    localStorage.setItem('currentIndex', currentIndex);
  }, [currentIndex]);

  React.useEffect(function() {
    localStorage.setItem('scrambledWord', scrambledWord);
  }, [scrambledWord]);

  // event handler
  function handleFormSubmit(e) {
    e.preventDefault();
    
    if (guess.trim() === "") return;

    const currentCorrectWord = wordList[currentIndex];

    if (guess.toLowerCase().trim() === currentCorrectWord.toLowerCase()) {
      setPoints(points + 1);
      setFeedback('correct');
      setGuess('');

      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      if (nextIndex < wordList.length) {
        setScrambledWord(shuffle(wordList[nextIndex]));
      }
    } else {
      const updatedStrikes = strikes + 1;
      setStrikes(updatedStrikes);
      setFeedback('wrong');
      setGuess('');
    }
  }

  // game over condition
  const isGameOver = strikes >= 3 || currentIndex >= wordList.length;

  // pass function
  function handlePass() {
    if (passes > 0 && !isGameOver) {
      setPasses(passes - 1);
      setFeedback('passed');

      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      if (nextIndex < wordList.length) {
        setScrambledWord(shuffle(wordList[nextIndex]));
      }
    }
  }

  // restart function
  function handleRestart() {
    setPoints(0);
    setStrikes(0);
    setCurrentIndex(0);
    setScrambledWord(shuffle(wordList[0]));
    setFeedback('');
    setGuess('');
  }
}

root.render(<App />);