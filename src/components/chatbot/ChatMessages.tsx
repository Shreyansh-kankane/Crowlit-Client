'use client'
import { useSelector } from "react-redux";

import { useState, useEffect } from "react";

import {ChatMessage} from "../../../types/d";

function ChatMessages({messages, loading, fetchNodes, addMessageInChat, switchToAIAgent, sessionId}: {
    messages: ChatMessage[]
    loading: boolean;
    fetchNodes: (parentId?: string) => void;
    addMessageInChat: (message: ChatMessage) => void;
    switchToAIAgent: (message: ChatMessage, sessionId: number)=> void;
    sessionId: number;
}
) {
    
    const tenantAssets = useSelector((state: any) => state.auth.tenantAssets);

    const onClickNode = (message: ChatMessage) => {

        console.log("sessionId", sessionId);
       
        if(!message.isLeaf){
            addMessageInChat({
                id: message.id  + "-user",  
                text: message.text,
                sender: "user",
                nodeType: "heading",
                isParentNull: message.isParentNull,
                createdAt: new Date(),
            });

            addMessageInChat({
                id: message.id  + "-sender",
                text: message.childrenHeadings,
                sender: "assistant",
                nodeType: "heading",
                isParentNull: message.isParentNull,
                createdAt: new Date(),
            });
            fetchNodes(message.id);
        }else if(message.switchToAI){
            switchToAIAgent(message,sessionId);
        }
    }
    

  return (
    <div className="space-y-4 py-4 overflow-y-auto hide-scrollbar max-h-96">
        <div className="flex flex-col gap-3">
        {messages.map((message)=>{
            return (
                <div key={message.id} className={`flex items-center gap-3 ${message.sender === "user" ? "justify-end" : ""}`}>
                    {message.sender === "assistant" && (
                        <div className="flex items-center gap-3">
                            <img src={tenantAssets?.brand_logo_small_url}
                                alt="Logo"
                                className="h-8 w-8 rounded-full object-cover"
                                />
                            <div className={`rounded-lg bg-purple-500/20 p-2 text-sm max-w-[80%] text-white backdrop-blur-sm`}>
                                {message.text}
                            </div>

                        </div>
                    )}
                    {message.sender === "ai-assistant" && (
                        <div className="flex items-center gap-3" >
                            {
                                message.nodeType !== "options" &&
                                    <img src={tenantAssets?.brand_logo_small_url}
                                        alt="Logo"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                            }
                            {
                                message.isParentNull && (
                                    <div className={`rounded-lg bg-purple-500/20 p-2 text-sm max-w-[80%] text-white backdrop-blur-sm`}>
                                        Please Select below options to continue
                                    </div>
                                ) 
                            }
                            {message.nodeType === "heading" ? (
                                <div className={`rounded-lg bg-purple-500/20 p-2 text-sm max-w-[80%] text-white backdrop-blur-sm`}>
                                    {message.text}
                                </div>
                            ) : (
                                <div className={`rounded-lg p-2 text-xs bg-[#A855F7] text-white cursor-pointer`}
                                onClick={onClickNode.bind(null, message)}>
                                    {message.text}
                                </div>
                            )}
                        </div>)
                    }
                    {message.sender === "user" && (
                        <div className={`rounded-lg bg-purple-500/20 p-2 text-sm max-w-[80%] text-white backdrop-blur-sm text-center`}>
                            {message.text}
                        </div>
                    )}
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