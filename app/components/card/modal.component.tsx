import { FC } from "react";
import { indieFlower, margarine, silkscreen } from "@/app/ui/font";



interface Props {
    show: boolean;
    setShowModal: any;
detallePokemon: any;
buscaTipoEnEspanol: any;
generaTextEs: any;
flavorTextEs: any;
pokeDexTextEs: any;
}

const ModalDetallePokemon:FC<Props> = ({
    show,
    setShowModal,
    detallePokemon,
    buscaTipoEnEspanol,
    generaTextEs,
    flavorTextEs,
    pokeDexTextEs,
}) => {

    const {
        weight, height, name, types
    } = detallePokemon ?? {}

    if (!show) return null;
    
    return (
        <>
          <div className="backdrop-blur-2xl flex overflow-x-[30px] overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-double sm:overflow-x-[40px] overflow-y-[30px]">
            <div className=" relative  bg-[#1B1464] h-screen w-screen my-0 m:bg-slate-500 m:my-[180px] m:mx-auto m:p-[4px] m:rounded-3xl m:w-[600px] m:h-[650px] mss:bg-red-500 mss:my-[60px] mss:mx-auto mss:p-[4px] mss:rounded-3xl mss:h-[650px] mss:w-[500px]">
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
                        detallePokemon?.sprites.versions["generation-v"][
                          "black-white"
                        ].animated.front_default
                      }
                    />
                  </div>
                  <div
                    className={`${margarine.className} antialiased text-[40px] p-[2px] m-[2px] capitalize text-center font-bold text-[#ffb142]`}
                  >
                    {name}
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
                        <h2>{weight}kg</h2>
                      </div>
                      <div
                        className={`${margarine.className} antialiased  bg-[#81ecec] font-bold p-[6px] text-[20px] m-[4px] rounded-full w-[150px] text-center`}
                      >
                        <h2>{height}cm</h2>
                      </div>
                    </div>
                    <div className="relative inset-0 flex place-content-center">
                      {types?.map((type: any) => (
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
    )
}

export default ModalDetallePokemon