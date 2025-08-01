
import { MdContactPhone } from "react-icons/md";
const Contact = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-amber-50 text-gray-900 w-full h-[70%] max-w-[700px] mx-auto bg-gray-100 py-10">
      <div className="w-[80%] flex justify-center items-center mx-auto ">
        <div className="flex flex-col items-center w-[100%]  max-h-96 min-h-14 mx-auto">
          <MdContactPhone className="h-[70px] md:h-[85px] lg:h-[90px] xl:h-[95px]" size={"12rem"} />
          <div className="w-full h-[80%] md:w-[90%] flex flex-col items-center justify-center">
            <h1 className="w-full text-center font-serif text-xl tracking-widest sm:text-2xl md:text-5xl lg:text-6xl">Samson Mukka</h1>
            <h2 className="w-full text-center font-serif text-xl tracking-widest sm:text-2xl">+1 925 272 5671</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
