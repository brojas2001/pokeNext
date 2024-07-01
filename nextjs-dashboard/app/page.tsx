import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';



export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-[#0984e3] p-4 md:h-20">
        <AcmeLogo />
       
       
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-[#dfe6e9] px-6 py-10 md:w-2/5 md:px-20">
          <p className={` text-xl text-gray-800 md:text-m md:leading-normal p-2 `}>
            <strong> Pokemones</strong> 
            <p className='text-justify'>Los Pokémon son como estrellas en el vasto firmamento de la imaginación, cada uno brillando con su propio resplandor único y especial. Son criaturas mágicas que nos transportan a un mundo lleno de aventuras, amistad y descubrimiento. Con formas encantadoras, colores vibrantes y habilidades sorprendentes, cada Pokémon es un tesoro viviente que despierta nuestra curiosidad y nos invita a explorar nuevos horizontes. En su diversidad, encontramos la belleza de la naturaleza y la maravilla de la creatividad humana entrelazadas en una danza armoniosa de juego y fantasía.{' '}</p>
          </p>
          <Link
            href="/pokemones"
            className="flex items-center gap-5 self-start rounded-lg bg-[#ff7675] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#74b9ff] md:text-base"
          >
            <span className='text-[20px] rounded-3xl'>pokemones</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
       <Image src="/pokemones.png" alt="Screenshots of the dashboard" width={1000} height={760} className='hidden md:block'
        />
       <Image src="/pokemones.png" alt="Screenshots of the dashboard" width={560} height={620} className='block md:hidden'
        />
          
          {/* <img src='/hero-desktop.png'
          alt ="Screenshots of the dashboard"/>  */}
        </div> 
      </div>
    </main>
  );
 
}
