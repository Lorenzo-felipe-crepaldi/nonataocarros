import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BackButton from "../../components/backbutton";


interface Car {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
}

const CARS: Car[] = [
  { id: 1, title: "Camaro Amarelo", price: 400000, img: "/bumble.png", description: "Agora eu fiquei doce..." },
  { id: 2, title: "Peugeot 206", price: 32000, img: "/peugeot.png", description: "Peugeot 206 Hatch completo..." },
  { id: 3, title: "BMW-TT", price: 220000, img: "/bmw-tt.png", description: "BMW 320i Sedã..." },
];

const Compra: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "0");
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    setCar(CARS.find((c) => c.id === id) || null);
  }, [id]);

  return (
    <div className="min-h-screen flex justify-center p-6">
      <div
        className="w-full max-w-3xl p-8 rounded-2xl"
        style={{
          background: "var(--card-bg)",
          boxShadow: "var(--shadow)",
          animation: "fadeUp .7s",
        }}
      >
        <BackButton />

        <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>

        {car && (
          <div className="flex gap-6 mb-6">
            <img
              src={car.img}
              className="rounded-lg"
              style={{
                width: "220px",
                height: "150px",
                objectFit: "cover",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <div>
              <h2 className="text-2xl font-bold">{car.title}</h2>
              <p className="text-cyan-400 font-semibold mb-1">
                R$ {car.price.toLocaleString("pt-BR")}
              </p>
              <p className="text-gray-300">{car.description}</p>
            </div>
          </div>
        )}

        <form className="grid gap-4">
          <input
            placeholder="Nome completo"
            className="p-3 rounded-lg"
            style={{ background: "var(--input-bg)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <input
            placeholder="E-mail"
            className="p-3 rounded-lg"
            style={{ background: "var(--input-bg)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <input
            placeholder="CPF"
            className="p-3 rounded-lg"
            style={{ background: "var(--input-bg)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <input
            placeholder="Endereço"
            className="p-3 rounded-lg"
            style={{ background: "var(--input-bg)", border: "1px solid rgba(255,255,255,0.1)" }}
          />

          <select
            className="p-3 rounded-lg"
            style={{ background: "var(--input-bg)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <option>Cartão de crédito</option>
            <option>Pix</option>
            <option>Boleto</option>
            <option>Transferência</option>
            <option>Dinheiro na entrega</option>
            <option>Crédito da loja</option>
          </select>

          <button
            className="py-3 rounded-xl font-semibold"
            style={{
              background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
              color: "#021627",
            }}
          >
            Confirmar compra
          </button>
        </form>
      </div>
    </div>
  );
};

export default Compra;
