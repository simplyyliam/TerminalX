import { useState, useRef, FormEvent } from "react";
import Titlebar from "./Titlebar";
import { JSX } from "react/jsx-runtime";

interface Props {
  maxWindow: () => void;
}

function Terminal({ maxWindow }: Props) {
  const [terminalOutput, setTerminalOutput] = useState<(string | JSX.Element)[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCommands = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current?.value.trim();
    if (!input) return;

    const args = input.split(" ");
    const commands = args[0];

    if (commands === "Tx") {
      const subCommands: Record<string, () => void> = {
        about: () => setTerminalOutput((prev) => [...prev, <About/>]),
        help: () => setTerminalOutput((prev) => [...prev, <Help/>]),
        clear: () => setTerminalOutput([]),
      };
      const action = subCommands[args[1]];
      if (action) {
        action(); // Execute the corresponding function
      } else {
        setTerminalOutput((prev) => [
          ...prev,
          `Command ${input} was not found`,
        ]);
      }
    } else {
      setTerminalOutput((prev) => [...prev, `Unknown Command: ${commands} type: Tx help for all the commands.`]);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  function About() {
    return (
      <div className="flex flex-col gap-4">
      <p>
        [<span className="text-terminal1"> TerminalX v1.0 </span>]{" "}
      </p>
      <span>-------------------------- </span>
      <p>
        A sleek, fast, and adaptive terminal designed for those who love
        minimalism with a touch of power. Type, execute, and take
        control—whether it’s quick commands or deep customization, TerminalX
        is here to elevate your workflow.{" "}
      </p>
      <h1>
        <span className="text-terminal1">Features</span>:{" "}
      </h1>
      <ul>
        <li>⚡ Smooth animations & transitions</li>
        <li>🛠️ Custom commands & shortcuts</li>
        <li>🌙 Dark-mode native (because light mode is a crime) </li>
        <li>🚀 Built for speed, esigned for style </li>
      </ul>
      <p>
        <span className="text-terminal2">Try</span> 'help' to see available
        commands. <br /> Stay sharp. Stay fast. Stay TerminalX.{" "}
      </p>
  
      <span>--------------------------</span>
    </div>
    );
  }

  function Help () {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-terminal1">TerminalX Commands</h1>
        <span>--------------------------</span>
        <ul className="flex flex-col gap-2">
          <li> - Tx about</li>
          <li> - Tx clear</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="Tx-Shadow flex flex-col gap-4 p-8 w-full h-full bg-[#0D0D0D] rounded-2xl text-white font-Roboto">
      <Titlebar onMaximize={maxWindow} />
      <div className="flex gap-2 items-center justify-center h-10 w-full grid-flow-col">
        <h1 className="text-sm font-Roboto">[TerminalX]</h1>
        <form onSubmit={handleCommands} className="w-full">
          <input
            ref={inputRef}
            className="focus:outline-none text-sm tracking-[2px] w-full bg-transparent text-white"
            placeholder="Enter command..."
          />
        </form>
      </div>
      <div className="w-full h-full overflow-auto scrollbar-hide">
        <div className="flex flex-col gap-2 mt-4">
          {terminalOutput.map((output, index) => (
            <div key={index} className="text-sm">
              {output}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Terminal;
