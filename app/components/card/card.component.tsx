import React, { FC, useEffect, useState } from "react";
import "./card.style.css";
import { margarine } from "@/app/ui/font";
import { detallePokemonProps } from "../card-list/card-list.component";
import ModalDetallePokemon from "./modal.component";

interface detalleEspecieProps {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }[];
}
interface detallePokedexProps {
  descriptions: {
    description: string;
    language: {
      name: string;
      url: string;
    };
  };
}

interface Props {
  pokemon: detallePokemonProps;
  buscaTipoEnEspanol: (tipo: detallePokemonProps) => any;
}

const Card: FC<Props> = ({ pokemon, buscaTipoEnEspanol }) => {
  const [detallePokemon, setDetallePokemon] = useState<any>(undefined);
  const [detalleEspecie, setDetalleEspecie] = useState<any>(undefined);
  const [detallePokeDex, setDetallePokeDex] = useState<any>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        setDetallePokemon(data);
      });
  }, [pokemon.url]);

  useEffect(() => {
    if (detallePokemon) {
      fetch(detallePokemon.species.url)
        .then((response) => response.json())
        .then((data: detalleEspecieProps) => {
          setDetalleEspecie(data);
        });
    }
  }, [detallePokemon]);

  useEffect(() => {
    if (detalleEspecie) {
      fetch(detalleEspecie.pokedex_numbers[0].pokedex.url)
        .then((response) => response.json())
        .then((data: detallePokedexProps) => {
          setDetallePokeDex(data);
        });
    }
  }, [detalleEspecie]);

  if (!detallePokemon || !detalleEspecie ) {
    return <h1>cargando</h1>;
  }

  const flavorTextEs = detalleEspecie?.flavor_text_entries?.find(
    (flavor: any) => flavor.language.name === "es"
  ).flavor_text;

  const generaTextEs = detalleEspecie?.genera?.find(
    (gen: any) => gen.language.name === "es"
  ).genus;

  const pokeDexTextEs = detallePokeDex?.descriptions?.find(
    (des: any) => des.language.name === "es"
  ).description;

  return (
    <>
      <section className="bg-gray-100 flex flex-wrap gap-[4px]">
        <article className="relative rounded-3xl bg-[#0984e3] p-[8px] gap-4 m-[20px] hover:bg-[#ff5252] transition-colors duration-300 ease-in-out min-w-[90%] m:w-[250px]  mss:w-[400px]">
          <div className="w-[100%]">
            <h1
              className={`${margarine.className} capitalize text-[30px] text-center rounded-full text-blue-100 p-4`}
            >
              {detallePokemon.name}
            </h1>
            <h1
              className={`${margarine.className} absolute text-center inset-x-0 top-1 left-1  p-[4px] m-[2px] text-[30px] rounded-full bg-[#ffffff] w-[15%] h-[15%]`}
            >
              {detallePokemon.id}
            </h1>
          </div>
          <div className="relative inset-0 flex">
            <img
              className="m-auto w-[100px] h-[100px]"
              src={
                detallePokemon.sprites.versions["generation-v"]["black-white"]
                  .animated.front_default
              }
            />
          </div>

          <div className="relative inset-0 flex place-content-center">
            {detallePokemon.types.map((type: any) => (
              <div>
                <p
                  className={`text-white m-4 text-center font-bold capitalize antialiased text-[20px] 
                  rounded-full w-[120px] ${margarine.className}`}
                >
                  {buscaTipoEnEspanol(type.type.name).toLowerCase()}
                </p>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="absolute -right-3 font-bold -bottom-5 w-[132px] h-[48px] bg-[#ff793f]  rounded-full text-white transition-colors hover:bg-[#74b9ff]"
            >
              Detalles
            </button>
          </div>
        </article>
      </section>

      <ModalDetallePokemon
        show={showModal}
        setShowModal={setShowModal}
        detallePokemon={detallePokemon}
        buscaTipoEnEspanol={buscaTipoEnEspanol}
        generaTextEs={generaTextEs}
        flavorTextEs={flavorTextEs}
        pokeDexTextEs={pokeDexTextEs}
      />
    </>
  );
};

export default Card;
