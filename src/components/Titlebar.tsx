interface Props {
    onMaximize: () => void
}

function Titlebar({onMaximize}:Props) {
  return (
    <div className="flex items-center justify-center bg-black-50  w-full">
      <div className="flex-auto">
        <div className="relative h-[24px] w-[24px] ">
          <img src="/logo.png" alt="" />
        </div>
      </div>

      <div className="w-[30px] h-[30px] hover:bg-stone-200/25 rounded-lg transition ease-linear flex items-center justify-center">
        <button onClick={onMaximize}  className="relative w-[18px] h-[18px] cursor-pointer">
          <img src="/Maximize.png" alt="Minimize Icon" />
        </button>
      </div>
    </div>
  );
}

export default Titlebar