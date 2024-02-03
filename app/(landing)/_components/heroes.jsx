import Image from 'next/image';

export const Heroes = () => {
  return (
    <div className="flex max-w-5xl flex-col items-center justify-center">
      <div className="flex items-center">
        <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="undraw/taking_notes.svg"
            fill
            alt="Taking Notes"
            className="object-contain"
          />
        </div>
        <div className="relative hidden h-[400px] w-[400px] md:block">
          <Image
            src="undraw/notebook.svg"
            fill
            alt="Notebook"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};
