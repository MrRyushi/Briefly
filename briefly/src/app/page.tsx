"use client"
import { use, useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("http://127.0.0.1:8000/api/summarize", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    setSummary(result.summary);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div>
        <div className="text-center">
          <h1 className="font-bold text-5xl">Welcome to Briefly!</h1>
          <p className="text-2xl">Your AI-powered summary tool.</p>
        </div>

        <div>
          <form method="post" onSubmit={(e) => handleSubmit(e)} className="mt-8 flex flex-col items-center">
            <textarea
              name="text"
              placeholder="Enter news article to summarize..."
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={10}
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Summarize
            </button>
          </form>
        </div>

        {/*Summary Result*/}
        {summary && (<div>
          <h2 className="font-bold text-3xl mt-8">Summary:</h2>
          <p className="text-xl mt-4">{summary}</p>
        </div>)}
      </div>
    </div>
  );
}
