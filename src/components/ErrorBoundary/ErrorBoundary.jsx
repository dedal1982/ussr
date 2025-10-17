import { ErrorBoundary } from "react-error-boundary";
import StubPage from "../StubPage/StubPage";

const ErrorBoundaryWrapper = ({ children }) => {
  const handleError = (error, info) => {
    // Можно логировать ошибку куда-то
    console.error("Ошибка в ErrorBoundary:", error, info);
  };

  return (
    <ErrorBoundary FallbackComponent={StubPage} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};
export default ErrorBoundaryWrapper;
