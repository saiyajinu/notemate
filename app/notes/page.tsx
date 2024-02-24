"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Note from "@/components/Note";
import NoteFilter from "@/components/NoteFilter";
import { useRouter } from "next/navigation";

const Notes = () => {
  const [popupBool, setPopupBool] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: session, status } = useSession();

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

  const deleteNote = async (noteid: string) => {
    try {
      if (session?.user) {
        const res = await fetch(`/api/note/delete/${noteid}`, {
          method: "DELETE",
        });
        if (res.ok) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [userNotes, setUserNotes] = useState([]);
  const router= useRouter()
  useEffect(() => {
  
    if (status === "unauthenticated") {
      router.push("/");
    }

    const fetchPosts = async (id: string | undefined) => {
      const response = await fetch(`/api/note/get/${id}`);
      const data = await response.json();
      console.log(data);

      setUserNotes(data);
    };

    if (session?.user) fetchPosts(session.user.id);
  }, [session?.user, session?.user?.id, router, status]);

  const [filter, setFilter] = useState("");

  const isNoteMatchingFilter = (note: any) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      note.title?.toLowerCase().includes(lowerCaseFilter) ||
      note.content?.toLowerCase().includes(lowerCaseFilter)
    );
  };

  return (
    <section className="">
      <div className="text-center">
        <NoteFilter filter={filter} setFilter={setFilter} />
      </div>
      <div className="flex gap-2 flex-row flex-wrap justify-evenly mt-8 my-2">
        {userNotes.filter(isNoteMatchingFilter).map((note: any) => {
          return (
            <Note
              deleteNote={deleteNote}
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.Content}
            />
          );
        })}
      </div>

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createNote(e);
              }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Add a new Note
              </h2>
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your note's title here"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your note's content here"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-600 font-semibold"
                disabled={submitting}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notes;
