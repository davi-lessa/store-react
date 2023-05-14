import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { Container } from './styles';

const NotFound: React.FC = () => {
  const redirect = useNavigate();

  return (
    <div>
      <h2>A página procurada não existe</h2>
      <button onClick={() => redirect(`/`)}>Ir para a home</button>
    </div>
  );
};

export default NotFound;
