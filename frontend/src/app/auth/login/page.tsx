import LoginPage from "./LoginPage";
import {Suspense} from "react";
export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
}