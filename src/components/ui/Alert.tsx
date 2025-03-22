export type AlertProps = {
  confirmText: string;
  contentText: string;
  onConfirm: () => void;
  visible?: boolean
}

export default function Alert({ onConfirm, confirmText, contentText, visible = true }: AlertProps) {
  return visible ? (
    <div className="absolute w-full h-full z-[9]">
      <div className="flex flex-row justify-center h-full items-center">
        <div
          className="
          w-full h-[200px] mx-8 sm:mx-0
          sm:w-[400px]
          text-zinc-300 
          bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 from-30% to-90%
          border-[1px] border-zinc-800/30
          flex flex-col
          gap-8 p-6 justify-items-center
          shadow-2xl
          rounded-[6px]
          items-center
          justify-center
        "
        >
          <p className="text-xl font-normal">
            {contentText}
          </p>
          <button
            onClick={onConfirm}
            className="
              w-fit
              py-2 px-6 rounded-lg shadow-lg
              bg-zinc-200 border-zinc-900/30 border-[1px] text-zinc-900
              pressable font-bold hover:underline active:italic transition-all duration-500
            "
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  ) : <></>
}