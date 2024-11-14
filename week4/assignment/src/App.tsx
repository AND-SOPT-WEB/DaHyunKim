import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { GlobalStyle } from './styles/globalStyles';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/Signup/SignupPage'; 
import MyPage from './pages/MyPage/MyPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> 
          <Route path="/mypage/*" element={<MyPage />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
