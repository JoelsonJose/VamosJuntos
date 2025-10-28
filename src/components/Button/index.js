import './index.css';

export default function Button ({ title, variant = 'primary', onClick })  {
  const buttonClassName = `button ${variant === 'primary' ? 'button-primary' : 'button-secondary'}`;
  return (
    <button className={buttonClassName} onClick={onClick}>
      {title}
    </button>
  )
}
