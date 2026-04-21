"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Mic, MicOff } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

function checkSpeechSupport(): boolean {
  if (typeof window === "undefined") return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function SearchBar({ initialQuery = "", onSearch }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isListening, setIsListening] = useState(false);
  const isSpeechSupported = useMemo(() => checkSpeechSupport(), []);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const suggestions = useMemo(() => {
    if (query.length > 2) {
      return [
        query + " movie",
        query + " film",
        query + " 2024",
        query + " action",
        query + " comedy",
      ].slice(0, 4);
    }
    return [];
  }, [query]);

  useEffect(() => {
    if (!isSpeechSupported) return;
    
    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionConstructor) {
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "en-US";
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        if (onSearch) {
          onSearch(transcript);
        } else {
          router.push(`/search?q=${encodeURIComponent(transcript)}`);
        }
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [router, onSearch, isSpeechSupported]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    } else {
      router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (!onSearch) {
      router.push("/search");
    }
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 2}
            placeholder="Search for movies and TV shows..."
            className="w-full h-14 pl-12 pr-24 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#ff6b6b] transition-colors"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isSpeechSupported && (
              <button
                type="button"
                onClick={toggleVoiceSearch}
                className={`p-2 rounded-lg transition-colors ${
                  isListening ? "text-red-500 bg-red-500/10" : "text-[#9ca3af] hover:text-white"
                }`}
                aria-label="Voice search"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-[#9ca3af] hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </form>

      {query.length > 2 && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl overflow-hidden z-50">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center gap-3"
            >
              <Search className="w-4 h-4" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}