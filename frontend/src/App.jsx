import { useState, useEffect } from "react";

export default function MicheladasPage() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    fetch("http://127.0.0.1:5000/productos")
      .then((response) => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
};

const total = cart.reduce((acumulado, item) => {
    return acumulado + Number(item.price);
}, 0);

/*console.log("Total:", total);*/

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffffff',
        color: '#1b1b1b'
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          backgroundColor: '#70d100',
          padding: '10px 10px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          width: '100%',
          boxSizing: 'border-box',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
      >
        <h1 style={{ color: '#ffffff', fontSize: '42px' }}>
          Micheladas Viche
        </h1>
        <a href="#carrito" style={linkStyle}>Carrito
          <img src="/carrito.png" style={{ width: '30px', height: '30px' }} />
        </a>

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap',justifyContent: 'right',width: '100%', color: 'white' }}>
          <a href="#inicio" style={linkStyle}>Inicio</a>
          <a href="#menu" style={linkStyle}>Menú</a>
          <a href="#promos" style={linkStyle}>Promociones</a>
          <a href="#nosotros" style={linkStyle}>Nosotros</a>
          <a href="#contacto" style={linkStyle}>Contacto</a>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="inicio"
        style={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background:
            'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '20px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '70px', marginBottom: '20px' }}>
            Micheladas Viche
          </h1>

          <p style={{ fontSize: isMobile ? '18px' : '24px', maxWidth: '700px' }}>
            Las mejores micheladas premium de Valledupar con sabores tropicales,
            ambiente urbano y experiencias únicas.
          </p>

          <a href="#menu" style={{ textDecoration: 'none' }}>
            <button style={heroButton}>Ordenar Ahora</button>
          </a>
        </div>
      </section>

      {/* CARDS INFO */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
          gap: '25px',
          padding: '70px 40px',
          backgroundColor: '#f7f7f7'
        }}
      >
        {[
          'Ingredientes Premium',
          'Entrega Rápida',
          'Promociones Diarias',
          'Pedidos por WhatsApp'
        ].map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: '18px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}
          >
            <h2 style={{ color: '#70d100' }}>{item}</h2>
          </div>
        ))}
      </section>

      {/* MENU */}
      <section id="menu" style={{ padding: '80px 40px' }}>
        <h2 style={sectionTitle}>Nuestro Menú</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: '35px'
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
                transition: '0.3s'
              }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover'
                }}
              />

              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '28px', color: '#70d100' }}>
                  {product.name}
                </h3>

                <p style={{ margin: '15px 0', color: '#555' }}>
                  {product.description}
                </p>

                <h4 style={{ color: '#d4a200', fontSize: '26px' }}>
                  ${product.price.toLocaleString('es-CO')}
                </h4>

                <button
                  onClick={() => addToCart(product)}
                  style={buyButton}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOCIONES */}
      <section
        id="promos"
        style={{
          backgroundColor: '#70d100',
          color: 'white',
          padding: '90px 40px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '52px', marginBottom: '30px' }}>
          Promociones Especiales
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            gap: '30px'
          }}
        >
          <PromoCard
            title="2x1 Todos los Jueves"
            desc="Compra una michelada clásica y recibe otra gratis."
          />

          <PromoCard
            title="Combo Amigos"
            desc="4 micheladas XXL + picada desde $95.000"
          />

          <PromoCard
            title="Happy Hour"
            desc="Descuento del 20% entre 4PM y 6PM"
          />
        </div>
      </section>


      {/* VIDEO */}
      <section
        style={{
          backgroundColor: '#fff9d6',
          padding: '90px 40px',
          textAlign: 'center'
        }}
      >
        <h2 style={sectionTitle}>Video Promocional</h2>

        <div
          style={{
            maxWidth: '1000px',
            margin: 'auto',
            overflow: 'hidden',
            borderRadius: '25px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}
        >
          <iframe width="1000" height="450" 
            src="https://www.youtube.com/embed/JkQabPjazB0?si=OVTHloo7LG5omBHM" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
            </iframe>
        </div>
      </section>

      {/* CARRITO */}
      <section id="carrito"
        style={{
          padding: '80px 40px',
          backgroundColor: '#f4f4f4'
        }}
      >
        <h2  style={sectionTitle}>Carrito de Compras</h2>

        {cart.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No hay productos agregados.</p>
        ) : (
          <div
            style={{
              maxWidth: '700px',
              margin: 'auto',
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}
          >
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px'
                }}
              >
                <span>{item.name}</span>
                <span>${item.price.toLocaleString('es-CO')}</span>
              </div>
            ))}

            <hr />
              <h3 style={{ marginTop: '20px', color: '#70d100' }}>
                Total: ${new Intl.NumberFormat("es-CO").format(total)}
              </h3>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: '#064420',
          color: 'white',
          textAlign: 'center',
          padding: '25px'
        }}
      >
        © 2026 Micheladas Viche | Todos los derechos reservados.
      </footer>
    </div>
  );
}

function PromoCard({ title, desc }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        color: '#1b1b1b',
        padding: '35px',
        borderRadius: '20px'
      }}
    >
      <h3 style={{ color: '#70d100', fontSize: '28px' }}>{title}</h3>
      <p style={{ marginTop: '15px' }}>{desc}</p>
    </div>
  );
}

const sectionTitle = {
  textAlign: 'center',
  fontSize: '52px',
  marginBottom: '50px',
  color: '#70d100'
};

const heroButton = {
  marginTop: '30px',
  backgroundColor: '#70d100',
  border: 'none',
  padding: '18px 40px',
  borderRadius: '12px',
  fontSize: '18px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const buyButton = {
  width: '100%',
  marginTop: '20px',
  backgroundColor: '#70d100',
  color: 'white',
  border: 'none',
  padding: '15px',
  borderRadius: '12px',
  fontSize: '16px',
  cursor: 'pointer'
};

const inputStyle = {
  padding: '18px',
  borderRadius: '12px',
  border: 'none',
  fontSize: '16px'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold'
};
