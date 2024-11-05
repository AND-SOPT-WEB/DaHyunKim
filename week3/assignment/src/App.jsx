import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/globalStyles';
import Header from './components/header/Header';
import GamePage from './pages/GamePage';
import RankingPage from './pages/RankingPage';
import useTimer from './hooks/useTimer';

function App() {
  const [selectedMenu, setSelectedMenu] = useState("게임");
  const [level, setLevel] = useState(1); 
  const { time, startTimer, stopTimer, resetTimer, isRunning } = useTimer();

  const handleLevelChange = (event) => {
    setLevel(Number(event.target.value));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header 
        selectedMenu={selectedMenu} 
        setSelectedMenu={setSelectedMenu} 
        time={parseFloat(time.toFixed(2))}
        isGameStarted={isRunning} 
        onLevelChange={handleLevelChange} 
      />
      {selectedMenu === "게임" && (
        <GamePage 
          key={level} 
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          time={time} 
          level={level}
        />
      )}
      {selectedMenu === "랭킹" && <RankingPage />}
    </ThemeProvider>
  );
}

export default App;
