import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface Car {
  id: number;
  title: string;
  price: number;
  km: number;
  year: number;
  category: string;
  img: string;
  description: string;
}

const CARS: Car[] = [
  { id: 1, title: "Camaro Amarelo", price: 30000000, km: 12000, year: 2023, category: "Esportivo", img: '/bumble.png', description: "Explosivo na arrancada, feito para voce tirar onda enquanto dirigi" },
  { id: 2, title: 'Peugeot 206', price: 22000, km: 89000, year: 2015, category: 'Hatch', img: '/peugeot.png', description: 'Peugeot 206 Hatch completo, econômico e confortável. Ótimo para o dia a dia.' },
  { id: 3, title: 'BMW-TT', price: 220000, km: 40000, year: 2022, category: 'Sedã', img: '/bmw-tt.png', description: 'BMW 320i Sedã com interior de couro, ótimo desempenho e tecnologia embarcada.' },
  { id: 4, title: 'Porsche Panamera', price: 450000, km: 25000, year: 2021, category: 'Esportivo', img: '/panameir.png', description: 'Porsche Panamera 4.0 Turbo — luxo e potência em um design impecável.' },
  { id: 5, title: 'Fiat 1.4 Turbo', price: 85000, km: 42000, year: 2021, category: 'Populares', img: '/fiat.png', description: 'PROMOÇÃO IMPERDÍVEL! Com a compra deste carro, você ganha uma viagem com tudo pago para Sorocaba, cortesia da Nonatão Carros.' },
  { id: 6, title: 'Honda Civic EX 2025', price: 92000, km: 68000, year: 2025, category: 'Sedã', img: '/civic.png', description: 'Honda Civic com pacote de segurança, interior em ótimo estado e IPVA em dia.' },
  { id: 7, title: 'Jeep Compass', price: 105000, km: 54000, year: 2020, category: 'SUV', img: '/compass.png', description: 'SUV compacto, ideal para cidade e estrada. Tração 4x2 e ótimo espaço interno.' },
  { id: 8, title: 'Chevrolet Onix', price: 20000, km: 98000, year: 2018, category: 'Hatch', img: '/onix.png', description: 'Hatch moderno, econômico e muito popular no Brasil.' },
  { id: 9, title: 'Renault Duster', price: 50000, km: 102000, year: 2020, category: 'SUV', img: '/duster.png', description: 'SUV econômico e espaçoso, ideal para cidade. Manutenção em dia.' },
  { id: 10, title: 'Opala', price: 11000, km: 23000, year: 2022, category: 'Populares', img: '/opala.png', description: 'Dispensa apresentações — o lendário Opala.' },
  { id: 11, title: 'Honda HR-V', price: 35000, km: 23000, year: 2022, category: 'SUV', img: '/hrv.png', description: 'SUV compacto moderno, confortável e versátil.' },
  { id: 12, title: 'Renault Kwid', price: 10600, km: 23000, year: 2022, category: 'Populares', img: '/kwid.png', description: 'Estilo mini-SUV, econômico e ideal para cidade.' },
  { id: 13, title: 'Volkswagen Polo', price: 70000, km: 200000, year: 2025, category: 'Hatch', img: '/Polo.png', description: 'Dirigibilidade superior e boa tecnologia.' },
  { id: 14, title: 'Ford Mustang', price: 40000000, km: 40000, year: 1990, category: 'Esportivo', img: '/Shellby.png', description: 'Mustang Shelby com herança clássica e Acabento Unico' },
  { id: 15, title: 'Brasília Amarela', price: 36000, km: 20000, year: 1986, category: 'Populares', img: '/Brasilia.png', description: 'Um carro esteticamente retro, não é muito veloz mais é o favorito para as pessoas idosas' },
  { id: 16, title: 'Dodge Chalenger', price: 10000000, km: 60000, year: 2000, category: 'Populares', img: '/Toretto.png', description: 'Feito para suas viagens inesqueciveis em Familia' },
  { id: 17, title: 'Blizard Jipe', price: 187900, km: 30000, year: 2020, category: 'SUV', img: '/Blizard.png', description: 'Feito para a terra, compacto e lamasento' },
];

const Vendas: React.FC = () => {
  const [cars, setCars] = useState<Car[]>(CARS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [onlyRecent, setOnlyRecent] = useState(false);
  const [lowKm, setLowKm] = useState(false);
  const [sort, setSort] = useState('relevance');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    applyFilters();
  }, [search, category, maxPrice, onlyRecent, lowKm, sort]);

  const formatCurrency = (value: number) => value.toLocaleString('pt-BR');
  const formatKm = (km: number) => km.toLocaleString('pt-BR');

  const applyFilters = () => {
    let filtered = CARS.filter(car => {
      if (category !== 'all' && car.category !== category) return false;
      if (car.price > maxPrice) return false;
      if (onlyRecent && (new Date().getFullYear() - car.year) > 3) return false;
      if (lowKm && car.km > 50000) return false;

      if (search) {
        const text = `${car.title} ${car.year} ${car.category}`.toLowerCase();
        if (!text.includes(search.toLowerCase())) return false;
      }
      return true;
    });

    if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'year_desc') filtered.sort((a, b) => b.year - a.year);

    setCars(filtered);
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setMaxPrice(50000000);
    setOnlyRecent(false);
    setLowKm(false);
    setSort('relevance');
  };

  const openModal = (car: Car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="wrap">

      {/* HEADER */}
      <header>
        <div className="brand">
          <img src="/logo.png" alt="Logo Nonatão" style={{width: 40, height: 40, borderRadius: 8}} />
          <div>
            <h1>Nonatão Carros</h1>
            <p>Venda profissional de veículos — com busca avançada</p>
          </div>
        </div>

        <div style={{marginLeft: 'auto', display: 'flex', gap: '8px'}}>
          <button className="btn" onClick={() => navigate("/login")}>Entrar</button>
          <button className="btn" onClick={() => navigate("/anuncio")}>Anunciar veículo</button>
        </div>
      </header>

      {/* SEARCH & SORT */}
      <div className="controls">

        <div className="search">
          <input
            id="searchInput"
            placeholder="Buscar modelo, ano, categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={{fontSize: 12}}>Resultados: {cars.length}</div>
        </div>

        <div className="filters">
          <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Mais relevantes</option>
            <option value="price_asc">Preço: menor</option>
            <option value="price_desc">Preço: maior</option>
            <option value="year_desc">Ano: mais novo</option>
          </select>

          <button className="select" onClick={resetFilters}>Limpar</button>
        </div>
      </div>

      <main className="main">
        
        {/* SIDEBAR */}
        <aside>
          <div className="section">
            <h3>Categorias</h3>
            <div className="categories">
              {['all', 'Hatch', 'Sedã', 'Esportivo', 'Populares', 'SUV'].map(cat => (
                <button
                  key={cat}
                  className={`cat ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat === 'all' ? 'Todas' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>Preço máximo</h3>
            <input
              type="range"
              min="10000"
              max="50000000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <small>Até R$ {formatCurrency(maxPrice)}</small>
          </div>

          <div className="section">
            <h3>Filtros rápidos</h3>
            <label>
              <input type="checkbox" checked={onlyRecent} onChange={(e) => setOnlyRecent(e.target.checked)} />
              Apenas últimos 3 anos
            </label>

            <label>
              <input type="checkbox" checked={lowKm} onChange={(e) => setLowKm(e.target.checked)} />
              Menos de 50.000 km
            </label>
          </div>
        </aside>

        {/* PRODUCTS */}
        <section>
          <div className="products">
            {cars.length === 0 ? (
              <div>Nenhum veículo encontrado.</div>
            ) : (
              cars.map((car, index) => (
                <article key={car.id} className="card" style={{animationDelay: `${index * 0.05}s`}}>
                  <img src={car.img} alt={car.title} />
                  <div className="card-body">
                    
                    <div className="card-title">
                      <span>{car.title}</span>
                      <strong>R$ {formatCurrency(car.price)}</strong>
                    </div>

                    <div className="meta">
                      {car.year} • {formatKm(car.km)} km • {car.category}
                    </div>

                    <div className="actions">
                      <button className="primary" onClick={() => openModal(car)}>Ver detalhes</button>
                      <button className="secondary" onClick={() => navigate(`/compra?id=${car.id}`)}>
                        Comprar
                      </button>
                    </div>

                  </div>
                </article>
              ))
            )}
          </div>

          <footer>
            <small>© {new Date().getFullYear()} Nonatão Carros — Sistema demonstrativo.</small>
          </footer>
        </section>
      </main>

      {/* MODAL */}
      {modalOpen && selectedCar && (
        <div className="modal open" onClick={closeModal}>
          <div className="modal-card" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>

            <h3>{selectedCar.title} — R$ {formatCurrency(selectedCar.price)}</h3>

            <div className="modal-grid">
              <img src={selectedCar.img} alt={selectedCar.title} />

              <div>
                <div>{selectedCar.year} • {formatKm(selectedCar.km)} km • {selectedCar.category}</div>
                <p>{selectedCar.description}</p>

                <button className="secondary" onClick={closeModal}>Voltar</button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Vendas;
