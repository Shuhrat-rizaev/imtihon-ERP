import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
// {
//   "success": true,
//   "data": {
//       "phone_number": "+998939542111",
//       "tokens": {
//           "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjY0OTIyOSwiaWF0IjoxNzQ2NTYyODI5LCJqdGkiOiJlZGQ2NTRhM2ZjNzk0N2UxYjA1MDFmMDU5ZDIwMzZjNiIsInVzZXJfaWQiOjJ9.81QcVR2pjDvE_GlVR2r8NpMfJxVAdRPMIRDkeJfsxu4",
//           "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NTczNjI5LCJpYXQiOjE3NDY1NjI4MjksImp0aSI6ImVmOTk4NjZmYWU5YTQzNjk4YTQzMmY1MDI4ODExZmQ4IiwidXNlcl9pZCI6Mn0.sd1YMqmPm2UpaTn2b7RaeGv2dsg24us2B3IXykRVWn0"
//       }
//   }
// }