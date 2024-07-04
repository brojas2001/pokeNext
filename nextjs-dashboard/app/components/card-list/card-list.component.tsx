import React, { FC } from "react";
import "./card-list.style.css";
import Card from "../card/card.component";

export interface detallePokemonProps {
  id: number;
  forms: {
    name: string;
    url: string;
  };
  types: {
    type: {
      name: string;
      url: string;
    };
  };
  species: {
    name: string;
    url: string;
  };
  height: number;
  weight: number;
  url: string;
}

interface Props {
  pokemones: detallePokemonProps[];
  buscaTipoEnEspanol: (tipo: detallePokemonProps) => any;
}

const CardList: FC<Props> = ({ pokemones, buscaTipoEnEspanol }) => {
  return (
    <div className="card-list">
      {pokemones.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          buscaTipoEnEspanol={buscaTipoEnEspanol}
        />
      ))}
    </div>
  );
};

export default CardList;
