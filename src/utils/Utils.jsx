export const evaluatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  // Limitar la fuerza de la contraseña a un valor entre 0 y 3
  return Math.min(strength, 3);
};

// Función para calcular el porcentaje basado en la longitud de la contraseña
export const calculatePasswordPercentage = (passwordLength) => {
  return Math.min(passwordLength * 5, 100);
};

// Función para determinar la clase CSS según la fuerza de la contraseña
export const getPasswordStrengthClass = (passwordStrength) => {
  const strengthClass = [
    "password-strength-very-weak", // 0
    "password-strength-weak", // 1
    "password-strength-moderate", // 2
    "password-strength-strong", // 3
  ];

  return strengthClass[passwordStrength] || "password-strength-very-weak";
};
