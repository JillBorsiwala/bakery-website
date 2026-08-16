import { useEffect, useMemo, useState } from 'react';
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import Contact from './components/Contact/Contact';
import CustomerModal from './components/CustomerModal/CustomerModal';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import QuantityModal from './components/QuantityModal/QuantityModal';
import SearchModal from './components/SearchModal/SearchModal';
import Speciality from './components/Speciality/Speciality';
import { CartProvider, useCart } from './context/CartContext';
import { createOrder } from './services/orders';
import { fetchProducts, fetchSpecialityProducts } from './services/products';
import { calculateTotal } from './utils/calculateTotal';

function BakeryApp() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [specialityProducts, setSpecialityProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isSpecialityLoading, setIsSpecialityLoading] = useState(true);
  const [productsError, setProductsError] = useState('');
  const [specialityError, setSpecialityError] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');
  const { cartItems, addItem, setCartItems } = useCart();

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      setIsProductsLoading(true);
      setIsSpecialityLoading(true);
      setProductsError('');
      setSpecialityError('');

      const [allProductsResult, specialityResult] = await Promise.allSettled([
        fetchProducts(),
        fetchSpecialityProducts(),
      ]);

      if (cancelled) {
        return;
      }

      if (allProductsResult.status === 'fulfilled') {
        setProducts(allProductsResult.value);
      } else {
        setProducts([]);
        setProductsError(allProductsResult.reason?.message || 'Unable to load products');
      }

      if (specialityResult.status === 'fulfilled') {
        setSpecialityProducts(specialityResult.value);
      } else {
        setSpecialityProducts([]);
        setSpecialityError(specialityResult.reason?.message || 'Unable to load products');
      }

      setIsProductsLoading(false);
      setIsSpecialityLoading(false);
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const menuItems = useMemo(() => products.filter((item) => !item.is_special), [products]);
  const searchItems = useMemo(() => products, [products]);

  const totalCost = calculateTotal(cartItems);

  const scrollToSection = (sectionId) => {
    setIsMobileOpen(false);
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsQuantityOpen(true);
  };

  const handleConfirmQuantity = (quantity) => {
    if (selectedProduct) {
      addItem(selectedProduct, quantity);
    }

    setSelectedProduct(null);
    setIsQuantityOpen(false);
  };

  const handleSubmitOrder = () => {
    if (cartItems.length > 0) {
      setOrderError('');
      setIsCustomerOpen(true);
    }
  };

  const handleConfirmCustomer = async ({ customerName, items }) => {
    setIsSubmittingOrder(true);
    setOrderError('');

    try {
      const payload = {
        customer_name: customerName,
        items: items.map((item) => ({
          product_id: item.product_id ?? item.id,
          quantity: item.quantity,
        })),
      };

      await createOrder(payload);
      setCartItems([]);
      setIsCustomerOpen(false);
    } catch (error) {
      setOrderError(error?.message || 'Server unavailable');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const handleSearchResultSelect = (item) => {
    const sectionId = item.is_special ? 'speciality' : 'menu';
    setIsSearchOpen(false);
    scrollToSection(sectionId);
  };

  const menuStatusMessage = isProductsLoading
    ? 'Loading...'
    : productsError || '';

  const specialityStatusMessage = isSpecialityLoading
    ? 'Loading...'
    : specialityError || '';

  return (
    <div className="app-shell">
      <Navbar
        isMobileOpen={isMobileOpen}
        onToggleMobile={() => setIsMobileOpen((currentState) => !currentState)}
        onNavigate={scrollToSection}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main>
        <Hero onExploreMenu={() => scrollToSection('menu')} />
        <About />
        <Menu
          items={menuItems}
          onSelectProduct={handleSelectProduct}
          statusMessage={menuStatusMessage}
        />
        <Cart onSubmitOrder={handleSubmitOrder} />
        <Speciality
          items={specialityProducts}
          onSelectProduct={handleSelectProduct}
          statusMessage={specialityStatusMessage}
        />
        <Contact />
      </main>

      <Footer />

      <SearchModal
        isOpen={isSearchOpen}
        items={searchItems}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchResultSelect}
      />

      <QuantityModal
        product={selectedProduct}
        isOpen={isQuantityOpen}
        onClose={() => setIsQuantityOpen(false)}
        onConfirm={handleConfirmQuantity}
      />

      <CustomerModal
        isOpen={isCustomerOpen}
        onClose={() => setIsCustomerOpen(false)}
        onConfirm={handleConfirmCustomer}
        items={cartItems}
        totalCost={totalCost}
        submitError={orderError}
        isSubmitting={isSubmittingOrder}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BakeryApp />
    </CartProvider>
  );
}