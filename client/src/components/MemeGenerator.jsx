@@ .. @@
 import React, { useState, useRef, useCallback, useEffect } from 'react';
 import { RotateCcw, Palette, Type, Image as ImageIcon, Video, Play, Pause, Download } from 'lucide-react';
+import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
 import ImageUpload from './ImageUpload';
 import TextControls from './TextControls';
 import { drawMemeOnCanvas, drawMemeOnVideo } from '../utils/canvas.js';
@@ .. @@
       {/* Text Settings & Actions */}
       <div className="w-full lg:w-1/4 space-y-5">
+        <SignedOut>
+          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-5 border border-purple-200">
+            <div className="text-center">
+              <h3 className="text-lg font-semibold text-purple-800 mb-2">🚀 Unlock Full Features</h3>
+              <p className="text-sm text-purple-600 mb-4">
+                Sign in to access AI meme generation and save your creations
+              </p>
+              <SignInButton mode="modal">
+                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
+                  Sign In Now
+                </button>
+              </SignInButton>
+            </div>
+          </div>
+        </SignedOut>
+
         <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
           <div className="flex items-center gap-2 mb-4">
             <Type className="h-6 w-6 text-purple-600" />
             <h3 className="text-lg font-semibold text-gray-900">Text Settings</h3>
           </div>
-          <div className="space-y-5">
-            <TextControls
-              text={topText}
-              onChange={setTopText}
-              placeholder="Enter top text..."
-            />
-            <TextControls
-              text={bottomText}
-              onChange={setBottomText}
-              placeholder="Enter bottom text..."
-            />
-          </div>
+          <SignedIn>
+            <div className="space-y-5">
+              <TextControls
+                text={topText}
+                onChange={setTopText}
+                placeholder="Enter top text..."
+              />
+              <TextControls
+                text={bottomText}
+                onChange={setBottomText}
+                placeholder="Enter bottom text..."
+              />
+            </div>
+          </SignedIn>
+          <SignedOut>
+            <div className="space-y-3 opacity-50">
+              <div className="p-3 bg-gray-100 rounded-lg">
+                <p className="text-sm text-gray-500">🔒 Sign in to customize text</p>
+              </div>
+              <div className="p-3 bg-gray-100 rounded-lg">
+                <p className="text-sm text-gray-500">🔒 Sign in to customize text</p>
+              </div>
+            </div>
+          </SignedOut>
         </div>
 
-        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
-          <div className="flex items-center gap-2 mb-3">
-            <Palette className="h-6 w-6 text-green-600" />
-            <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
-          </div>
-          <div className="grid grid-cols-1 gap-3">
-            <button
-              onClick={resetMeme}
-              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 rounded-lg text-sm font-medium"
-            >
-              <RotateCcw className="h-4 w-4" />
-              Reset
-            </button>
-          </div>
-        </div>
+        <SignedIn>
+          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
+            <div className="flex items-center gap-2 mb-3">
+              <Palette className="h-6 w-6 text-green-600" />
+              <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
+            </div>
+            <div className="grid grid-cols-1 gap-3">
+              <button
+                onClick={resetMeme}
+                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 rounded-lg text-sm font-medium"
+              >
+                <RotateCcw className="h-4 w-4" />
+                Reset
+              </button>
+            </div>
+          </div>
+        </SignedIn>
       </div>
     </div>
   );