import { useState } from 'react';

const Button = ({ btnName, classStyle, handleClick }) => {
  const [s, setS] = useState(false);

  return (
    <button
      type="submit"
      className={`text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold ${classStyle}`}
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};

export default Button;
