import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { createTheme,ThemeProvider } from '@mui/material/styles'
import { yellow } from "@mui/material/colors";
import Create from "./components/Create";
import Blogs from "./components/Blogs";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    tertiary : {
      main : yellow[500]
    }
  },
})

function App() {
  return (
    <Router>
    <ThemeProvider theme={theme}>
    <div className="App">
      <Layout>
      <Routes>
          <Route path ='/' element={ <Signup /> } />
          <Route path ='/login' element={ <Login /> } />
          <Route path ='/create' element={ <Create /> } />
          <Route path ='/blogs' element={ <Blogs /> } />
      </Routes>
      </Layout>
    </div>
    </ThemeProvider>
    </Router>
  );
}

export default App;
