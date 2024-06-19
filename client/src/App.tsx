import Loading from './components/loading/Loading'
import SomeComponent from './components/manager-post/SomeComponent '
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from './components/post/Post'
import Home from './components/bai3/Home';
import ConfirmDeleteModal from './components/bai8/ConfirmDeleteModal';

export default function App() {
  return (
    <div>App
      <Loading></Loading>
      <SomeComponent></SomeComponent>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/list-post" element={<Post />} />
        </Routes>
      </Router>
      <ConfirmDeleteModal></ConfirmDeleteModal>
    </div>
  )
}
