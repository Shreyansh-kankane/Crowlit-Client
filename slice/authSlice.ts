import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tenantName: localStorage.getItem('tenant_name') ? JSON.parse(localStorage.getItem('tenant_name') || 'null') : null,
    tenantId: localStorage.getItem('tenant_id') ? JSON.parse(localStorage.getItem('tenant_id') || 'null') : null,
    sessionId: sessionStorage.getItem('session_id') ? JSON.parse(sessionStorage.getItem('session_id') || 'null') : null,
    tenantAssets: localStorage.getItem('tenant_assets') ? JSON.parse(localStorage.getItem('tenant_assets') || 'null') : null,
    isAuthenticated: !!localStorage.getItem('session_id'),
    isLoading: false,
    error: null
  };
const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    setTenantId: (state, action) => {
      state.tenantId = action.payload;
      localStorage.setItem('tenant_id', JSON.stringify(action.payload));
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      sessionStorage.setItem('session_id', JSON.stringify(action.payload));
    },
    setTenantAssets: (state, action) => {
      state.tenantAssets = action.payload;
      localStorage.setItem('tenant_assets', JSON.stringify(action.payload));
    },
    setTenantName: (state, action) => {
        state.tenantName = action.payload;
        localStorage.setItem('tenant_name', JSON.stringify(action.payload));
    },
    clearAuthData: (state) => {
      state.tenantId = null;
      state.sessionId = null;
      state.tenantAssets = null;
      localStorage.removeItem('tenant_id');
      sessionStorage.removeItem('session_id');
      localStorage.removeItem('token');
      localStorage.removeItem('tenant_assets');
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
},});

export const { 
    setTenantId, 
    setTenantName,
    setSessionId, 
    setTenantAssets, 
    clearAuthData, 
    setLoading, 
    setError, 
    clearError, 
    clearLoading,
    setIsAuthenticated
 } = authSlice.actions;
export default authSlice.reducer;
