import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookExplorer from '@aks/pages/BookExplorer'
import BookDetail from '@aks/pages/BookDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookExplorer />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="*" element={<BookExplorer />} />
      </Routes>
    </BrowserRouter>
  )
}
