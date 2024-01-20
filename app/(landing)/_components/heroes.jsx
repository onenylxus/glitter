import Image from 'next/image';

const Heroes = () => {
  return (
    <div className="flex flex-col max-w-5xl justify-center items-center">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image src="undraw/taking_notes.svg" fill alt="Taking Notes" className="object-contain" />
        </div>
        <div className="relative hidden md:block w-[400px] h-[400px]">
          <Image src="undraw/notebook.svg" fill alt="Notebook" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
