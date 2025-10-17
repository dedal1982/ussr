import Terms from "./Terms";
import Privacy from "./Privacy";
import Copyright from "./Copyright";

const FooterLower = () => {
  return (
    <div className="footer__copyright">
      <ul className="footer__copyright-item">
        <Privacy />
        <Terms />
      </ul>
      <Copyright />
    </div>
  );
};

export default FooterLower;
