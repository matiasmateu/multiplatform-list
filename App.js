import React from "react";
import MyList from "./MyList";
import { MovieContextProvider } from "./MovieContext";

const App = () => {
  return (
    <MovieContextProvider>
      <MyList />
    </MovieContextProvider>
  );
};

export default App;