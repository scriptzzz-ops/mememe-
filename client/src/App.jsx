import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, User, LogOut } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import MemeGenerator from './components/MemeGenerator';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import TemplatePage from './pages/TemplatePage';
import logo from './assets/logo.webp';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const handleViewMoreTemplates = () => {
      setCurrentPage('templates');
    };

    window.addEventListener('viewMoreTemplates', handleViewMoreTemplates);
    return () => window.removeEventListener('viewMoreTemplates', handleViewMoreTemplates);
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'templates':
        return <TemplatePage onTemplateSelect={handleTemplateSelect} />;
      default:
        return <MemeGenerator selectedTemplate={selectedTemplate} />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'templates', label: 'Templates' },
    { id: 'about', label: 'About' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="MemeForge Logo" 
                className="h-10 w-10 rounded-lg shadow-sm"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MemeForge
              </h1>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {/* Trending Badge */}
              <SignedIn>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-semibold shadow-sm border border-green-200">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>AI Powered</span>
                </div>
              </SignedIn>

              {/* Navigation */}
              <nav className="flex items-center gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Auth Section */}
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                      <User className="h-4 w-4" />
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      Welcome, {user?.firstName || 'User'}!
                    </span>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;