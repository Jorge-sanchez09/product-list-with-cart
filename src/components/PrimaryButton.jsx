export default function PrimaryButton({ text, onClick }) {
  return (
    <button className="primary-button" onClick={onClick}>
      {text}
    </button>
  );
}
