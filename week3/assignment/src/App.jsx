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
  const { time, startTimer, stopTimer, resetTimer, isRunning } = useTimer();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header 
        selectedMenu={selectedMenu} 
        setSelectedMenu={setSelectedMenu} 
        time={time} 
        isGameStarted={isRunning} 
      />
      {selectedMenu === "게임" && (
        <GamePage startTimer={startTimer} stopTimer={stopTimer} onGameEnd={resetTimer}  time={time} />
      )}
      {selectedMenu === "랭킹" && <RankingPage />}
    </ThemeProvider>
  );
}

export default App;
