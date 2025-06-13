# React Notes

### useState

Is used to update states for anything. It is a tuple where it is [variable, setter function] = useState(initial_value);
As a good practice the setter should be a similar name to variable. For instance:
```
  const [count, setCount] = useState(0)
```
### control an array data in component

Whenever we have a component that we need to manipulate an array we can do the following.

```
const Card = (props) =>{
  return <div>{props.name}</div>;
} 

function App() {
const arr = ['a', 'b', 'c'];

  return (
    <>
      {arr.map((name, idx) => (
        <Card key={idx} name={name}></Card>
      ))}
    </>
  )
}
```

### Key
For good practices it is better to have the key in the arrays like this in order to be unique.

```
<Card key={`${name}-{idx}`}></Card>
```

### useEffect
It's use for fetching data. This will trigger the effect in the mount component.

```
useEffect(()=>{
 console.log("Running")
},[]);
```

```
  useEffect(() => {
    fetch('https://akabab.github.io/starwars-api/api/all.json')
      .then((response) => response.json())  // transform to json
      .then((data) => {    //manipulating data
        setCharacters(data)
      })

  }, []);
```


## React router
To install react-router-dom we need to write the following command using yarn.

- yarn add react-router-dom

It is necessary to know that react-router-dom has a break changes from v5 to v6 and an upgrade (changes in code has to be done).

### How to install
First of all we need to use the BrowserRouter and that will be the main route element in the application must be applied in the index (main) app start.

For instance:
```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

```

## How to organize

In our app we must have an order to have a good habit so the best for maintain the routes is to create a folder for routes.

-src
  |- routes
        |- home
            |-home.component.jsx


## Adding routes

We will need to use Routes and Route in our main component in order to start using the route.

```
import { Routes, Route } from "react-router-dom"
import Home from "./routes/home/home.component";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  )
}
```


## Router Outlet

When we want to do nested routings the outlet is the way to implemented.

For instance:
```
import { Routes, Route } from "react-router-dom"
import Home from "./routes/home/home.component";


function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home/>} >
      <Route path="sales" element={<Sales/>} >
      </Route>
    </Routes>
  )
}
```
//Sales component
```
import { Outlet } from "react-router-dom"

function Sales() {
  return (

      <Outlet} >
      <div>
      <h2>Above I will have the component Sales nested</h2>
      </div>
  )
}
```

## index route

The index in the router is a shorthand way of specifying the "default" or "index" route for a given parent route.

```
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
```
```
<Route path="/" element={<Navigation />}>: This defines a parent route at /, and it renders the <Navigation /> component.

<Route index element={<Home />} />: This defines the index route under the parent route /. It means that when the user visits just /, the <Home /> component will be rendered inside <Navigation />.
```


## Fragment

<Fragment> is a special component provided by React that lets you group multiple elements without adding an extra node to the DOM.

It’s useful when a component needs to return multiple top-level elements but you don’t want to wrap them in an extra div or other element.

shorter way to write it <>
```
return (
    <>
        <Header />
        <Main />
        <Footer />
    </>
)
```