import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure window.fetch is safely writable so browser extensions attempting to wrap fetch do not throw
try {
  const baseFetch = window.fetch ? window.fetch.bind(window) : undefined;
  let activeFetch = baseFetch;
  if (activeFetch) {
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get() {
        return activeFetch;
      },
      set(nextFn) {
        if (typeof nextFn === 'function') {
          activeFetch = nextFn;
        }
      },
    });
  }
} catch {
  // Ignore if property descriptor is non-configurable
}

// Tier 1: Maps JavaScript API & Map Loading Level quota handler
(window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
  window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
};

const origError = console.error;
console.error = (...args: unknown[]) => {
  const msg = args.map((a) => String(a)).join(' ');
  if (
    msg.includes('Cannot set property fetch') ||
    msg.includes('chrome-extension://')
  ) {
    return;
  }
  origError.apply(console, args);
  if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  }
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
