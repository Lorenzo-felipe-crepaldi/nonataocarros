import React from "react";
import { useSearchParams } from "react-router-dom";

const ConfirmacaoCartao: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? "desconhecido";

  return (
    <div style={{ padding: 24 }}>
      <h1>Confirmação — Cartão</h1>
      <p>Pagamento com cartão selecionado para o carro com id: <strong>{id}</strong>.</p>
      <p>Implemente aqui o fluxo real de pagamento e confirmação.</p>
    </div>
  );
};

export default ConfirmacaoCartao;

// src/utils/card.ts
export function luhnCheck(cardNumber: string) {
  const cleaned = cardNumber.replace(/\D/g, "");
  let sum = 0;
  let double = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

export function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  // Grupo de 4 (padrão); alguns cartões têm 15 (AMEX) mas aqui simplificamos
  return digits.match(/.{1,4}/g)?.join(" ") ?? digits;
}

export function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0,4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0,2)}/${digits.slice(2,4)}`;
}

