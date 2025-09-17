"use client"
import { useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState<string>("");
  const [progressValue, setProgressValue] = useState<number>(13);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSummary("");
    setProgressValue(30); 

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("http://127.0.0.1:8000/api/summarize", {
      method: "POST",
      body: formData,
    });

    setProgressValue(70); 
    const result = await response.json();
    setProgressValue(100);
    setLoading(false);
    setSummary(result.summary);
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="p-8 w-full flex flex-col items-center ">
        <div className="text-center space-y-5">
          <h1 className="font-bold text-5xl">Welcome to Briefly!</h1>
          <p className="text-2xl">Your AI-powered summary tool.</p>
        </div>

        <div className="w-full">
          <form method="post" onSubmit={(e) => handleSubmit(e)} className="w-full mt-8 flex flex-col items-center">
            <input
              type="url"
              name="url"
              placeholder="Enter article URL"
              required
              className="w-11/12 sm:w-4/6 md:w-1/2 lg:w-2/5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Summarize
            </button>
          </form>
        </div>

        {summary && (<div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
          <h2 className="font-bold text-2xl mt-8">Summary:</h2>
          <p className="text-lg mt-4">{summary}</p>
        </div>)}

        {loading && (
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 mt-6">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gray-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
