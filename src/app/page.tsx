"use client";

import React, { useEffect } from "react";
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
import { ModeToggle } from "@/components/mode-toggle";

const Page = () => {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const { formRef: enterFormRef, onKeyDown } = useEnterSubmit();
  const form = useForm<ChatInputs>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target as Element)?.matches("input, textarea")) {
        e.preventDefault();
        e.stopPropagation();
        const textarea = document.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
        textarea?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const submitHandler = async (data: ChatInputs) => {
    const value = data.message.trim();
    enterFormRef.current?.reset();
    if (!value) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        content: value,
        display: <UserMessage><p>{value}</p></UserMessage>
      },
    ]);

    try {
      const responseMessage = await sendMessage(value);
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <div className="pb-[200px] pt-4 md:pt-10">
        <ChatList messages={messages} />
        <ChatScrollAnchor />
      </div>
      <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80">
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="px-4 flex justify-center flex-col py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4">
            <form ref={enterFormRef} onSubmit={form.handleSubmit(submitHandler)}>
              <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border">
                <TextareaAutosize
                  {...form.register("message")}
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder="Send a message."
                  className="min-h-[60px] w-full resize-none bg-transparent pl-4 pr-16 py-[1.3rem] focus-within:outline-none sm:text-sm"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  rows={1}
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
