@@ .. @@
 import React, { useEffect, useState } from "react";
 import { Sparkles, Loader2, RefreshCw, AlertCircle } from "lucide-react";
+import { useAuth } from "@clerk/clerk-react";
 
 const AIMemeGenerator = ({ onMemeGenerated }) => {
   const [prompt, setPrompt] = useState("");
   const [isGenerating, setIsGenerating] = useState(false);
   const [error, setError] = useState("");
   const [serverConnected, setServerConnected] = useState(false);
+  const { getToken, isSignedIn } = useAuth();
 
   // Adjust this if your backend is deployed elsewhere
   const backendUrl = "http://localhost:3001";
@@ .. @@
   // ✅ Generate meme image via backend
   const generateAIMeme = async () => {
+    if (!isSignedIn) {
+      setError("Please sign in to generate AI memes");
+      return;
+    }
+
     if (!prompt.trim()) {
       setError("Please enter a prompt for your meme");
       return;
@@ .. @@
     setError("");
 
     try {
+      const token = await getToken();
       const resp = await fetch(`${backendUrl}/generate-image`, {
         method: "POST",
         headers: { 
           "Content-Type": "application/json",
+          "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify({ prompt }),
       });
@@ .. @@
   return (
     <div className="space-y-4 max-w-xl mx-auto">
+      {!isSignedIn && (
+        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
+          <p className="text-sm text-yellow-800">
+            🔒 Sign in to unlock AI meme generation
+          </p>
+        </div>
+      )}
+
       {/* Prompt input */}
       <div>
         <label className="block text-xs font-medium text-gray-700 mb-1">
@@ .. @@
       {/* Generate button */}
       <button
         onClick={generateAIMeme}
-        disabled={isGenerating || !prompt.trim()}
+        disabled={isGenerating || !prompt.trim() || !isSignedIn}
         className={`w-full py-2 rounded text-white font-medium ${
-          isGenerating ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
+          isGenerating || !isSignedIn ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
         }`}
       >
         {isGenerating ? (