import React, { FC, useEffect, useState } from "react";
import "./card.style.css";
import { indieFlower, margarine, rubikBubbles } from "@/app/ui/font";
import { detallePokemonProps } from "../card-list/card-list.component";

interface detalleEspecieProps {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    pokedex_numbers: {
      entry_number: number;
      pokedex: {
        name: string;
        url: string;
      };
    };
  };
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
  const [detallePokemon, setDetallePokemon] = useState(undefined);
  const [detalleEspecie, setDetalleEspecie] = useState(undefined);
  const [detallePokeDex, setDetallePokeDex] = useState(undefined);
  const [showModal, setShowModal] = useState<Boolean>(false);

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

  if (!detallePokemon || !detalleEspecie) {
    return <h1>cargando</h1>;
  }

  const flavorTextEs = detalleEspecie.flavor_text_entries.find(
    (flavor) => flavor.language.name === "es"
  ).flavor_text;

  const generaTextEs = detalleEspecie.genera.find(
    (gen) => gen.language.name === "es"
  ).genus;

  const pokeDexTextEs = detallePokeDex?.descriptions.find(
    (des) => des.language.name === "es"
  ).description;

  return (
    <>
      <section className="bg-gray-100 flex flex-col ">
        <article className="relative flex rounded-3xl bg-[#0984e3] justify-center gap-4 m-[15px] w-[330px] h-[320px] hover:bg-[#e84393] transition-colors duration-300 ease-in-out">
          <div>
            <h1
              className={`${margarine.className} capitalize text-[40px] rounded-full w-[50px] h-[50px] text-blue-200`}
            >
              {detallePokemon.name}
            </h1>
            <h1
              className={`${margarine.className} absolute inset-x-0 top-1 left-1  p-[2px] text-[30px] rounded-full bg-[#ffeaa7] w-[60px] h-[60px]`}
            >
              #{detallePokemon.id}
            </h1>
            <img
              className="w-[150px] h-[150px] p-[4px]"
              src={
                detallePokemon.sprites.versions["generation-v"]["black-white"]
                  .animated.front_default
              }
            />
          </div>

          {detallePokemon.types.map((type) => (
            <div
              className={`bg-${buscaTipoEnEspanol(
                type.type.name
              ).toLowerCase()}`}
            >
              <p className={` text-black p-[8px]`}>
                {buscaTipoEnEspanol(type.type.name).toLowerCase()}
              </p>
            </div>
          ))}

          <div>
            <button
              onClick={() => setShowModal(true)}
              className="absolute -right-3 font-bold -bottom-5 w-[132px] h-[48px] bg-[#ff7675]  rounded-full text-white transition-colors hover:bg-[#74b9ff]"
            >
              Detalles
            </button>
          </div>
        </article>
      </section>
      {showModal ? (
        <>
          <div className="backdrop-blur-lg flex overflow-x-[40px] overflow-y-auto fixed inset-0 z-50 outline-none rounded-sm focus:outline-none">
            <div className="bg-[#dfe6e9] relative w-[500px] h-[680px] my-6 mx-auto rounded-sm">
              <div className="max-h-4">
                <div className="p-[2px] m-[12px] gap-4 rounded-full text-center">
                  <div className="text-[25px] justify-center p-2 font-bold"></div>
                  <button
                    className='absolute -right-3 font-bold -bottom-5 w-[132px] h-[48px] bg-[#ff7675]  rounded-full text-white transition-colors hover:bg-[#74b9ff]"'
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
                <div className="-top-0 relative">
                  <div className=" flex p-[2px] justify-center items-center">
                    <img
                      className="relative -top-[65px] w-[150px] h-[150px]"
                      src={
                        detallePokemon.sprites.versions["generation-v"][
                          "black-white"
                        ].animated.front_default
                      }
                    />
                  </div>
                  <div
                    className={`${rubikBubbles.className} antialiased text-[40px] p-[2px] m-[2px] capitalize text-center font-bold text-[#6c5ce7]`}
                  >
                    {detallePokemon.name}
                  </div>
                  <div
                    className={`${margarine.className} antialiased text-[25px] text-center p-[2px] m-[2px]`}
                  >
                    #{detallePokemon.id}
                  </div>
                  <div
                    className={`${indieFlower.className} antialiased text-center text-[25px]`}
                  >
                    <h2>{generaTextEs}</h2>
                  </div>
                  <div className="gap-2 justify-items-stretch">
                    <div className="flex flex-row place-content-center">
                      <div
                        className={`${indieFlower.className} antialiased text-center text-[25px] bg-[#fd79a8] rounded-full w-[380px]`}
                      >
                        {pokeDexTextEs}
                      </div>
                    </div>
                  </div>

                  <div className="gap-2 justify-items-stretch">
                    <div className="flex flex-row place-content-center">
                      <div
                        className={`${margarine.className} antialiased bg-[#81ecec] p-[6px] text-[20px] m-[4px] rounded-full w-[150px] text-center `}
                      >
                        <h2>{detallePokemon.weight}kg</h2>
                      </div>
                      <div
                        className={`${margarine.className} antialiased  bg-[#81ecec] font-bold p-[6px] text-[20px] m-[4px] rounded-full w-[150px] text-center`}
                      >
                        <h2>{detallePokemon.height}cm</h2>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${indieFlower.className} antialiased text-center  p-[8px] m-[10px] text-[25px] bg-[#74b9ff] rounded-xl`}
                  >
                    <p>{flavorTextEs}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Card;
