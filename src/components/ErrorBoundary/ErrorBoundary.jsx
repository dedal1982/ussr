import { ErrorBoundary } from "react-error-boundary";
import StubPage from "../StubPage/StubPage";
import logger from "../../utils/logger";

const ErrorBoundaryWrapper = ({ children }) => {
  const handleError = (error, info) => {
    logger.error(
      `Ошибка в ErrorBoundary: ${error.toString()}\nInfo: ${
        info.componentStack
      }`
    );
  };

  return (
    <ErrorBoundary FallbackComponent={StubPage} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
