import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import layout from './layout';  // Import the router configuration
import injectContext from './store/appContext';  // Import the StoreProvider for global state management
import { BackendURL } from './component/BackendURL';

const Main = () => {
    
    if(! import.meta.env.VITE_BACKEND_URL ||  import.meta.env.VITE_BACKEND_URL == "") return (
        <React.StrictMode>
              <BackendURL/ >
        </React.StrictMode>
        );
    return (
        <React.StrictMode>  
            {/* Provide global state to all components */}
            <injectContext> 
                {/* Set up routing for the application */} 
                <RouterProvider router={layout}>
                </RouterProvider>
            </injectContext>
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
