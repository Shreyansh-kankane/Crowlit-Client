import { useCallback, useEffect, useState, useRef } from "react";

import axios from "axios";
import { ChatMessage } from "../../types/d";

export const useMessage = ()=>{

    const [messages, setMessages] = useState<ChatMessage[]>([
    {
        id: "1",
        text: "Please select issue of your concern",
        sender: "ai-assistant",
        createdAt: new Date(),
        nodeType: "heading",
        isLeaf: false,
        isParentNull: false,
    }]);
    const [loading,setLoading] = useState(false);
    const [isSwitchToAI, setSwitchToAI] = useState(false);
    const [ticketId, setTicketId] = useState<number | null>(null);
    const [, setLatestUserMessageId] = useState<Number | null>(0);
    const [lastMessageId, setLastMessageId] = useState<Number | null>(0);


    const sendUserChatMessage =  useCallback( async (messageText: string, sessionId: number)=>{
        try {
            const res = await fetch(`${import.meta.env.VITE_AI_BACKEND_URI}/chat/send`,{
                method: 'POST',
                body: JSON.stringify({
                    support_ticket_id: ticketId || parseInt(localStorage.getItem("ticketId") || "0"),
                    message: messageText,
                    user_id: sessionId,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer"
                },
            })
            const resBody = await res.json();
            return resBody.message;
        } catch (error) {
            
            console.log(error);
            return "Sorry we are down right now!"
        }
    },[])

    const getNodes = useCallback (async (nodeID: string | undefined) => {
        try {
            // Prepare request body - empty object if nodeID is undefined, otherwise include nodeID
            const requestBody = nodeID ? { nodeID: nodeID } : {};

            console.log("Request Body:", requestBody);
            
            const response = await axios.post(`${import.meta.env.VITE_AI_BACKEND_URI}/nodes`, requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            return response.data;
        } catch (error: any) {
            console.error('Error fetching nodes:', error.message);
            throw error;
        }
    },[])

// Option 1: Using useRef to store the latest lastMessageId
const lastMessageIdRef = useRef(lastMessageId);

// Update ref whenever lastMessageId changes
useEffect(() => {
    lastMessageIdRef.current = lastMessageId;
}, [lastMessageId]);

 setInterval(() => {
    if (ticketId != null) {
        console.log("Fetching latest messages for ticketId:", ticketId);
        axios.get(`${import.meta.env.VITE_AI_BACKEND_URI}/chat/latest?support_ticket_id=${ticketId}&last_chat_id=${lastMessageIdRef.current}`)
            .then((res) => {
                const latestMessages = res.data;
                if (latestMessages.length > 0) {
                    const lastMessage = latestMessages[latestMessages.length - 1];
                    console.log("Latest Message:", lastMessage.id);
                    console.log("Current Last Message ID:", lastMessageIdRef.current);
                    
                    if (lastMessage.id !== lastMessageIdRef.current && lastMessage.is_admin) {
                        // Update both state and ref
                        setLastMessageId(lastMessage.id);
                        lastMessageIdRef.current = lastMessage.id;
                        setLoading(false);
                        addMessageInChat({
                            id: lastMessage.id,
                            text: lastMessage.message,
                            sender: "assistant",
                            nodeType: "options",
                            isParentNull: false,
                            createdAt: new Date(),
                        });
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching latest messages:", error);
            });
    }
}, 10000);

    // fetch nodes from backend
    const fetchNodes = useCallback(async (nodeID: string | undefined) => {
        try {
                setLoading(true);
                const nodes = await getNodes(nodeID);

                console.log("Fetched Nodes:", nodes);

                setMessages((prev) => [
                    ...prev,
                    ...nodes.map((node: any) => ({
                        id: node.id,
                        text: node.title,
                        sender: "ai-assistant",
                        nodeType: "options",
                        isParentNull: node.parentId === null,
                        isLeaf: node.is_leaf,
                        createdAt: new Date(),
                        switchToAI: node.switches_to_ai_agent || false,
                        childrenHeadings: node.children_heading || "",
                    })),
                ]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching nodes:", error);
            }
        }, 
    []);

    
    const addMessage = useCallback(async (message: {text: string; sender: "user" | "assistant",  sessionId: number}) => {
        
        setMessages((prev) => [
            ...prev,
            {
                id: `${prev.length + 1}`,
                text: message.text,
                sender: message.sender,
                createdAt: new Date(),
                nodeType: "options",
                isParentNull: false,
            },
        ]);

        if(message.sender == "user"){
            setLoading(true);
            const assistantMsg = await sendUserChatMessage(message.text, message.sessionId);
            confirm("Message sent successfully "+assistantMsg.chat_id);
            setLatestUserMessageId(assistantMsg.chat_id);
            setLastMessageId(assistantMsg.chat_id);
        }
    },[]);

    const addMessageInChat = useCallback((message: ChatMessage) => {
        setMessages((prev) => [
            ...prev,
            message,
        ]);
    }, []);


    const switchToAIAgent = useCallback(async ( sessionId: number)=>{
        setMessages((prev) => [
            ...prev,
            {
                id: `${prev.length + 1}`,
                text: "Our Agent is joining",
                sender: "ai-assistant",
                createdAt: new Date(),
                nodeType: "heading",
                isLeaf: false,
                isParentNull: false,
            },
            {
                id: `${prev.length + 1}`,
                text: "Sushil has joined",
                sender: "ai-assistant",
                createdAt: new Date(),
                nodeType: "heading",
                isLeaf: false,
                isParentNull: false,
            },
        ]);

        const requestBody = {
            "user_id": sessionId,
            "category": "payment",
            "context": "payment related issue"
        }
        
        const res = await axios.post(`${import.meta.env.VITE_AI_BACKEND_URI}/support/create/ticket`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const ticketId = res.data.ticket_id;
        setTicketId(ticketId);
        localStorage.setItem("ticketId", ticketId);
        setSwitchToAI(true);
    },[])

    useEffect(()=>{
        // Initial fetch of nodes
        fetchNodes(undefined);
    },[]);

    return {
        messages,
        addMessage,
        loading,
        fetchNodes,
        addMessageInChat,
        switchToAIAgent,
        isSwitchToAI
    };
}