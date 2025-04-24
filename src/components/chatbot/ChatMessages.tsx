import { useSelector } from "react-redux";

function ChatMessages({messages, loading}: {
    messages: {
        id: string;
        text: string;
        sender: "user" | "assistant";
        createdAt: Date;
    }[]
    loading: boolean;}
) {
    
    const tenantAssets = useSelector((state: any) => state.auth.tenantAssets);
    

  return (
    <div className="space-y-4 py-4 overflow-y-auto hide-scrollbar max-h-96">
        <div className="flex flex-col gap-3">
        {messages.map((message)=>{
            return (
                <div key={message.id} className={`flex items-center gap-3 ${message.sender === "user" ? "justify-end" : ""}`}>
                    {message.sender === "assistant" && (
                       <img src={tenantAssets?.brand_logo_small_url}
                       alt="Logo"
                       className="h-8 w-8 rounded-full object-cover"
                     />
                    )}
                    <div className={`rounded-lg ${message.sender === "user" ? "bg-purple-500/20" : "bg-white/10"} p-3 text-sm max-w-[80%] text-white backdrop-blur-sm`}>
                        {message.text}
                    </div>
                </div>
            )
        })}
        {loading && (
            <div className="flex gap-3 items-center">
                {/* <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    C
                </div> */}
                <img src={tenantAssets?.brand_logo_small_url}
                    alt="Logo"
                    className="h-8 w-8 rounded-full object-cover"
                />
               {/* typing animation */}
                <div className="rounded-lg bg-white/10 p-3 text-sm max-w-[80%] text-white backdrop-blur-sm animate-pulse">
                    <div className="h-2 w-24 bg-white/20 rounded-full mb-2"></div>
                    <div className="h-2 w-16 bg-white/20 rounded-full mb-2"></div>
                    <div className="h-2 w-32 bg-white/20 rounded-full"></div>
                </div>

            </div>
        )}
        </div>
    </div>
  )
}

export default ChatMessages