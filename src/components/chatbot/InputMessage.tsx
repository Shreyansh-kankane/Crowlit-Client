import { IoIosSend, IoIosSwitch } from "react-icons/io";
import { useRef } from "react";

import { useSelector } from "react-redux";

function InputMessage({addMessage}:{addMessage: 
    (message: {
        text: string;
        sender: "user" | "assistant"
        sessionId: number;
    }
) => void;
}) {

    const inputRef = useRef<HTMLInputElement>(null);
    const sessionId = useSelector((state: any) => state.auth.sessionId);

    const sendMessage = () => {
        const message = inputRef.current?.value;

        if (message) {
            addMessage({
                text: message,
                sender: "user",
                sessionId: sessionId
            }
        );
            if(inputRef.current) {
                inputRef.current.value = ""; // Clear the input field after sending the message
                inputRef.current.focus(); // Keep the focus on the input field
            }
        }
    }

  return (
    <div className="flex items-center gap-2 border-t border-white/10 pt-2">
        <input className="flex-1 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70"
            placeholder="Type your message..."
            onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  sendMessage();
                }   
            }}
            ref={inputRef}
        />
        <button className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full"
            onClick={()=>{
               sendMessage(); 
            }}
        >
            <IoIosSend className="h-4 w-4" />
        </button>
    </div>
  )
}

export default InputMessage