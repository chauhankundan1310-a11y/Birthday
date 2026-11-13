import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateBirthday from './pages/CreateBirthday.jsx';
import Preview from './pages/Preview.jsx';
import Surprise from './pages/Surprise.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBirthday />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/s/:id" element={<Surprise />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
