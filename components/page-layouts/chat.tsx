// "use client";

// import { pdfjs, Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import { useState } from "react";
// import type { PDFDocumentProxy } from "pdfjs-dist";
// import { useChat } from "ai/react";

// if (typeof window !== "undefined") {
//   pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.js",
//     import.meta.url
//   ).toString();
// }

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// };

// type PDFFile = string | File | null;

// export default function Chat() {
//   const [file, setFile] = useState<PDFFile>(null);
//   const [text, setText] = useState<string>("");
//   const [numPages, setNumPages] = useState<number>();
//   const [selected, setSelected] = useState<boolean>(false);

//   const { messages, setMessages, input, handleInputChange, handleSubmit } =
//     useChat();

//   function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
//     const { files } = event.target;

//     if (files && files[0]) {
//       setFile(files[0] || null);
//     }

//     setSelected(true);
//   }

//   function removeFile(): void {
//     setFile(null);
//     setSelected(false);
//   }

//   async function onDocumentLoadSuccess(
//     pdfDocument: PDFDocumentProxy
//   ): Promise<void> {
//     try {
//       const promises = [];

//       for (
//         let pageNumber = 1;
//         pageNumber <= pdfDocument.numPages;
//         pageNumber++
//       ) {
//         promises.push(
//           pdfDocument.getPage(pageNumber).then((page) => page.getTextContent())
//         );
//       }

//       const allTextContents = await Promise.all(promises);

//       const extractedText = allTextContents
//         .flatMap((textContent) =>
//           // @ts-ignore
//           textContent.items.map((item) => item.str).join(" ")
//         )
//         .join("\n");

//       const initialPrompt =
//         "The following is the content of a PDF: " + extractedText;

//       setText("The following is the content of a PDF:" + initialPrompt);

//       console.log(extractedText);
//       setText(initialPrompt);
//       setNumPages(pdfDocument.numPages);

//       const initialMessage = {
//         id: "initial_message",
//         role: "user",
//         content:
//           "You are an AI chatbot designed specifically for answering questions about PDFs. The following is the contents of a PDF: " +
//           extractedText,
//       };

//       setMessages([initialMessage, ...messages]);
//     } catch (error) {
//       console.error("Error extracting text from PDF:", error);
//     }
//   }

//   return (
//     <>
//       <div className="flex">
//         <div className="overflow-auto h-screen border-r">
//           {!selected ? (
//             <div className="flex flex-col items-center">
//               <div className="mt-12">
//                 <div className="px-6 sm:px-6 lg:px-8">
//                   <div className="mx-auto max-w-2xl text-center">
//                     <h2 className="text-3xl font-bold tracking-tightsm:text-4xl">
//                       Welcome to{" "}
//                       <span className="text-primary">DocuTalkAI</span>
//                       <br />
//                       <br />A free AI chatbot for your PDFs and documents.
//                     </h2>
//                     <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
//                       PDF Chat is a free AI chatbot that can answer questions
//                       about your PDFs. Simply upload a PDF and start chatting.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : null}

//           <div className="mt-12">
// {file ? (
//   <div className="flex flex-col items-center mb-16">
//     {file && (
//       <Document
//         file={file}
//         onLoadSuccess={onDocumentLoadSuccess}
//         options={options}
//       >
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page
//             key={`page_${index + 1}`}
//             pageNumber={index + 1}
//             className="w-full"
//           />
//         ))}
//       </Document>
//     )}
//   </div>
// ) : (
//   <input type="file" onChange={onFileChange} />
// )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import React from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useChat } from "ai/react";
import PDFUploader from "@/components/chat/pdf-uploader";
import { TextStreaming } from "../animations/text-streaming";
import { MessageInput } from "@/components/chat/message-input";
import SplitPane, { Pane } from "react-split-pane-next";
import MessageList from "@/components/chat/message-list";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconOpenAI } from "../ui/icons";
import { Toaster, toast } from "sonner";

type PDFFile = string | File | null;

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
}

export default function ChatLayout() {
  const [file, setFile] = useState<PDFFile>(null);
  const [text, setText] = useState<string>("");
  const [numPages, setNumPages] = useState<number>();
  const [selected, setSelected] = useState<boolean>(false);

  const { messages, setMessages, input, handleInputChange, handleSubmit } =
    useChat();

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }

    setSelected(true);
  }

  function removeFile(): void {
    setFile(null);
    setSelected(false);
  }

  async function onDocumentLoadSuccess(
    pdfDocument: PDFDocumentProxy
  ): Promise<void> {
    try {
      const promises = [];

      for (
        let pageNumber = 1;
        pageNumber <= pdfDocument.numPages;
        pageNumber++
      ) {
        promises.push(
          pdfDocument.getPage(pageNumber).then((page) => page.getTextContent())
        );
      }

      const allTextContents = await Promise.all(promises);

      const extractedText = allTextContents
        .flatMap((textContent) =>
          // @ts-ignore
          textContent.items.map((item) => item.str).join(" ")
        )
        .join("\n");

      const initialPrompt =
        "The following is the content of a PDF: " + extractedText;

      setText("The following is the content of a PDF:" + initialPrompt);

      console.log(extractedText);
      setText(initialPrompt);
      setNumPages(pdfDocument.numPages);

      const initialMessage = {
        id: "initial_message",
        role: "user",
        content:
          "You are an AI chatbot designed specifically for answering questions about PDFs. The following is the contents of a PDF: " +
          extractedText,
      };
      //   @ts-ignore
      setMessages([initialMessage, ...messages]);
      toast.success(
        "PDF successfully uploaded! The AI now knows about your PDF. Start chatting!"
      );
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
    }
  }
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-hidden">
      <SplitPane>
        {/* @ts-ignore */}
        <Pane initialSize="50%">
          <div className="h-full overflow-y-auto">
            <PDFUploader
              file={file}
              onFileChange={onFileChange}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              numPages={numPages}
              removeFile={removeFile}
              selected={selected}
            />
          </div>
        </Pane>
        {/* @ts-ignore */}
        <Pane initialSize="50%">
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-auto">
              {messages.length > 0 ? (
                messages.map((m, index) => (
                  <MessageList key={m.id} m={m} index={index} />
                ))
              ) : (
                <div className="flex mt-2 px-2">
                  <Avatar className="mr-1 bg-primary text-white dark:text-black">
                    <AvatarFallback>
                      <IconOpenAI />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-md bg-primary text-primary-foreground">
                    <span>
                      Welcome to PDF Chat, a free AI chatbot for your PDFs.
                      <br />
                      <br />
                      To get started, simply upload a PDF.
                      <br />
                      <br />
                      You can start a conversation here or try the following
                      examples:
                      <br />
                      <br />
                      &rarr; Give a quick summary of the PDF.
                      <br />
                      &rarr; What page does the PDF talk about X?
                      <br />
                      &rarr; Using your given knowledge as well as the PDF,
                      answer the following question: X?
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 px-2">
              <MessageInput
                input={input}
                handleInputChange={handleInputChange}
                isLoading={false}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </Pane>
      </SplitPane>

      <Toaster richColors position="top-center" />
    </div>
  );
}
