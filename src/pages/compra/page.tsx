import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/backbutton";

interface Car {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
  km?: number;
  year?: number;
  category?: string;
}

const CARS: Car[] = [
  { id: 1, title: "Camaro Amarelo", price: 400000, img: "/bumble.png", description: "Agora eu fiquei doce..." },
  { id: 2, title: "Peugeot 206", price: 32000, img: "/peugeot.png", description: "Peugeot 206 Hatch completo..." },
  { id: 3, title: "BMW-TT", price: 220000, img: "/bmw-tt.png", description: "BMW 320i Sedã..." },
  { id: 4, title: "Porsche Panamera", price: 450000, km: 25000, year: 2021, category: "Esportivo", img: "/panameir.png", description: "Porsche Panamera 4.0 Turbo — luxo e potência em um design impecável." },
  { id: 5, title: "Fiat 1.4 Turbo", price: 85000, km: 42000, year: 2021, category: "Populares", img: "/fiat.png", description: "PROMOÇÃO IMPERDÍVEL! Com a compra deste carro, você ganha uma viagem com tudo pago para Sorocaba, cortesia da Nonatão Carros." },
  { id: 6, title: "Honda Civic EX 2025", price: 92000, km: 68000, year: 2025, category: "Sedã", img: "/civic.png", description: "Honda Civic com pacote de segurança, interior em ótimo estado e IPVA em dia." },
  { id: 7, title: "Jeep Compass", price: 105000, km: 54000, year: 2020, category: "SUV", img: "/compass.png", description: "SUV compacto, ideal para cidade e estrada. Tração 4x2 e ótimo espaço interno." },
  { id: 8, title: "Chevrolet Onix", price: 20000, km: 98000, year: 2018, category: "Hatch", img: "/onix.png", description: "Hatch moderno, econômico e muito popular no Brasil." },
  { id: 9, title: "Renault Duster", price: 50000, km: 102000, year: 2020, category: "SUV", img: "/duster.png", description: "SUV econômico e espaçoso, ideal para cidade. Manutenção em dia." },
  { id: 10, title: "Opala", price: 11000, km: 23000, year: 2022, category: "Populares", img: "/opala.png", description: "Dispensa apresentações — o lendário Opala." },
  { id: 11, title: "Honda HR-V", price: 35000, km: 23000, year: 2022, category: "SUV", img: "/hrv.png", description: "SUV compacto moderno, confortável e versátil." },
  { id: 12, title: "Renault Kwid", price: 10600, km: 23000, year: 2022, category: "Populares", img: "/kwid.png", description: "Estilo mini-SUV, econômico e ideal para cidade." },
  { id: 13, title: "Volkswagen Polo", price: 70000, km: 200000, year: 2025, category: "Hatch", img: "/Polo.png", description: "Dirigibilidade superior e boa tecnologia." },
  { id: 14, title: "Ford Mustang", price: 40000000, km: 40000, year: 1990, category: "Esportivo", img: "/Shellby.png", description: "Mustang Shelby com herança clássica e acabamento Unico" },
  { id: 16, title: 'Dodge Chalenger', price: 10000000, km: 60000, year: 2000, category: 'Populares', img: '/Toretto.png', description: 'Feito para suas viagens inesqueciveis em Familia' },
  { id: 15, title: "Brasília Amarela", price: 36000, km: 20000, year: 1986, category: "Populares", img: "/Brasilia.png", description: "Um carro esteticamente retro, não é muito veloz mais é o favorito para as pessoas idosas" },
  { id: 17, title: "Blizard Jipe", price: 187900, km: 30000, year: 2020, category: "SUV", img: "/Blizard.png", description: "Feito para a terra, compacto e lamasento" },
];

const Compra: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawId = searchParams.get("id") ?? "";
  const id = Number(rawId);
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (!Number.isNaN(id) && id > 0) {
      const found = CARS.find((c) => c.id === id) || null;
      setCar(found);
    } else {
      setCar(null);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!car) return;

    const formData = new FormData(e.currentTarget);
    const pagamento = String(formData.get("pagamento") || "cartao");

    if (pagamento === "cartao") {
      navigate(`/confirmacao-cartao?id=${car.id}`);
    } else if (pagamento === "pix") {
      navigate(`/confirmacao-pix?id=${car.id}`);
    } else {
      navigate(`/confirmacao-cartao?id=${car.id}`);
    }
  };

  return (
    <div className="compra-page">
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "linear-gradient(180deg,var(--bg),var(--bg-2) 70%)" }}
      >
        <div className="compra-card">

          <div style={{ marginBottom: 8 }}>
            <BackButton />
          </div>

          <h1
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "var(--text-light)",
              marginBottom: 16,
            }}
          >
            Finalizar Compra
          </h1>

          {!car && (
            <div style={{ marginBottom: 16, color: "var(--muted)" }}>
              <strong>Carro não encontrado.</strong>
              <div>
                Verifique o parâmetro <code>?id=</code> na URL. Ex.:{" "}
                <code>/compra?id=1</code>
              </div>
            </div>
          )}

          {car && (
            <div
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 22,
                alignItems: "center",
              }}
            >
              <img
                src={car.img}
                alt={car.title}
                style={{
                  width: 120,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
              <div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--text-light)",
                  }}
                >
                  {car.title}
                </h2>
                <p style={{ color: "var(--accent1)", fontWeight: 700 }}>
                  R$ {car.price.toLocaleString("pt-BR")}
                </p>
                <p style={{ color: "var(--muted)", fontSize: 14 }}>
                  {car.description}
                </p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <input name="nome" placeholder="Seu nome completo" required />
            <input name="email" type="email" placeholder="seuemail@email.com" required />
            <input name="cpf" placeholder="000.000.000-00" required />
            <input name="endereco" placeholder="Rua, número, bairro" required />

            <select
              name="pagamento"
              defaultValue="cartao"
              aria-label="Forma de pagamento"
            >
              <option value="cartao">Cartão de crédito</option>
              <option value="pix">Pix</option>
              <option value="boleto">Boleto</option>
              <option value="transferencia">Transferência</option>
              <option value="dinheiro">Dinheiro na entrega</option>
              <option value="credito-loja">Crédito da loja</option>
            </select>

            <button
              type="submit"
              style={{
                padding: 12,
                borderRadius: 12,
                border: "none",
                background:
                  "linear-gradient(90deg,var(--accent1),var(--accent2))",
                fontWeight: 800,
                cursor: "pointer",
              }}
              disabled={!car}
            >
              Confirmar compra
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Compra;
