import React, { useEffect, useState } from 'react'
import './card.style.css'
import { indieFlower, margarine, rubikBubbles } from '@/app/ui/font'

// import Modal from '@/scripts/Modal'



interface detallePokemonProps {
    forms:{
        name: string,
        url: string
    }
    types:{
        type: {
            name: string,
            url: string
        }
    },
    species: {
        name: string,
        url: string
    }
    id:number,
    height: number,
    weight: number
};

interface detalleEspecieProps {
    flavor_text_entries: {
        flavor_text: string,
        language: {
            name: string,
            url: string
        }
    pokedex_numbers: {
        entry_number: number,
        pokedex: {
            name: string,
            url: string
        }
    }
    }
}
interface detallePokedexProps {
  descriptions: {
    description: string,
    language: {
      name: string,
      url: string
    }
  }
}

const Card = ({pokemon}) => {
  const [detallePokemon, setDetallePokemon] = useState(undefined)
  const [detalleEspecie, setDetalleEspecie] = useState(undefined)
  const [detallePokeDex, setDetallePokeDex] = useState(undefined)
  const [showModal, setShowModal] = useState<Boolean>(false);

  useEffect(() => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data: detallePokemonProps) => {
          console.log("Detalle Pokemon =>", data)
          setDetallePokemon(data)
        })
  }, [pokemon.url])

  useEffect(() => {
    if (detallePokemon) {
      fetch(detallePokemon.species.url)
        .then((response) => response.json())
        .then((data: detalleEspecieProps) => {
          console.log("Detalle Especie=>", data)
          setDetalleEspecie(data)
        })
    }
  }, [ detallePokemon])

  useEffect(() => {
    if (detalleEspecie) {
      fetch(detalleEspecie.pokedex_numbers[0].pokedex.url)
        .then((response) => response.json())
        .then((data: detalleEspecieProps) => {
          console.log("Detalle Pokedex=>", data)
          setDetallePokeDex(data)
        })
    }
  }, [ detalleEspecie])

  if (!detallePokemon || !detalleEspecie) {
    return <h1>cargando</h1>
  }

  const flavorTextEs = detalleEspecie.flavor_text_entries.find(
    (flavor) => flavor.language.name === 'es').flavor_text
  
  const generaTextEs = detalleEspecie.genera.find(
    (gen) => gen.language.name === 'es').genus

  const pokeDexTextEs = detallePokeDex.descriptions.find(
    (des) => des.language.name === 'es').description
  



  return (
    <>
    <section className='bg-gray-100'>
      <article className='relative flex rounded-3xl bg-[#0984e3] p-8 justify-center gap-4 m-4 w-[380px] h-[320px] hover:bg-[#e84393]'>
        <div >
          <h1 className= {`${margarine.className} capitalize text-[40px] rounded-full w-[50px] h-[50px]`}>{detallePokemon.name}</h1>
          <h1 className= {`${margarine.className} absolute inset-x-0 top-0 -left-3 text-[40px] rounded-full bg-[#ffeaa7] w-[50px] h-[50px]`}>#{detallePokemon.id}</h1>
          <img className='w-[150px] h-[150px]' src={detallePokemon.sprites.versions['generation-v']['black-white'].animated.front_default} />
        </div>
        <div>
          <button onClick={() => setShowModal(true)}  className="absolute -right-3 font-bold -bottom-5 w-[132px] h-[48px] bg-[#ff7675]  rounded-full text-white transition-colors hover:bg-[#74b9ff]">
            Detalles
          </button>
        </div>
      </article>
    </section>
    {showModal ? (
        <>
          <div className="backdrop-blur-lg flex overflow-x-[40px] overflow-y-auto fixed inset-0 z-50 outline-none rounded-sm focus:outline-none">
            <div className='bg-[#dfe6e9] relative w-[600px] h-[750px] my-6 mx-auto rounded-xl'>
              <div className='max-h-full'>
                <div className='bg-[#fdcb6e] p-[4px] m-[5px] rounded-md text-center'>
                  <div className='text-[25px] justify-center p-2 max-h-full font-bold'> 
                    <h3>Información Pokemon </h3>
                    </div>
                    <button className='absolute -right-3 font-bold -bottom-5 w-[132px] h-[48px] bg-[#ff7675]  rounded-full text-white transition-colors hover:bg-[#74b9ff]"'
                        onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                </div>
              <div>
                <h1 className={`${rubikBubbles.className} antialiased text-[30px] p-[4px] m-[4px] capitalize text-center font-bold text-[#6c5ce7]`}>{detallePokemon.name}</h1>
                <div className=' flex justify-center items-center'>
                  <img className='w-[100px] h-[100px]' src={detallePokemon.sprites.versions['generation-v']['black-white'].animated.front_default} />
                </div>
                <div className={`${margarine.className} antialiased text-[30px] text-center p-[4px]`}>
                  <h2>#{detallePokemon.id}</h2>
                </div>
                <div className={`${indieFlower.className} antialiased text-center text-[25px]`}>
                  <h2>{generaTextEs}</h2>
                </div>

                <div className='gap-2 justify-items-stretch'>
                  <div className='flex flex-row place-content-center'>
                    <div className={`${margarine.className} antialiased bg-[#00cec9] p-[6px] text-[20px] m-[4px] rounded-full w-[150px] text-center `}>
                      <h2>{detallePokemon.weight}kg</h2>
                    </div>
                    <div className={`${margarine.className} antialiased  bg-[#55efc4] p-[6px] text-[20px] m-[4px] rounded-full w-[150px] text-center`}>
                      <h2>{detallePokemon.height}cm</h2>
                    </div>
                  </div>
                </div>
                <div className={`${indieFlower.className} antialiased text-center text-justify p-[10px] m-[8px] text-[25px] bg-[#74b9ff] rounded-xl`}>
                  <p>{flavorTextEs}</p>
                </div>
                <div>
                  {pokeDexTextEs}
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
  
export default Card