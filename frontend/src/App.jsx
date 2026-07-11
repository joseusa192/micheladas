import { useState, useEffect } from "react";
import "./App.css";

const baseOptions = [
  { id: "cerveza", label: "Cerveza", modifier: 0, description: "Clásica" },
  { id: "mango", label: "Jugo de mango", modifier: 1200, description: "Fruta fresca" },
  { id: "tamarindo", label: "Jugo de tamarindo", modifier: 1400, description: "Toque dulce y ácido" },
  { id: "jamaica", label: "Jugo de jamaica", modifier: 1100, description: "Flor de jamaica" }
];

const initialProducts = [
  {
    id: 1,
    name: "Clásica Tropical",
    description: "Michelada con salsa tradicional, limón fresco y una pizca de chile.",
    ingredients: ["Salsa Valentina", "Limón", "Sal", "Chile en polvo"],
    basePrice: 8500,
    image_url: "https://images.unsplash.com/photo-1606813902490-3a04f42a96dc?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Ensamble de Mango",
    description: "Sabor dulce con mango natural, chamoy y un borde de chile piquín.",
    ingredients: ["Mango", "Chamoy", "Chile piquín", "Sal de gusano"],
    basePrice: 9800,
    image_url: "https://images.unsplash.com/photo-1565895405130-0f0d5a4bc8d0?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Tamarindo Picante",
    description: "Refrescante michelada con tamarindo, salsa y un toque de jalapeño.",
    ingredients: ["Tamarindo", "Jalapeño", "Limón", "Salsa roja"],
    basePrice: 9100,
    image_url: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f5d?auto=format&fit=crop&w=1000&q=80"
  }
];

const defaultSelections = initialProducts.reduce((acc, product) => {
  acc[product.id] = { baseId: "cerveza", quantity: 1 };
  return acc;
}, {});

export default function MicheladasPage() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(initialProducts);
  const [selections, setSelections] = useState(defaultSelections);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/productos")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description || product.name,
            ingredients: product.ingredients || ["Ingrediente especial"],
            basePrice: Number(product.price) || 0,
            image_url: product.image_url || "https://images.unsplash.com/photo-1565895405130-0f0d5a4bc8d0?auto=format&fit=crop&w=1000&q=80"
          }));
          setProducts(normalized);
        }
      })
      .catch(() => {
        // Mantener el menú inicial si el backend no está disponible.
      });
  }, []);

  const getBaseOption = (baseId) => baseOptions.find((option) => option.id === baseId) ?? baseOptions[0];

  const computePrice = (product, baseId) => {
    const baseOption = getBaseOption(baseId);
    return product.basePrice + baseOption.modifier;
  };

  const handleBaseChange = (productId, baseId) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], baseId }
    }));
  };

  const handleQuantityChange = (productId, delta) => {
    setSelections((prev) => {
      const quantity = Math.max(1, prev[productId].quantity + delta);
      return {
        ...prev,
        [productId]: { ...prev[productId], quantity }
      };
    });
  };

  const addToCart = (product) => {
    const selection = selections[product.id] || { baseId: "cerveza", quantity: 1 };
    const baseOption = getBaseOption(selection.baseId);
    const unitPrice = computePrice(product, selection.baseId);
    const cartKey = `${product.id}-${selection.baseId}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartKey === cartKey);
      if (existingIndex >= 0) {
        const nextCart = [...prevCart];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + selection.quantity
        };
        return nextCart;
      }

      return [
        ...prevCart,
        {
          cartKey,
          productId: product.id,
          name: product.name,
          baseLabel: baseOption.label,
          ingredients: product.ingredients,
          quantity: selection.quantity,
          unitPrice,
          description: product.description
        }
      ];
    });
  };

  const updateCartQuantity = (cartKey, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.cartKey !== cartKey
            ? item
            : { ...item, quantity: Math.max(1, item.quantity + delta) }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (cartKey) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartKey !== cartKey));
  };

  const total = cart.reduce((accum, item) => accum + item.unitPrice * item.quantity, 0);

  return (
    <div className="page-shell">
      <nav className="main-nav">
        <div>
          <span className="brand-badge">Micheladas Viche</span>
          <p className="brand-tag">Sabores creados para tu fiesta</p>
        </div>

        <div className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#menu">Menú</a>
          <a href="#promos">Promociones</a>
          <a href="#carrito">Carrito</a>
        </div>
      </nav>

      <header id="inicio" className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Micheladas artesanales</span>
          <h1>Elige tu base, elige tu sabor.</h1>
          <p>
            Ordena micheladas con bases cambiables, ingredientes premium y un precio
            que se ajusta a la bebida que prefieras.
          </p>
          <a href="#menu" className="hero-cta">
            Ver menú
          </a>
        </div>
      </header>

      <section className="feature-strip">
        <div className="feature-card">
          <strong>Base personalizable</strong>
          <p>Cambia de cerveza a jugo de fruta y ajusta tu precio al instante.</p>
        </div>
        <div className="feature-card">
          <strong>Sabores predeterminados</strong>
          <p>Cada michelada viene con ingredientes definidos y una experiencia única.</p>
        </div>
        <div className="feature-card">
          <strong>Carrito con cantidades</strong>
          <p>Selecciona cuántas micheladas quieres y ajusta las unidades fácilmente.</p>
        </div>
      </section>

      <section id="menu" className="menu-section">
        <h2 className="section-title">Nuestros sabores</h2>

        <div className="product-grid">
          {products.map((product) => {
            const selection = selections[product.id] || { baseId: "cerveza", quantity: 1 };
            const price = computePrice(product, selection.baseId);

            return (
              <article key={product.id} className="product-card">
                <img className="product-image" src={product.image_url} alt={product.name} />
                <div className="product-content">
                  <div className="product-header">
                    <h3>{product.name}</h3>
                    
                  </div>
                  <span className="price-chip">${price.toLocaleString("es-CO")}</span>
                  <p className="product-description">{product.description}</p>

                  <div className="ingredient-list">
                    {product.ingredients.map((ingredient) => (
                      <span key={ingredient} className="ingredient-pill">
                        {ingredient}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions">
                    <div className="select-row">
                      <label htmlFor={`base-${product.id}`}>Base</label>
                      <select
                        id={`base-${product.id}`}
                        value={selection.baseId}
                        onChange={(event) => handleBaseChange(product.id, event.target.value)}
                      >
                        {baseOptions.map((base) => (
                          <option key={base.id} value={base.id}>
                            {base.label} (+${base.modifier.toLocaleString("es-CO")})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                      <span>{selection.quantity}</span>
                      <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                    </div>
                  </div>

                  <button className="add-button" onClick={() => addToCart(product)}>
                    Agregar {selection.quantity} 
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="carrito" className="cart-section">
        <div className="cart-header">
          <div>
            <span className="eyebrow">Tu selección</span>
            <h2>Carrito de micheladas</h2>
          </div>
          <div className="cart-summary">
            <strong>{cart.length} artículo{cart.length === 1 ? "" : "s"}</strong>
            <span>Total: ${total.toLocaleString("es-CO")}</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">No tienes micheladas en el carrito aún.</div>
        ) : (
          <div className="cart-card">
            {cart.map((item) => (
              <div key={item.cartKey} className="cart-item">
                <div className="item-details">
                  <div className="item-title">
                    <h3>{item.name}</h3>
                    <span className="base-tag">Base: {item.baseLabel}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className="ingredient-list small">
                    {item.ingredients.map((ingredient) => (
                      <span key={ingredient} className="ingredient-pill">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="item-actions">
                  <div className="quantity-control small">
                    <button onClick={() => updateCartQuantity(item.cartKey, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.cartKey, 1)}>+</button>
                  </div>
                  <div className="item-price">
                    <span>{item.quantity} x ${item.unitPrice.toLocaleString("es-CO")}</span>
                    <strong>${(item.unitPrice * item.quantity).toLocaleString("es-CO")}</strong>
                  </div>
                  <button className="remove-button" onClick={() => removeCartItem(item.cartKey)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="site-footer">
        <p>© 2026 Micheladas Viche | Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
