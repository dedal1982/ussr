export const StubPage = () => {
  return (
    <div className="stub-page">
      <div className="stub-container">
        <div className="icon">&#128565;</div>
        <h1 className="title">Oops! Сервер сломался</h1>
        <p className="message">
          Нууу, похоже, сервер решил взять паузу. Попробуйте обновить страницу
          чуть позже или расслабьтесь и подумайте о чем-нибудь приятном.
        </p>

        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
};
