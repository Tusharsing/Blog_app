import { BrowserRouter , Route ,Routes } from 'react-router-dom'
import './App.css'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Signup } from './pages/Signup'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'

function App() {
   return<>
    <BrowserRouter>
    <Routes>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/blogs' element={<Blogs/>}></Route>
        <Route path='/blog/:id' element={<Blog/>}></Route>
        <Route path='/publish' element={<Publish/>}></Route>
    </Routes>
    </BrowserRouter>
   </>
}
export default App
