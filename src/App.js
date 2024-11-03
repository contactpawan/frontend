import './App.css';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from "react-bootstrap"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from './components/users/CreateUser';
import UserNav from './components/common/UserNav';
import ViewUser from './components/users/ViewUsers';
import NotFound from './components/common/NotFound';
import Home from './components/common/Home';

function App() {
  return (
    <Container>
      <UserNav />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="create-users" element={<CreateUser />} />
            <Route path="view-users" element={<ViewUser />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
