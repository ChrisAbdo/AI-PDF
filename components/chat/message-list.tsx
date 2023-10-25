import React from "react";
import { TextStreaming } from "../animations/text-streaming";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconOpenAI } from "../ui/icons";

export default function MessageList({ m }: any) {
  return (
    <div key={m.id} className="px-2 mt-2">
      <div className={m.role === "user" ? "flex gap-1 mb-2" : "flex mb-2"}>
        {m.role === "user" ? null : (
          <Avatar className="mr-1 bg-primary text-white dark:text-black">
            <AvatarFallback>
              <IconOpenAI />
            </AvatarFallback>
          </Avatar>
        )}

        {m.role === "user" ? (
          <>
            {!m.content.includes("You are an AI") && (
              <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-muted text-foreground ">
                <div className="whitespace-pre-wrap">
                  <TextStreaming content={m.content} />
                </div>
              </div>
            )}
            {!m.content.includes("You are an AI") && (
              <Avatar className="bg-muted">
                <AvatarFallback>
                  <IconOpenAI />
                </AvatarFallback>
              </Avatar>
            )}
          </>
        ) : (
          <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-primary text-primary-foreground">
            <div className="whitespace-pre-wrap">
              <TextStreaming content={m.content} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
