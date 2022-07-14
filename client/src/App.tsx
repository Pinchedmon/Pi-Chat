import Feed from './pages/Feed'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import useAuth, { AuthProvider } from './hooks/useAuth'
import SignUpPage from './pages/components/SignUp'
import Login from './pages/components/Login'
import Profile from './pages/Profile'
function AuthenticatedRoute(props: any) {
  let user
  if (localStorage['user']) {
    user = JSON.parse(localStorage.getItem('user') || '')
  }
  console.log(user)
  if (!user) return <Navigate to='/login' />
  return <props.component />
}
function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <AuthProvider>
                  <AuthenticatedRoute component={() => <Feed />} />
                </AuthProvider>
              }
            />
            <Route
              path='/signup'
              element={
                <AuthProvider>
                  <SignUpPage />
                </AuthProvider>
              }
            />
            <Route
              path='/login'
              element={
                <AuthProvider>
                  <Login />
                </AuthProvider>
              }
            />
            <Route
              path='/profile'
              element={
                <AuthProvider>
                  <AuthenticatedRoute component={() => <Profile />} />
                </AuthProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}
export default App