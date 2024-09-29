export default function IconButton({ svg, onClick }) {
  return (
    <button className="icon-button" onClick={onClick}>
      {svg}
    </button>
  );
}
