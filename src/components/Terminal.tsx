import { FormEvent, useEffect, useRef, useState } from "react";
import Titlebar from "./Titlebar";

interface Props {
  maxWindow: () => void;
}

function Terminal({ maxWindow }: Props) {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const inputRef = useRef<HTMLInputElement | string>(null);

  const onCommand = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Output = inputRef.current?.value;
    if (!Output) return;
    setTerminalOutput((prev) => [...prev, Output]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };


  useEffect(() => {
    
  }, [terminalOutput])

  return (
    <div className="flex flex-col gap-4 p-8 w-full h-full bg-[#0D0D0D] rounded-2xl text-white font-Roboto">
      <Titlebar onMaximize={maxWindow} />
      <div className="flex gap-2 items-center justify-center h-10 w-full grid-flow-col">
        <h1 className="text-sm font-Roboto"> [TerminalX]</h1>
        <form onSubmit={onCommand} className="w-full">
          <input
            ref={inputRef}
            className="focus:outline-none text-sm tracking-[2px] w-full"
          />
        </form>
      </div>
      {terminalOutput.map((output, Index) => (
        <div className="flex flex-col gap-4">
          <h1 key={Index} className="">
            {output}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default Terminal;
