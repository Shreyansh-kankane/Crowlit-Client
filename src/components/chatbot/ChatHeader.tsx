import { IoVideocamOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { useSelector, useDispatch } from 'react-redux';
import { setWidgetView } from "../../../slice/widgetViewSlice";

import { WIDGETSCREENS } from "../../../constants";


function ChatHeader() {
  
  const tenantName = useSelector((state: any) => state.auth.tenantName);

  const dispatch = useDispatch();

  return (
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-white">{tenantName} Chat</div>
        </div>
    
        <div className="flex items-center gap-4">
          <IoVideocamOutline 
          size={20}
          className="cursor-pointer"
          /> 
          <RxCross2 
            className="cursor-pointer"            
            size={20}
            onClick={()=>{
              dispatch(setWidgetView({
                type: WIDGETSCREENS.chatClose
              }))
            }}
          />
        </div>
      </div>
  )
}

export default ChatHeader