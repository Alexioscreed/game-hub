import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from './App'
import theme from './theme';
import './index.css'

console.log('main.tsx loaded');

try {
  const rootElement = document.getElementById("root");
  console.log('Root element found:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}></ColorModeScript>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
  
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Error rendering React app:', error);
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial;">
        <h1>Error Loading Game Hub</h1>
        <p>Error: ${error}</p>
        <p>Please check the browser console for more details.</p>
      </div>
    `;
  }
}
