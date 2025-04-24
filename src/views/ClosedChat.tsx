import { IoIosChatbubbles } from "react-icons/io";

import { useDispatch } from "react-redux";
import { WIDGETSCREENS } from "../../constants";
import { setWidgetView } from "../../slice/widgetViewSlice";

function ClosedChat() {
    const dispatch = useDispatch();
  return (
      <div className="relative cursor-pointer z-50" 
        onClick={()=>{
            dispatch(setWidgetView({
                type: WIDGETSCREENS.chatOpen
            }))
        }}
      >
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-75 blur-xl animate-pulse"/>
        <div className="relative rounded-full h-18 w-18 flex justify-center items-center border border-white/20 bg-black/40 backdrop-blur-xl p-2  shadow-2xl">
            <IoIosChatbubbles 
                size={30}
            />
        </div>
        {/* <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-purple-500 blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-blue-500 blur-3xl opacity-20 animate-pulse"></div> */}
    </div>
  )
}

export default ClosedChat