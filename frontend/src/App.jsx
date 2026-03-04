import {Navigate, Routes , Route} from "react-router-dom"
import FloatingShape from './components/FloatingShape'
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import { Toaster } from "react-hot-toast";
import { useEffect } from "react"
import { checkAuth } from "./store/authSlice"
import { useDispatch, useSelector } from "react-redux";
import DashboardPage from "./pages/DashboardPage"
import { Loader } from "lucide-react"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"

const ProtectedRoute = ({ children }) => {

	const { isAuthenticated, user } = useSelector((state) => state.auth);

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user?.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	if (isAuthenticated && user?.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};
function App() {

  const dispatch = useDispatch();
  const {isCheckingAuth } = useSelector((state) => state.auth);
  
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])
  if(isCheckingAuth) return <Loader className="animate-spin mx-auto"/>

  return (
    <>
    <div
			className='min-h-screen bg-linear-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
		>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/>
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <DashboardPage/>
        </ProtectedRoute>}/>
        <Route path="/signup" element={<RedirectAuthenticatedUser>
          <SignUpPage/>
        </RedirectAuthenticatedUser>}/>
        <Route path="/login" element={<RedirectAuthenticatedUser>
          <LoginPage/>
        </RedirectAuthenticatedUser>}/>
        <Route path="/verify-email" element={<EmailVerificationPage/>}/>
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
          <ForgotPasswordPage/>
        </RedirectAuthenticatedUser>}/>
        <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
          <ResetPasswordPage/>
        </RedirectAuthenticatedUser>}/>
      </Routes>
      <Toaster/>
    </div>
    </>
  )
}

export default App
