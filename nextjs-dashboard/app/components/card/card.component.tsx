import React, { useEffect, useState } from 'react'
import './card.style.css'

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

const Card = ({pokemon, buscaTipoEnEspanol}) => {
  const [detallePokemon, setDetallePokemon] = useState(undefined)
  const [detalleEspecie, setDetalleEspecie] = useState(undefined)
  const [open, setOpen] = React.useState(false)

  const alertaDetallePokemon = () => {
    alert(detallePokemon.name)}

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

  if (!detallePokemon || !detalleEspecie) {
    return <h1>cargando</h1>
  }
  return (
    <>
    <section className='bg-gray-100 md:w-xl'>
      <article className='relative flex rounded-3xl bg-[#0984e3] p-8 justify-center gap-4 m-4 w-[380px] h-[320px] hover:bg-[#e84393]'>
        <div >
          <h1 className='text-[40px] capitalize text-center'>{pokemon.name}</h1>
          <img className='w-[200px] h-[200px]' src={detallePokemon.sprites.versions['generation-v']['black-white'].front_default} />
         
        </div>
        <div>
          <button className='absolute -right-3 font-bold -bottom-5 w-[132px] h-[48px] bg-[#ff7675]  rounded-full text-white' onClick={alertaDetallePokemon}>Detalles</button>
        </div>
       
      </article>
    </section>


    {/* <div className='types-container-card'>
      {detallePokemon.types.map((type) => (
      <p className='types-container-card'
      style={{
              color: 'white',
              borderRadius: '15px',
              padding: '8px',
              width: 'fit-content'
              }}>
      {buscaTipoEnEspanol(type.type.name)}
      </p>
      ))}
        </div> */}
       
  </>
)
}
export default Card