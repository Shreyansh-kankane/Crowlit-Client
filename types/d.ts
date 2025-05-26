
type ChatMessage = {
    id: string;
    text: string | undefined;
    sender: "user" | "ai-assistant" | "assistant";
    nodeType: "options" | "heading";
    isParentNull: boolean;
    isLeaf?: boolean;
    childrenHeadings?: string;
    switchToAI? : boolean;
    createdAt: Date;
}

export type { ChatMessage };