"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Notes = () => {
  const [popupBool, setPopupBool] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = useSession();

  const createNote = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (session?.user) {
        const res = await fetch("/api/note/new", {
          method: "POST",
          body: JSON.stringify({
            userId: session?.user.id,
            title: title,
            content: content,
            
          }),
        });
        if (res.ok) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="">
      <div
        onClick={() => setPopupBool(true)}
        className="absolute bottom-10 right-10 w-16 h-16 bg-[#005241] rounded-full flex items-center justify-center cursor-pointer transition-colors text-white text-3xl duration-300 ease-in-out transform hover:bg-[#007253] hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </div>

      <div
        className={!popupBool ? "invisible" : "visible"}
        onClick={() => setPopupBool(false)}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white p-8 rounded-lg shadow-lg relative max-w-md w-full"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900"
              onClick={() => setPopupBool(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add a new Note
            </h2>
            <input
              type="text"
              className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
              placeholder="Your note's title here"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
              placeholder="Your note's content here"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 font-semibold"
              disabled={submitting}
              onClick={(e) => createNote(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notes;
