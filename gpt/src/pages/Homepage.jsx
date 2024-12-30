import React, { useState } from "react";

function Homepage() {
  const [data, setData] = useState({
    prompt: "",
  });
  const [ans, setAns] = useState("");

  const [loading1, setLoading1] = useState("Submit");

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const loading = () => {
    setLoading1("Generating...");
  };

  const apicall = async () => {
    console.log(data);
    let response = await fetch("http://localhost:3000/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.prompt,
      }),
    });

    let data1 = await response.json();
    console.log(data1);
    setAns(data1.generated_text);
    setLoading1("Submit");
  };

  const handleinput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    loading();
    apicall();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      {/* Header Section */}
      <header className="text-center py-6 bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 shadow-md">
        <h1 className="text-5xl font-extrabold tracking-widest">
          <span className="text-yellow-300">Rimal</span>{" "}
          <span className="text-pink-300">GPT</span>
        </h1>
        <p className="text-lg italic opacity-90 mt-2">
          Your AI-powered assistant!
        </p>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center pt-12 px-4">
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          Ask Anything Here! 😉
        </h2>
        <p className="text-lg mb-8 max-w-lg text-center">
          Get instant answers to your questions. But hey, no Instagram here!
        </p>
        <div className="w-full max-w-lg">
          <input
            name="prompt"
            className="p-4 w-full text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-pink-400"
            type="text"
            placeholder="Enter your prompt here..."
            value={data.prompt}
            onChange={handleinput}
            onKeyDown={handlekeydown}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 px-8 py-3 bg-white text-pink-500 font-bold text-lg rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          {loading1}
        </button>
        {ans && (
          <div className="mt-12 bg-white text-gray-900 rounded-lg p-8 shadow-lg w-full max-w-3xl">
            <h3 className="text-3xl font-bold text-pink-500 mb-4">
              Your Answer:
            </h3>
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{ans}</p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="text-center py-4 bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 text-sm shadow-md mt-12">
        <p>
          &copy; 2024{" "}
          <span className="text-yellow-300 font-semibold">Rimal GPT</span>. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Homepage;
