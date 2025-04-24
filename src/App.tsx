import axios from 'axios';
import './App.css'

import Chatbot from './views/OpenChat';

import ClosedChat from './views/ClosedChat'; 

import { useEffect } from 'react'
import { getDeviceType } from '../utils/index';

import { useSelector, useDispatch } from 'react-redux';
import { 
  setTenantId,
  setSessionId,
  setTenantAssets,
  setIsAuthenticated,
  setTenantName,
  setLoading
} from '../slice/authSlice';

import { WIDGETSCREENS } from '../constants';

function App() {
  const tenant_url = new URL(window.location.href).hostname;
  const device_type = getDeviceType();

  const sessionId = useSelector((state: any) => state.auth.sessionId);

  const widgetViewState = useSelector((state: any)=> state.widgetView.widgetState)
  
  const dispatch = useDispatch();

  const backendUrl= import.meta.env.VITE_BACKEND_URI;

  console.log(backendUrl, "backend url");

  const authenticate = async () => {
    try { 
      const ipRes = await axios.get('https://api.ipify.org?format=json');
      if (ipRes.status !== 200) {
        console.error("Error fetching IP address");
        return;
      }
      const ipData = ipRes.data;
      const payload = {
        tenant_url,
        device_type: device_type, 
        ip_address: ipData.ip,
        session_start: new Date().toISOString()
      }
      const res = await axios.post(`${backendUrl}/api/v1/customer/widget-auth`, payload, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (res.status !== 200) {
        console.error("Error authenticating user");
        return;
      }
      const data = res.data;  
      console.log("Authentication response:", data);
      const token = data;
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded token:", decodedToken);

      dispatch(setTenantId(decodedToken.tenant_id));
      dispatch(setSessionId(decodedToken.session_id));
      dispatch(setTenantAssets(decodedToken.tenant_assets));
      dispatch(setTenantName(decodedToken.tenant_name));
      dispatch(setIsAuthenticated(true));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error in authentication", error);
    }
  }

  useEffect(() => {
    if (!sessionId) {
      console.log("No session found, authenticating...");
      authenticate();
    }
  }, [sessionId]);

  return (
    <>
    <div className='fixed bottom-0 right-0 m-4 shadow-lg rounded-lg z-[1000]'>
      {
        widgetViewState === WIDGETSCREENS.chatOpen && <Chatbot />
      } 
      {
        widgetViewState === WIDGETSCREENS.chatClose && <ClosedChat />
      } 

    </div>


    </>
  )
}

export default App