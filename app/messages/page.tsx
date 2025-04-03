"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

// Mock conversations data
const conversations = [
  {
    id: 1,
    user: {
      id: 1,
      username: "johndoe",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    lastMessage: {
      text: "Hey, how are you doing?",
      timestamp: "10:30 AM",
      isRead: true,
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      username: "janedoe",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
    },
    lastMessage: {
      text: "Did you see the new post?",
      timestamp: "Yesterday",
      isRead: false,
    },
  },
  {
    id: 3,
    user: {
      id: 3,
      username: "mike_smith",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    lastMessage: {
      text: "Let's meet up this weekend!",
      timestamp: "Yesterday",
      isRead: true,
    },
  },
]

// Mock messages for a conversation
const mockMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hey, how are you doing?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    senderId: 0, // current user
    text: "I'm good! Just working on some new photos.",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    senderId: 1,
    text: "That's awesome! Can't wait to see them.",
    timestamp: "10:33 AM",
  },
  {
    id: 4,
    senderId: 0, // current user
    text: "I'll post them later today. How about you?",
    timestamp: "10:35 AM",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      senderId: 0, // current user
      text: newMessage,
      timestamp: "Just now",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  return (
    <MainLayout>
      <Card className="flex h-[calc(100vh-120px)] overflow-hidden">
        {/* Conversations List */}
        <div className="w-full sm:w-1/3 border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Messages</h2>
          </div>
          <ScrollArea className="h-[calc(100%-57px)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-accent ${
                  selectedConversation === conversation.id ? "bg-accent" : ""
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.user.avatar} alt={conversation.user.username} />
                    <AvatarFallback>{conversation.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {conversation.user.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{conversation.user.username}</p>
                    <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                  </div>
                  <p
                    className={`text-sm truncate ${!conversation.lastMessage.isRead ? "font-semibold" : "text-muted-foreground"}`}
                  >
                    {conversation.lastMessage.text}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="hidden sm:flex flex-col w-2/3">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={conversations.find((c) => c.id === selectedConversation)?.user.avatar}
                    alt={conversations.find((c) => c.id === selectedConversation)?.user.username}
                  />
                  <AvatarFallback>
                    {conversations
                      .find((c) => c.id === selectedConversation)
                      ?.user.username.charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {conversations.find((c) => c.id === selectedConversation)?.user.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conversations.find((c) => c.id === selectedConversation)?.user.isOnline ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 0 ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === 0 ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === 0 ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Your Messages</h3>
                <p className="text-sm text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </MainLayout>
  )
}

