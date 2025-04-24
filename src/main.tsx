// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Provider } from 'react-redux';
import { store } from '../store/store';

// createRoot(document.getElementById('root')!).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )


function renderApp(container: HTMLElement){
  if (!container) {
    console.error("React root container not found!");
    return;
  }
  createRoot(container).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const standaloneContainer = document.getElementById("crowlitApp");
if (standaloneContainer) {
  console.log("Running in standalone mode.");
  renderApp(standaloneContainer);
}

// Expose for Widget Mode (to be called when injected)
(window as any).CrowlitApp = renderApp;