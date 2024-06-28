import React, { useState, useEffect } from "react";

const PokeApi = () => {
    const [pokemon, setPokemon] = useState([]);
    const [detallePokemon, setDetallePokemon] = useState([]);


useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/') 
    .then(response => response.json())
    .then(data => 
        setPokemon(data.results))
}, []);

useEffect(() => {
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        setDetallePokemon(data)
      })
  }, [pokemon.url])
 
}
    
export default PokeApi;