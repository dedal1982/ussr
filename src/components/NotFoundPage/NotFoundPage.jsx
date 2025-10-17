import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Страница не найдена</p>
      <button onClick={() => navigate(-1)} className="back-button">
        Назад
      </button>
    </div>
  );
};

export default NotFoundPage;
