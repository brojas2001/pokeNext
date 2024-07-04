import React, { FC, useEffect, useState } from "react";
import "./card.style.css";
import { indieFlower, margarine, silkscreen } from "@/app/ui/font";
import { detallePokemonProps } from "../card-list/card-list.component";
// import { colorProps, colours } from "@/scripts/contasts";

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
  colours: colorProps;
}

const Card: FC<Props> = ({ pokemon, buscaTipoEnEspanol, colours }) => {
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
      <section className="bg-gray-100 flex flex-wrap gap-[4px]">
        <article className="relative rounded-3xl bg-[#0984e3] p-[8px] gap-4 m-[20px] hover:bg-[#ff5252] transition-colors duration-300 ease-in-out min-w-[90%] m:w-[250px]  mss:w-[400px]">
          <div className="w-[100%]">
            <h1
              className={`${margarine.className} capitalize text-[20px] text-center rounded-full text-blue-200 p-4`}
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
            {detallePokemon.types.map((type) => (
              <div>
                <p
                  className={`text-white m-4 text-center capitalize antialiased text-[25px] 
                  rounded-full w-[120px]`}
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

      {/* MODAL */}
      {showModal ? (
        <>
          <div className="backdrop-blur-2xl flex overflow-x-[30px] overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-double sm:overflow-x-[40px] overflow-y-[30px]">
            <div className=" relative sm: bg-[#1B1464] m:bg-slate-500 my-[180px] p-[4px] rounded-3xl h-[650px] mss:bg-red-500 my-[60px] mx-auto p-[4px] rounded-3xl h-[650px] w-[500px]">
              <div className="max-h-4">
                <div className="p-[2px] m-[12px] gap-4 rounded-full text-center">
                  <div className="text-[25px] justify-center p-2 font-bold"></div>
                  <button
                    className="absolute -right-3 font-bold -bottom-5 w-[132px] h-[48px] bg-[#ff793f]  rounded-full text-white transition-colors hover:bg-[#74b9ff]"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
                <div className="-top-0 relative">
                  <div className="relative inset-0 flex m:h-[80px]">
                    <img
                      className="relative m-auto w-[150px] h-[150px] m:-top-[90px]"
                      src={
                        detallePokemon.sprites.versions["generation-v"][
                          "black-white"
                        ].animated.front_default
                      }
                    />
                  </div>
                  <div
                    className={`${margarine.className} antialiased text-[40px] p-[2px] m-[2px] capitalize text-center font-bold text-[#ffb142]`}
                  >
                    {detallePokemon.name}
                  </div>
                  <div
                    className={`${indieFlower.className} antialiased text-center text-white text-[30px]`}
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
                    <div className="relative inset-0 flex place-content-center">
                      {detallePokemon.types.map((type) => (
                        <div>
                          <p
                            className={`text-white m-4 text-center capitalize ${silkscreen.className} antialiased text-[20px] `}
                          >
                            {buscaTipoEnEspanol(type.type.name).toLowerCase()}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      className={`${indieFlower.className} antialiased text-center  p-[8px] m-[10px] text-[22px] bg-[#74b9ff] rounded-xl`}
                    >
                      <p>{flavorTextEs}</p>
                    </div>
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
