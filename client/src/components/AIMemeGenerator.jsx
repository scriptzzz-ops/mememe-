import React, { useEffect, useState } from "react";
import { Sparkles, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const AIMemeGenerator = ({ onMemeGenerated }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [serverConnected, setServerConnected] = useState(false);
  const { getToken, isSignedIn } = useAuth();

  // Adjust this if your backend is deployed elsewhere
  const backendUrl = "http://localhost:3001";

  // ✅ Generate meme image via backend
  const generateAIMeme = async () => {
    if (!isSignedIn) {
      setError("Please sign in to generate AI memes");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt for your meme");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const token = await getToken();
      const resp = await fetch(`${backendUrl}/generate-image`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ prompt }),
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
      }

      const data = await resp.json();
      if (data.imageUrl) {
        onMemeGenerated(data.imageUrl);
        setPrompt("");
      } else {
        throw new Error("No image URL returned");
      }
    } catch (err) {
      console.error("AI generation error:", err);
      setError(`Failed to generate meme: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {!isSignedIn && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            🔒 Sign in to unlock AI meme generation
          </p>
        </div>
      )}

      {/* Prompt input */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          AI Meme Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your meme idea..."
          className="w-full p-2 border rounded text-sm"
          rows={3}
        />
      </div>

      {/* Generate button */}
      <button
        onClick={generateAIMeme}
        disabled={isGenerating || !prompt.trim() || !isSignedIn}
        className={`w-full py-2 rounded text-white font-medium ${
          isGenerating || !isSignedIn ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 inline mr-2" />
            Generate AI Meme
          </>
        )}
      </button>

      {/* Error display */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIMemeGenerator;