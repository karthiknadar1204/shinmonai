"use client";

import React, { useEffect, useRef } from "react";
import { useActions, useUIState } from "ai/rsc";
import { useForm } from "@/lib/use-form";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowDownIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AI } from "./actions";
import { UserMessage } from "@/components/llm-crypto/message";
import ChatList from "@/components/chat-list";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { ChatInputs } from "@/lib/chat-schema";

const Page = () => {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<ChatInputs>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        if (
          e.target &&
          ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).nodeName)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  const submitHandler = async (data: ChatInputs) => {
    const value = data.message.trim();
    formRef.current?.reset();
    if (!value) return;

    // Add user message UI
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        content: value,
      },
    ]);

    try {
      // Submit and get response message
      const responseMessage = await sendMessage(value);
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
    } catch (error) {
      // You may want to show a toast or trigger an error state.
      console.error(error);
    }
  };

  return (
    <main>
      <div className="pb-[200px] pt-4 md:pt-10">
        <ChatList messages={messages} />
        <ChatScrollAnchor />
      </div>
      <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="px-4 flex justify-center flex-col py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4 bg-white">
            <form ref={formRef} onSubmit={form.handleSubmit(submitHandler)}>
              <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border">
                <TextareaAutosize
                  ref={inputRef}
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder="Send a message."
                  className="min-h-[60px] w-full resize-none bg-transparent pl-4 pr-16 py-[1.3rem] focus-within:outline-none sm:text-sm"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  rows={1}
                  {...form.register("message")}
                />
                <div className="absolute right-0 top-4 sm:right-4">
                  <Button
                    type="submit"
                    size="icon"
                    disabled={form.watch("message") === ""}
                  >
                    <ArrowDownIcon className="w-5 h-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </form>
            <Button
              variant="outline"
              size="lg"
              className="p-4 mt-4 rounded-full bg-background"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Chat</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
