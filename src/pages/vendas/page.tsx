import React, { useState, useEffect } from 'react';

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
  {id:1,title:"Camaro Amarelo",price:300000,km:12000,year:2023,category:"Esportivo",img:"/bumble.png",description:"Agora eu fiquei doce, Igual caramelo, To tirando Onda de camaro amarelo"},
  {id:2,title:'Peugeot 206',price:22000,km:89000,year:2015,category:'Hatch',img:'/peugeot.png',description:'Peugeot 206 Hatch completo, econômico e confortável. Ótimo para o dia a dia.'},
  {id:3,title:'BMW-TT',price:220000,km:40000,year:2022,category:'Sedã',img:'/bmw-tt.png',description:'BMW 320i Sedã com interior de couro, ótimo desempenho e tecnologia embarcada.'},
  {id:4,title:'Porsche Panamera',price:450000,km:25000,year:2021,category:'Esportivo',img:'/panameir.png',description:'Porsche Panamera 4.0 Turbo — luxo e potência em um design impecável.'},
  {id:5,title:'Fiat 1.4 Turbo',price:85000,km:42000,year:2021,category:'Populares',img:'/fiat.png',description:'PROMOÇÃO IMPERDÍVEL! Com a compra deste carro, você ganha uma viagem com tudo pago para Sorocaba, cortesia da Nonatão Carros.'},
  {id:6,title:'Honda Civic EX 2025',price:92000,km:68000,year:2025,category:'Sedã',img:'/civic.png',description:'Honda Civic com pacote de segurança, interior em ótimo estado e IPVA em dia.'},
  {id:7,title:'Jeep Compass',price:105000,km:54000,year:2020,category:'SUV',img:'/compass.png',description:'SUV compacto, ideal para cidade e estrada. Tração 4x2 e ótimo espaço interno.'},
  {id:8,title:'Chevrolet Onix',price:20000,km:98000,year:2018,category:'Hatch',img:'/onix.png',description:'Hatch moderno, econômico e muito popular no Brasil. Design atraente, bom desempenho e central multimídia.'},
  {id:9,title:'Renault Duster',price:50000,km:102000,year:2020,category:'SUV',img:'/duster.png',description:'SUV econômico e espaçoso, ideal para cidade. Manutenção em dia.'},
  {id:10,title:'Opala',price:11000,km:23000,year:2022,category:'Populares',img:'/opala.png',description:'Dispensa apresentações — o lendário Opala, com presença marcante e desempenho impressionante.'},
  {id:11,title:'Honda HR-V',price:35000,km:23000,year:2022,category:'SUV',img:'/hrv.png',description:'SUV compacto moderno, confortável e versátil, que combina design sofisticado, boa tecnologia e desempenho equilibrado.'},
  {id:12,title:'Renault Kwid',price:10600,km:23000,year:2022,category:'Populares',img:'/kwid.png',description:'É um carro compacto de estilo "mini-SUV", ideal para cidade, que oferece economia e praticidade com visual robusto.'}
];

const Vendas: React.FC = () => {
  const [cars, setCars] = useState<Car[]>(CARS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [onlyRecent, setOnlyRecent] = useState(false);
  const [lowKm, setLowKm] = useState(false);
  const [sort, setSort] = useState('relevance');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    applyFilters();
  }, [search, category, maxPrice, onlyRecent, lowKm, sort]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const handleEntrar = () => {
    window.location.href = "/login";
  };

  const handleAnunciar = () => {
    window.location.href = "/anuncio";
  };

  const applyFilters = () => {
    let filtered = CARS.filter(car => {
      if (category !== 'all' && car.category !== category) return false;
      if (car.price > maxPrice) return false;
      if (onlyRecent && (new Date().getFullYear() - car.year) > 3) return false;
      if (lowKm && car.km > 50000) return false;
      if (search) {
        const haystack = `${car.title} ${car.year} ${car.category}`.toLowerCase();
        if (!haystack.includes(search.toLowerCase())) return false;
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
    setMaxPrice(500000);
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
      <header>
        <div className="brand">
          <div className="logo" aria-hidden>
            <img src="/logo.png" alt="Logo Nonatão" style={{width: '38px', height: '38px', borderRadius: 8}} />
          </div>
          <div>
            <h1>Nonatão Carros</h1>
            <p>Venda profissional de veículos — com busca e filtros</p>
          </div>
        </div>

        <div style={{marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center'}}>
          <button onClick={handleEntrar} className="btn">Entrar</button>
          <button onClick={handleAnunciar} className="btn">Anunciar veículo</button>
        </div>
      </header>

      <div className="controls">
        <div className="search">
          <svg style={{width: '18px', height: '18px', opacity: '.7'}} viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            id="searchInput"
            placeholder="Buscar modelo, ano, cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="brand-hide" style={{fontSize: '13px', color: 'var(--muted)'}}>
            Resultados: <span id="count">{cars.length}</span>
          </div>
        </div>

        <div className="filters">
          <select
            id="sort"
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="relevance">Mais relevantes</option>
            <option value="price_asc">Preço: menor</option>
            <option value="price_desc">Preço: maior</option>
            <option value="year_desc">Ano: novo</option>
          </select>
          <button className="select" onClick={resetFilters}>Limpar</button>
        </div>
      </div>

      <main className="main">
        <aside>
          <div className="section">
            <h3>Categorias</h3>
            <div className="categories" id="categories">
              {['all', 'Hatch', 'Sedã', 'Esportivo', 'Populares'].map(cat => (
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
            <h3>Faixa de preço</h3>
            <div className="range">
              <input
                type="range"
                min="10000"
                max="500000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
            <div style={{marginTop: '8px', color: 'var(--muted)', fontSize: '13px'}}>
              Até: R$ {formatCurrency(maxPrice)}
            </div>
          </div>

          <div className="section">
            <h3>Filtros rápidos</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <label style={{fontSize: '13px', color: 'var(--muted)'}}>
                <input
                  type="checkbox"
                  checked={onlyRecent}
                  onChange={(e) => setOnlyRecent(e.target.checked)}
                /> Apenas últimos 3 anos
              </label>
              <label style={{fontSize: '13px', color: 'var(--muted)'}}>
                <input
                  type="checkbox"
                  checked={lowKm}
                  onChange={(e) => setLowKm(e.target.checked)}
                /> Menos de 50.000 km
              </label>
            </div>
          </div>
        </aside>

        <section>
          <div className="products">
            {cars.length === 0 ? (
              <div style={{color: 'var(--muted)'}}>Nenhum veículo encontrado.</div>
            ) : (
              cars.map((car, index) => (
                <article key={car.id} className="card" style={{animationDelay: `${index * 0.05}s`}}>
                  <img src={car.img} alt={car.title} />
                  <div className="card-body">
                    <div className="card-title">
                      <div className="title">{car.title}</div>
                      <div className="price">R$ {formatCurrency(car.price)}</div>
                    </div>
                    <div className="meta">{car.year} • {formatCurrency(car.km)} km • {car.category}</div>

                    <div className="actions">
                      <button className="primary" onClick={() => openModal(car)}>Ver detalhes</button>

                      <button
                        className="secondary"
                        onClick={() => window.location.href = `/compra?id=${car.id}`}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <footer>
            <small>© {new Date().getFullYear()} Nonatão Carros — Desenvolvido para demonstração.</small>
          </footer>
        </section>
      </main>

      {modalOpen && selectedCar && (
        <div className="modal open" onClick={closeModal}>
          <div className="modal-card" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
              <h3 style={{margin: 0}}>
                {selectedCar.title} — R$ {formatCurrency(selectedCar.price)}
              </h3>
              <button className="secondary" onClick={closeModal}>Fechar</button>
            </div>

            <div className="modal-grid">
              <div>
                <img src={selectedCar.img} alt="Foto do veículo" />
              </div>

              <div>
                <div style={{color: 'var(--muted)', marginBottom: '8px'}}>
                  {selectedCar.year} • {formatCurrency(selectedCar.km)} km • {selectedCar.category}
                </div>

                <div style={{fontSize: '15px', marginBottom: '12px'}}>
                  {selectedCar.description}
                </div>

                <div style={{display: 'flex', gap: '8px'}}>
                  <button className="secondary" onClick={closeModal}>Voltar</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Vendas;
