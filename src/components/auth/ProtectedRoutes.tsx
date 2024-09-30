// ** condition - redirectPath - childern

import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  redirectPath: string;
  children: React.ReactNode;
}

function ProtectedRoutes({ isAllowed, redirectPath, children }: IProps) {
  // replace & state
  // replace => will replace the current entry in the history stack

  if (!isAllowed) return <Navigate to={redirectPath} replace />;

  return children;
}

export default ProtectedRoutes;
