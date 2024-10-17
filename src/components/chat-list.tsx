import React from 'react'
import type { UIState } from "@ai-rsc/app/actions";

const ChatList = ({ messages }: { messages: UIState[number][] }) => {
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-3">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  )
}

export default ChatList   
