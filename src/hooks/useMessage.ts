import { useCallback, useState } from "react";


const sendMessageToBackend =  async (messageText: string)=>{
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/query`,{
            method: 'POST',
            body: JSON.stringify({ message: messageText }),
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
}


export const useMessage = ()=>{

    const [messages, setMessages] = useState<{
        id: string;
        text: string;
        sender: "user" | "assistant";
        createdAt: Date;
    }[]>([{
        id: "1",
        text: "Hello, how can I help you?",
        sender: "assistant",
        createdAt: new Date(),
    }]);


    const [loading,setLoading] = useState(false);


    const addMessage = useCallback(async (message: {
        text: string;
        sender: "user" | "assistant";
    }) => {
        
        setMessages((prev) => [
            ...prev,
            {
                id: `${prev.length + 1}`,
                text: message.text,
                sender: message.sender,
                createdAt: new Date(),
            },
        ]);

        if(message.sender == "user"){
            setLoading(true);
            const assistantMsg = await sendMessageToBackend(message.text);
            setMessages((prev)=>[
                ...prev,
                {
                    id: `${prev.length + 1}`,
                    text: assistantMsg,
                    sender: "assistant",
                    createdAt: new Date(),
                },
            ])
            setLoading(false);
        }

    },[]);

    return {
        messages,
        addMessage,
        loading
    };
}