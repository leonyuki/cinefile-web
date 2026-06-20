import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ArchivePage } from './pages/ArchivePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { MediaPage } from './pages/MediaPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { PeoplePage } from './pages/PeoplePage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/:id" element={<EventDetailPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/media/news/:slug" element={<NewsDetailPage />} />
          <Route path="/media/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
