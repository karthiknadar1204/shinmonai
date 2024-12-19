import React from 'react'
import { UserMessage, BotMessage } from "@/components/llm-crypto/message";
import type { UIState } from '@/app/actions';

const ChatList = ({ messages }: { messages: UIState[number][] }) => {
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          message.role === 'user' ? (
            <UserMessage key={`${message.role}-${message.content}`}>
              <p>{message.content}</p>
            </UserMessage>
          ) : (
            <BotMessage key={`${message.role}-${message.content}`}>
              {message.display || <p>{message.content}</p>}
            </BotMessage>
          )
        ))}
      </div>
    </div>
  )
}

export default ChatList
