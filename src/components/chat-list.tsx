import React from 'react'
// import type { UIState } from "@ai-rsc/app/actions";
import { UserMessage, BotMessage } from "@/components/llm-crypto/message";
import { UIState } from '@/app/actions';

const ChatList = ({ messages }: { messages: UIState[number][] }) => {
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-3">
        {messages.map((message, index) => (
          message.role === 'user' ? (
            <UserMessage key={index}>
              <p>{message.content}</p>
            </UserMessage>
          ) : (
            <BotMessage key={index}>
              <p>{message.content}</p>
            </BotMessage>
          )
        ))}
      </div>
    </div>
  )
}

export default ChatList
