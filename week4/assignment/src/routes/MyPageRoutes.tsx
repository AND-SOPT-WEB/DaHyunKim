import { Routes, Route, Navigate } from 'react-router-dom';
import HobbyPage from '../components/MyPage/Hobby';
import InfoPage from '../components/MyPage/Info';

const MyPageRoutes = () => {
  return (
    <Routes>
      <Route path="hobby" element={<HobbyPage />} />
      <Route path="info" element={<InfoPage />} />
      <Route path="*" element={<Navigate to="hobby" replace />} />
    </Routes>
  );
};

export default MyPageRoutes;
