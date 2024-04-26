import BookListPage from './pages/BookListPage';
import './App.css';
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import InputBookDetailsPage from './pages/InputBookDetailsPage';
import EditBookDetails from './components/EditBookDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<BookListPage/>}/>
          <Route path='/addBook' element={<InputBookDetailsPage/>}/>
          <Route path='/editBook/:id' element={<EditBookDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
