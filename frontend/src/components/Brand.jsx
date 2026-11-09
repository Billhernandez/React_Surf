export default function Brand({ onClick }) {
  return (
    <a className="brand" href="#inicio" onClick={onClick}>
      <img
        className="brand__logo"
        src="/logo.png"
        alt=""
        width="46"
        height="46"
      />
      <span className="brand__text">
        <strong>Iguana Surf</strong>
        <small>Restaurante &amp; Surf</small>
      </span>
    </a>
  );
}
