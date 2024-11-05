import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/globalStyles';
import Header from './components/Header/header';
import GamePage from './pages/GamePage';
import RankingPage from './pages/RankingPage';


function App() {
  const [selectedMenu, setSelectedMenu] = useState("게임");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      {selectedMenu === "게임" && <GamePage />}
      {selectedMenu === "랭킹" && <RankingPage />}
    </ThemeProvider>
  );
}

export default App;
