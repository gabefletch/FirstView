/** @jsxImportSource https://esm.sh/react@18.2.0 */
import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";

function FirstVisitComponent() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('firstVisitDismissed');
    if (hasVisited) {
      setIsFirstVisit(false);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('firstVisitDismissed', 'true');
    setIsFirstVisit(false);
  };

  if (!isFirstVisit) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      textAlign: 'center',
      zIndex: 1000
    }}>
      <h2>Welcome to our site! 👋</h2>
      <p>This is a special message for first-time visitors.</p>
      <button 
        onClick={handleDismiss}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Dismiss
      </button>
    </div>
  );
}

function App() {
  return (
    <div>
      <FirstVisitComponent />
      <main>
        <h1>Main Site Content</h1>
        <p>Your regular site content goes here.</p>
      </main>
    </div>
  );
}

function client() {
  createRoot(document.getElementById("root")).render(<App />);
}
if (typeof document !== "undefined") { client(); }

export default async function server(request: Request): Promise<Response> {
  return new Response(`
    <html>
      <head>
        <title>First Visit Component</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: system-ui, sans-serif; 
            margin: 0; 
            padding: 0; 
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script src="https://esm.town/v/std/catch"></script>
        <script type="module" src="${import.meta.url}"></script>
      </body>
    </html>
  `, {
    headers: {
      "content-type": "text/html",
    },
  });
}
