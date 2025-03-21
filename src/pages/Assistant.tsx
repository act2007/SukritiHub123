
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, User, Bot, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const Assistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there, I'm MeNova, your AI companion for menopause. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const assistantResponses = [
        "During menopause, it's common to experience symptoms like hot flashes, night sweats, and mood changes. Would you like to know more about managing these symptoms?",
        "Regular exercise can help manage many menopause symptoms. Even 30 minutes of moderate activity daily can make a difference!",
        "Staying hydrated is important during menopause. Try to drink at least 8 glasses of water daily to help with hot flashes.",
        "Many women find that practicing mindfulness and relaxation techniques helps with the emotional aspects of menopause.",
        "Have you tried tracking your symptoms? It can help identify patterns and triggers, which is useful when discussing with healthcare providers."
      ];
      
      const randomResponse = assistantResponses[Math.floor(Math.random() * assistantResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">AI Assistant</h1>
        <Button variant="outline">
          <Info size={16} className="mr-2" />
          How it Works
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        <div className="lg:col-span-3 flex flex-col h-full">
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Your Menopause Companion</AlertTitle>
            <AlertDescription>
              I'm here to provide information, support, and guidance through your menopause journey. 
              Feel free to ask me anything about symptoms, treatments, or coping strategies.
            </AlertDescription>
          </Alert>

          <div className="flex-1 border border-border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 bg-muted border-b border-border">
              <div className="flex items-center">
                <MessageCircle size={18} className="mr-2" />
                <h2 className="font-medium">Conversation</h2>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.sender === "assistant" ? (
                        <Bot size={14} className="mr-1" />
                      ) : (
                        <User size={14} className="mr-1" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === "user" ? "You" : "MeNova"}
                      </span>
                      <span className="text-xs ml-2 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-border">
              <div className="flex items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="mr-2"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  size="icon"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <div className="border border-border rounded-lg p-4 h-full overflow-y-auto">
            <h3 className="font-medium mb-3">Suggested Topics</h3>
            <div className="space-y-2">
              {[
                "What are common menopause symptoms?",
                "How long does menopause last?",
                "Natural remedies for hot flashes",
                "Managing sleep problems",
                "Exercise recommendations",
                "Diet changes that help",
                "Mental health during menopause",
                "When to see a doctor",
                "Hormone replacement therapy"
              ].map((topic, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    setInput(topic);
                  }}
                >
                  <span className="truncate">{topic}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Assistant;
