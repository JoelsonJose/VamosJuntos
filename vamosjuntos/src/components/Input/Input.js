import './Input.css';


export default function Input ({ label, type, placeholder, obrigatorio = true}) {
    return (
        <div className='campo-container'>
            <label className='campo-rotulo'>
                {label}
                <span className='asterisco-obrigatorio'>*</span>
            </label>
            <input 
                type={type}
                placeholder={placeholder}
                className='campo-entrada'
            />
        </div>
    );
};