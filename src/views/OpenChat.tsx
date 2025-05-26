import ChatHeader from "../components/chatbot/ChatHeader";
import ChatMessages from "../components/chatbot/ChatMessages";
import InputMessage from "../components/chatbot/InputMessage";

import { useMessage } from "../hooks/useMessage";


function Chatbot({sessionId}:{sessionId: number}) {

  
  const {messages, addMessage, loading, fetchNodes, addMessageInChat, switchToAIAgent } = useMessage();
  return (
      <div className="relative w-96 z-50">
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-75 blur-xl animate-pulse"/>
          <div className="relative rounded-xl border border-white/20 bg-black/40 backdrop-blur-xl p-1 shadow-2xl">
            <div className="rounded-lg bg-black/60 p-4">
              <ChatHeader />
              <ChatMessages messages={messages} loading={loading} fetchNodes={fetchNodes} addMessageInChat={addMessageInChat} switchToAIAgent={switchToAIAgent} sessionId={sessionId}/>
              <InputMessage addMessage={addMessage}/>
            </div>
          </div>

          <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-purple-500 blur-3xl opacity-20 animate-pulse -z-10"></div>
          <div className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-blue-500 blur-3xl opacity-20 animate-pulse"></div>
      </div>
  )
}

export default Chatbot