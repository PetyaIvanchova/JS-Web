import Counter from "./components/Count";
import MovieList from "./components/MovieList";
import Timer from "./components/Timer";


function App() {
  const movies = [
    { title: 'Man of Steel', year: 2008, cast: ['Henry Cavil', 'Russell Crowe'] },
    { title: 'Harry Potter', year: 2008, cast: ['Daniel', 'Ema Watson'] },
    { title: 'Lord of the Rings', year: 2008, cast: ['Orlando Bloom'] },
];

  return (
    <div className="App">

    <MovieList movies={movies}/>

    <Timer start={0}/>

    <Counter canReset/>

    </div> 
  );
}

export default App;
