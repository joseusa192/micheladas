import { useState } from 'react';

export default function MicheladasPage() {
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Michelada Clásica',
      price: 18000,
      image:
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      desc: 'Cerveza fría, limón, sal y salsa especial.'
    },
    {
      id: 2,
      name: 'Michelada Mango Biche',
      price: 24000,
      image:
        'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80',
      desc: 'Mezcla tropical con mango biche y tajín.'
    },
    {
      id: 3,
      name: 'Michelada Maracuyá',
      price: 26000,
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      desc: 'Sabor cítrico y refrescante premium.'
    },
    {
      id: 4,
      name: 'Michelada Camaronera',
      price: 35000,
      image:
        'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80',
      desc: 'Especial con camarones y salsas artesanales.'
    },
    {
      id: 5,
      name: 'Michelada XXL',
      price: 42000,
      image:
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      desc: 'Presentación gigante para compartir.'
    },
    {
      id: 6,
      name: 'Michelada Viche',
      price: 28000,
      image:
        'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=800&q=80',
      desc: 'Nuestra especialidad con toque verde viche.'
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const isMobile = window.innerWidth <= 768;

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
          padding: '18px 40px',
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

          <button style={heroButton}>Ordenar Ahora</button>
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
                src={product.image}
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
                  {product.desc}
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

      {/* NOSOTROS */}
      <section
        id="nosotros"
        style={{
          padding: '80px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(350px,1fr))',
          alignItems: 'center',
          gap: '40px'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
          alt="Nosotros"
          style={{
            width: '100%',
            borderRadius: '25px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}
        />

        <div>
          <h2 style={sectionTitle}>¿Quiénes Somos?</h2>

          <p style={{ lineHeight: '1.8', fontSize: '18px' }}>
            Somos una marca enfocada en transformar la experiencia tradicional de las
            micheladas en una propuesta moderna, urbana y digital. Nuestro negocio
            combina sabores premium, marketing en redes sociales y pedidos online.
          </p>

          <div style={{ marginTop: '25px' }}>
            <h3 style={{ color: '#70d100' }}>Misión</h3>
            <p>
              Ofrecer experiencias únicas mediante bebidas innovadoras y excelente servicio.
            </p>

            <h3 style={{ color: '#70d100', marginTop: '20px' }}>Visión</h3>
            <p>
              Ser la marca de micheladas más reconocida de la región Caribe.
            </p>
          </div>
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
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/watch?v=JkQabPjazB0"
            title="Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* CARRITO */}
      <section
        style={{
          padding: '80px 40px',
          backgroundColor: '#f4f4f4'
        }}
      >
        <h2 style={sectionTitle}>Carrito de Compras</h2>

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
              Total: ${total.toLocaleString('es-CO')}
            </h3>
          </div>
        )}
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        style={{
          backgroundColor: '#70d100',
          color: 'white',
          padding: '90px 40px'
        }}
      >
        <h2 style={{ fontSize: '50px', textAlign: 'center' }}>Contacto</h2>

        <form
          style={{
            maxWidth: '700px',
            margin: '40px auto 0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <input type="text" placeholder="Nombre" style={inputStyle} />
          <input type="email" placeholder="Correo" style={inputStyle} />
          <textarea
            placeholder="Mensaje"
            rows="5"
            style={inputStyle}
          ></textarea>

          <button style={heroButton}>Enviar Mensaje</button>
        </form>
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
