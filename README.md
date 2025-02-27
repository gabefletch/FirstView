# FirstView
A [Framer](https://framer.com) component that only appears on a user's very first website visit and persists until it is dismissed.<br>

FirstView operates by using a [Fetch](https://fetch.tools) component in Framer that gets data from a [Val Town](https://val.town) script.<br>

You can see FirstView in action by visiting the [demo site](https://gabefletch-firstvisitcomponent.web.val.run/).
### Use Cases
- Pop-up for first-time users linking to a guide on more technical sites
- Customizable "Accept/Reject Cookies" toast
- Anything else you can think of

### Code Overview
1. Importing React for localStorage
```
/** @jsxImportSource https://esm.sh/react@18.2.0 */
import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
```
2. Defining Function
```
function FirstVisitComponent() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
```
3. Defining localStorage usage with useEffect
```
  useEffect(() => {
    const hasVisited = localStorage.getItem('firstVisitDismissed');
    if (hasVisited) {
      setIsFirstVisit(false);
    }
  }, []);
```
4. Handling Pop-up Dismissing
```
 const handleDismiss = () => {
    localStorage.setItem('firstVisitDismissed', 'true');
    setIsFirstVisit(false);
  };
```
5. Setting First Time Visit Rules
```
  if (!isFirstVisit) return null;
```
6. Default Front-Facing Modal Appearance
```
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
```
7. Default Front-Facing Placeholder for Regular Site Content After Modal is Dismissed
```
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
```
8. Defining Rendering
```
function client() {
  createRoot(document.getElementById("root")).render(<App />);
}
if (typeof document !== "undefined") { client(); }
```
9. Defining Val Town Server API Calls
```
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
```
