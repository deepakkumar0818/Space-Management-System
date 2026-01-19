import RegisterPage from "./RegisterPage";
import {Suspense} from "react";
export default function RegisterPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  )
}