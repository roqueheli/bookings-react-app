import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TokenTimer = () => {
  const { user, refreshToken, logout } = useAuth(); // Asume que tienes `logout` en el contexto de autenticación
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && user.token) {
      const expirationTime = getExpirationTimeFromToken(user.token);     
      
      const now = Date.now();
      let timeLeftInSeconds = (expirationTime - now) / 1000;

      if (timeLeftInSeconds > 60) {
        setCountdown(timeLeftInSeconds);

        const intervalId = setInterval(() => {
          setCountdown((prevCountdown) => {
            const newCountdown = prevCountdown - 1;
            if (newCountdown <= 0) {
              clearInterval(intervalId);
              setShowModal(false);
              logout();
              if (location.pathname.includes("/admin")) {
                navigate("/admin");
              } else {
                navigate("/");
              }
            }
            return newCountdown;
          });
        }, 1000);

        const modalTimeoutId = setTimeout(() => {
          setShowModal(true);
        }, (timeLeftInSeconds - 60) * 1000);

        return () => {
          clearInterval(intervalId);
          clearTimeout(modalTimeoutId);
        };
      } else {
        setShowModal(true);
        setCountdown(timeLeftInSeconds);
      }
    }
  }, [user, logout, navigate, location]);

  const getExpirationTimeFromToken = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.exp * 1000; // El tiempo de expiración está en segundos, lo convertimos a milisegundos
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleContinue = async () => {
    setShowModal(false);
    try {
      await refreshToken(); // Asume que `refreshToken` es una función que obtiene un nuevo token del backend
      const expirationTime = getExpirationTimeFromToken(user.token); // Obtener el nuevo tiempo de expiración
      const now = Date.now();
      const timeLeftInSeconds = (expirationTime - now) / 1000;

      setCountdown(timeLeftInSeconds);

      if (location.pathname.includes("/admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Sesión a punto de expirar</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
          <p>Tu sesión expirará en:</p>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {Math.floor(countdown)} <small>segs.</small>
          </p>
          <p>¿Deseas continuar?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleContinue}
            style={{
              color: "#F55376",
              backgroundColor: "#3DD9EB",
              borderColor: "#3DD9EB",
            }}
          >
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TokenTimer;
