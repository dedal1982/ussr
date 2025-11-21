import { ErrorBoundary } from "react-error-boundary";
import { StubPage } from "../StubPage/StubPage";

export const ErrorBoundaryWrapper = ({ children }) => {
  const handleError = (error, info) => {
    console.error("Ошибка в ErrorBoundary:", error, info);
  };

  return (
    <ErrorBoundary FallbackComponent={StubPage} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};
