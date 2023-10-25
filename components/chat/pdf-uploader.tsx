"use client";

import React from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useChat } from "ai/react";

import { HomeIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const pdfs = [
  {
    name: "Bitcoin Whitepaper",
    role: "Front-end Developer",
  },
  {
    name: "Courtney Henry",
    role: "Designer",
  },
  {
    name: "Tom Cook",
    role: "Director of Product",
  },
];

export default function PDFUploader({
  file,
  onFileChange,
  onDocumentLoadSuccess,
  numPages,
  removeFile,
  selected,
}: {
  file: any;
  onFileChange: any;
  onDocumentLoadSuccess: any;
  numPages: any;
  removeFile: any;
  selected: any;
}) {
  return (
    <>
      {!file ? (
        <div className="mx-auto max-w-sm">
          <div>
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
                Upload a PDF
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                PDF Chat is a free AI chatbot that can answer questions about
                your PDFs. Simply upload a PDF and start chatting.
              </p>
            </div>

            <div className="mt-6 flex">
              <Input type="file" onChange={onFileChange} />
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-500">
              Don&apos;t have a PDF? Try a sample &darr;
            </h3>
            <ul
              role="list"
              className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {pdfs.map((person, personIdx) => (
                <li
                  key={personIdx}
                  className="flex items-center justify-between space-x-3 py-4"
                >
                  <div className="flex min-w-0 flex-1 items-center space-x-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {person.name}
                      </p>
                      <p className="truncate text-sm font-medium text-gray-500">
                        {person.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900"
                    >
                      <HomeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Invite <span className="sr-only">{person.name}</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className="w-full"
            />
          ))}
        </Document>
      )}
    </>
  );
}
