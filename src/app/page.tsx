"use client";

import React from 'react'
import { env } from '@/env'
import ChatList from '@/components/chat-list'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useForm } from '@/lib/use-form'
import { ChatInputs } from '@/lib/chat-schema'
import { useEffect, useRef } from "react";
import { useUIState } from "ai/rsc";
import { useEnterSubmit } from '@/lib/use-enter-submit';

const Page = () => {
  const [messages, setMessages] = useUIState<typeof AI>();
  // const { sendMessage } = useActions<typeof AI>();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<ChatInputs>()
  const onSubmit = async (data: ChatInputs) => {
    console.log(data)
  }

  return (
    <main>
      <div className="pb-[200px] pt-4 md:pt-10">
        <ChatList messages={[]} />
        <ChatScrollAnchor />
      </div>
      <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="px-4 flex justify-center flex-col py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4 bg-white">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Form content goes here */}
              hello this is a chatbot
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page