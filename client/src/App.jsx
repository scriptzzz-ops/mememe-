@@ .. @@
 import React, { useState, useEffect } from 'react';
 import PropTypes from 'prop-types';
-import { TrendingUp } from 'lucide-react';
+import { TrendingUp, User, LogOut } from 'lucide-react';
+import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
 import MemeGenerator from './components/MemeGenerator';
 import Footer from './components/Footer';
 import AboutPage from './pages/AboutPage';
 import TemplatePage from './pages/TemplatePage';
 import logo from './assets/logo.webp';
 
 function App() {
   const [currentPage, setCurrentPage] = useState('home');
   const [selectedTemplate, setSelectedTemplate] = useState('');
+  const { user } = useUser();
 
   useEffect(() => {
     const handleViewMoreTemplates = () => {
@@ .. @@
             {/* Desktop Nav */}
             <div className="hidden md:flex items-center gap-8">
               {/* Trending Badge */}
-              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-semibold shadow-sm border border-green-200">
-                <TrendingUp className="h-4 w-4 text-green-600" />
-                <span>Trending Now</span>
-              </div>
+              <SignedIn>
+                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-semibold shadow-sm border border-green-200">
+                  <TrendingUp className="h-4 w-4 text-green-600" />
+                  <span>AI Powered</span>
+                </div>
+              </SignedIn>
 
               {/* Navigation */}
               <nav className="flex items-center gap-6">
@@ .. @@
                   </button>
                 ))}
               </nav>
+
+              {/* Auth Section */}
+              <div className="flex items-center gap-4">
+                <SignedOut>
+                  <SignInButton mode="modal">
+                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
+                      <User className="h-4 w-4" />
+                      Sign In
+                    </button>
+                  </SignInButton>
+                </SignedOut>
+                <SignedIn>
+                  <div className="flex items-center gap-3">
+                    <span className="text-sm text-gray-600">
+                      Welcome, {user?.firstName || 'User'}!
+                    </span>
+                    <UserButton 
+                      appearance={{
+                        elements: {
+                          avatarBox: "w-8 h-8"
+                        }
+                      }}
+                    />
+                  </div>
+                </SignedIn>
+              </div>
             </div>
 
             {/* Mobile Menu */}
@@ .. @@
       {renderPage()}
       <Footer />
     </div>
   );
 }