import React, { createContext, useState, useEffect } from "react";

// Create Context
export const BaseUrlContext = createContext();

export const BaseUrlProvider = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState(""); // Store the base URL
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch Base URL from Django
  const fetchBaseUrl = async () => {
    try {
      const response = await fetch("https://0aca-36-50-162-225.ngrok-free.app/api/config/"); // Replace with your API
      const result = await response.json();
      setBaseUrl(result.base_url); // Store the Base URL
    } catch (error) {
      console.error("Error fetching base URL:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Base URL on first render
  useEffect(() => {
    fetchBaseUrl();
  }, []);

  return (
    <BaseUrlContext.Provider value={{ baseUrl, loading, refetch: fetchBaseUrl }}>
      {children}
    </BaseUrlContext.Provider>
  );
};
