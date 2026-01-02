import { useState, useEffect } from 'react';
import './App.css';

// Mock data for the application
const mockData = {
  user: {
    name: '',
    phone: '',
    addresses: [],
    balance: 120,
    role: 'client' // guest, client, tsp, courier, hr
  },
  shops: [
    {
      id: 1,
      name: 'Пекарня "Грибоедов"',
      category: 'Пекарня',
      minOrder: 300,
      delivery: 99,
      items: [
        { id: 1, name: 'Сдобная булочка', description: 'С изюмом, 100 г', price: 90 },
        { id: 2, name: 'Багет французский', description: 'Свежий, 200 г', price: 75 },
        { id: 3, name: 'Круассан', description: 'С маслом, 80 г', price: 65 }
      ]
    },
    {
      id: 2,
      name: 'Кафе "Островок"',
      category: 'Кафе',
      minOrder: 250,
      delivery: 120,
      items: [
        { id: 4, name: 'Капучино', description: 'Горячий, 300 мл', price: 180 },
        { id: 5, name: 'Латте', description: 'С ванилью, 350 мл', price: 220 },
        { id: 6, name: 'Круассан с ветчиной', description: 'С сыром, 120 г', price: 280 }
      ]
    },
    {
      id: 3,
      name: 'Парикмахерская "Василек"',
      category: 'Услуги',
      minOrder: 0,
      delivery: 'Самовывоз',
      items: [
        { id: 7, name: 'Стрижка мужская', description: 'Классическая', price: 800 },
        { id: 8, name: 'Стрижка женская', description: 'С укладкой', price: 1500 },
        { id: 9, name: 'Окрашивание', description: 'Корни', price: 1200 }
      ]
    }
  ],
  orders: [
    {
      id: 1,
      shopName: 'Пекарня "Грибоедов"',
      items: [
        { name: 'Сдобная булочка', quantity: 2, price: 180 }
      ],
      total: 180,
      delivery: 99,
      status: 'completed',
      date: '2026-01-03'
    }
  ],
  tspList: ['+79991234567', '+79991234568'], // Mock list of TSP numbers
  courierList: ['+79991234569'] // Mock list of courier numbers
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('#');
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('loviUserData');
    return saved ? JSON.parse(saved) : { ...mockData.user };
  });
  const [cart, setCart] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('loviAddresses');
    return saved ? JSON.parse(saved) : [];
  });
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    house: '',
    apartment: '',
    entrance: '',
    floor: '',
    code: '',
    comment: ''
  });

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#';
      setCurrentScreen(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Set initial screen

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    localStorage.setItem('loviUserData', JSON.stringify(userData));
  }, [userData]);

  // Save addresses to localStorage
  useEffect(() => {
    localStorage.setItem('loviAddresses', JSON.stringify(addresses));
  }, [addresses]);

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
    }
  };

  // Handle login
  const handleLogin = () => {
    const fullPhone = phone.replace(/\D/g, ''); // Remove all non-digit characters
    if (fullPhone.length >= 10) {
      const phoneWithCode = '+7' + fullPhone.slice(-10); // Ensure +7 prefix
      
      // Check if phone is in TSP or courier list
      let role = 'client';
      if (mockData.tspList.includes(phoneWithCode)) {
        role = 'tsp';
      } else if (mockData.courierList.includes(phoneWithCode)) {
        role = 'courier';
      }
      
      setUserData(prev => ({
        ...prev,
        phone: phoneWithCode,
        role: role
      }));
      
      window.location.hash = '#code';
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    const otpCode = otp.join('');
    if (otpCode === '1234') { // Fixed mock code
      if (userData.role === 'tsp') {
        window.location.hash = '#profile?tsp=1';
      } else if (userData.role === 'courier') {
        window.location.hash = '#profile?courier=1';
      } else {
        window.location.hash = '#profile';
      }
    } else {
      alert('Неверный код. Попробуйте ещё раз');
    }
  };

  // Handle profile completion
  const handleCompleteProfile = () => {
    if (userData.name && addresses.length > 0) {
      window.location.hash = '#vitrina';
    }
  };

  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Format phone number for display
  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    return `+7 ••• •••-${digits.slice(-2)}`;
  };

  // Render current screen based on hash
  const renderScreen = () => {
    switch (currentScreen) {
      case '#':
        return <HomeScreen />;
      case '#phone':
        return <PhoneScreen />;
      case '#code':
        return <OtpScreen />;
      case '#profile':
        return <ProfileScreen />;
      case '#addresses':
        return <AddressesScreen />;
      case '#vitrina':
        return <VitrinaScreen />;
      case '#order':
        return <OrderScreen />;
      case '#order-confirmed':
        return <OrderConfirmedScreen />;
      case '#orders':
        return <OrdersScreen />;
      case '#tsp-register':
        return <TspRegisterScreen />;
      case '#courier-register':
        return <CourierRegisterScreen />;
      default:
        if (currentScreen.startsWith('#shop?id=')) {
          const shopId = parseInt(currentScreen.split('=')[1]);
          const shop = mockData.shops.find(s => s.id === shopId);
          if (shop) {
            return <ShopScreen shop={shop} />;
          }
        }
        return <HomeScreen />;
    }
  };

  // Home Screen Component
  const HomeScreen = () => (
    <div className="screen">
      <div className="logo">Л</div>
      <h1 className="text-xl font-semibold text-center mb-2">Единая лояльность для Васильевского</h1>
      <p className="text-base text-center mb-8" style={{ color: '#4B5563' }}>
        Покупайте у местных, получайте баллы, тратьте где угодно на острове
      </p>
      <button 
        className="btn btn-primary" 
        onClick={() => window.location.hash = '#phone'}
      >
        Войти
      </button>
      <a 
        href="#tsp-register" 
        className="link"
        onClick={(e) => {
          e.preventDefault();
          window.location.hash = '#tsp-register';
        }}
      >
        Добавить свой бизнес
      </a>
      <div className="footer">
        <p>
          <a href="/terms" target="_blank" rel="noopener noreferrer">Пользовательское соглашение</a> •{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>
        </p>
      </div>
    </div>
  );

  // Phone Screen Component
  const PhoneScreen = () => (
    <div className="screen">
      <div className="logo">Л</div>
      <h1 className="text-xl font-semibold text-center mb-6">Войдите по номеру</h1>
      
      <input
        type="tel"
        className="phone-input"
        placeholder="+7 (999) 999-99-99"
        value={phone}
        onChange={(e) => {
          let value = e.target.value.replace(/\D/g, ''); // Only digits
          if (value.length > 10) value = value.slice(0, 10);
          
          // Format as +7 (XXX) XXX-XX-XX
          let formatted = '+7 ';
          if (value.length > 1) formatted += `(${value.slice(1, 4)}`;
          if (value.length >= 4) formatted += `) ${value.slice(4, 7)}`;
          if (value.length >= 7) formatted += `-${value.slice(7, 9)}`;
          if (value.length >= 9) formatted += `-${value.slice(9, 11)}`;
          
          setPhone(formatted);
        }}
        maxLength={18}
      />
      
      <button 
        className={`btn btn-primary ${phone.replace(/\D/g, '').length < 10 ? 'btn:disabled' : ''}`} 
        disabled={phone.replace(/\D/g, '').length < 10}
        onClick={handleLogin}
      >
        Получить код
      </button>
      
      <p className="text-sm text-center" style={{ color: '#6B7280' }}>
        Отправляя код, вы соглашаетесь с условиями{' '}
        <a href="/terms" className="link-underline" style={{ color: '#0066FF' }}>Пользовательское соглашение</a> и{' '}
        <a href="/privacy" className="link-underline" style={{ color: '#0066FF' }}>Политика конфиденциальности</a>
      </p>
    </div>
  );

  // OTP Screen Component
  const OtpScreen = () => (
    <div className="screen">
      <div className="logo">Л</div>
      <h1 className="text-xl font-semibold text-center mb-6">
        Код отправлен на {formatPhoneDisplay(userData.phone)}
      </h1>
      
      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            className="otp-input"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onPaste={handleOtpPaste}
            maxLength={1}
          />
        ))}
      </div>
      
      <p className="text-sm text-center mb-8" style={{ color: '#6B7280' }}>
        Запросить код повторно через 00:30
      </p>
      
      <button 
        className={`btn btn-primary ${otp.some(d => d === '') ? 'btn:disabled' : ''}`} 
        disabled={otp.some(d => d === '')}
        onClick={handleVerifyOtp}
      >
        Продолжить
      </button>
    </div>
  );

  // Profile Screen Component
  const ProfileScreen = () => (
    <div className="screen">
      <h1 className="text-xl font-semibold text-center mb-6">Добро пожаловать!</h1>
      
      <input
        type="text"
        className="form-input mb-6"
        placeholder="Иван Иванов"
        value={userData.name}
        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
      />
      
      <div className="mb-8">
        <h2 className="text-base font-medium mb-2">Адрес доставки</h2>
        {addresses.length > 0 ? (
          <div className="address-item">
            <div className="address-name">{addresses[0].name}</div>
            <div className="address-details">
              {addresses[0].street}, д. {addresses[0].house}
              {addresses[0].apartment && `, кв. ${addresses[0].apartment}`}
            </div>
          </div>
        ) : (
          <button 
            className="btn btn-outline" 
            onClick={() => window.location.hash = '#addresses'}
          >
            Добавить адрес
          </button>
        )}
      </div>
      
      <button 
        className="btn btn-accent-outline mb-4" 
        onClick={() => window.location.hash = '#tsp-register'}
      >
        Добавить свой бизнес
      </button>
      
      <button 
        className="btn btn-outline mb-8" 
        onClick={() => window.location.hash = '#courier-register'}
      >
        Стать курьером
      </button>
      
      <button 
        className={`btn btn-primary ${!(userData.name && addresses.length > 0) ? 'btn:disabled' : ''}`} 
        disabled={!(userData.name && addresses.length > 0)}
        onClick={handleCompleteProfile}
      >
        Продолжить
      </button>
    </div>
  );

  // Addresses Screen Component
  const AddressesScreen = () => (
    <div className="screen">
      <h1 className="text-xl font-semibold text-center mb-6">Адреса доставки</h1>
      
      {addresses.map((addr, index) => (
        <div key={index} className="address-item">
          <div className="address-name">{addr.name}</div>
          <div className="address-details">
            {addr.street}, д. {addr.house}
            {addr.apartment && `, кв. ${addr.apartment}`}
            {addr.entrance && `, подъезд ${addr.entrance}`}
            {addr.floor && `, эт. ${addr.floor}`}
          </div>
          <div className="address-actions">
            <button className="address-action-btn">Изменить</button>
            <button 
              className="address-action-btn" 
              onClick={() => {
                const newAddresses = addresses.filter((_, i) => i !== index);
                setAddresses(newAddresses);
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
      
      <button 
        className="btn btn-primary" 
        onClick={() => {
          if (newAddress.street && newAddress.house) {
            const addr = { ...newAddress, id: Date.now() };
            setAddresses(prev => [...prev, addr]);
            setNewAddress({
              name: '',
              street: '',
              house: '',
              apartment: '',
              entrance: '',
              floor: '',
              code: '',
              comment: ''
            });
          }
        }}
      >
        + Добавить новый адрес
      </button>
      
      <div className="mt-8">
        <input
          type="text"
          className="form-input mb-4"
          placeholder="Название адреса (Дом, Работа...)"
          value={newAddress.name}
          onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="text"
          className="form-input mb-4"
          placeholder="Улица"
          value={newAddress.street}
          onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
        />
        <div style={{ display: 'flex', gap: '16px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Дом"
            value={newAddress.house}
            onChange={(e) => setNewAddress(prev => ({ ...prev, house: e.target.value }))}
            style={{ flex: 1 }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Кв."
            value={newAddress.apartment}
            onChange={(e) => setNewAddress(prev => ({ ...prev, apartment: e.target.value }))}
            style={{ flex: 1 }}
          />
        </div>
      </div>
    </div>
  );

  // Vitrina Screen Component
  const VitrinaScreen = () => (
    <div className="screen">
      <div className="header">
        <div className="logo">Л</div>
        <div 
          className="header-balance" 
          onClick={() => window.location.hash = '#profile'}
        >
          {userData.balance} баллов
        </div>
      </div>
      
      <input
        type="text"
        className="form-input mb-4"
        placeholder="Найти товар или услугу…"
      />
      
      <div className="category-filters">
        <div className="category-filter active">Все</div>
        <div className="category-filter">Еда</div>
        <div className="category-filter">Товары</div>
        <div className="category-filter">Услуги</div>
      </div>
      
      {mockData.shops.map(shop => (
        <div key={shop.id} className="product-card">
          <h3 className="product-title">{shop.name}</h3>
          <p className="text-sm" style={{ color: '#4B5563' }}>{shop.category}</p>
          <p className="text-sm mb-2">От {shop.minOrder} ₽</p>
          <p className="text-sm mb-4">Доставка {typeof shop.delivery === 'number' ? shop.delivery + ' ₽' : shop.delivery}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setSelectedShop(shop);
              window.location.hash = `#shop?id=${shop.id}`;
            }}
          >
            Заказать
          </button>
        </div>
      ))}
      
      <div className="nav-bottom">
        <a href="#vitrina" className="nav-item active">
          <div className="nav-icon">🛒</div>
          <span>Витрина</span>
        </a>
        <a href="#orders" className="nav-item">
          <div className="nav-icon">📦</div>
          <span>Заказы</span>
        </a>
        <a href="#profile" className="nav-item">
          <div className="nav-icon">👤</div>
          <span>Профиль</span>
        </a>
      </div>
    </div>
  );

  // Shop Screen Component
  const ShopScreen = ({ shop }) => (
    <div className="screen">
      <div className="shop-header">
        <h1 className="shop-name">{shop.name}</h1>
        <p className="shop-category">{shop.category} • Еда</p>
        <p className="shop-delivery">От {shop.minOrder} ₽ • {typeof shop.delivery === 'number' ? shop.delivery + ' ₽ доставка' : shop.delivery}</p>
      </div>
      
      <div className="category-filters">
        <div className="category-filter active">Все</div>
        <div className="category-filter">Выпечка</div>
        <div className="category-filter">Кофе</div>
        <div className="category-filter">Напитки</div>
      </div>
      
      {shop.items.map(item => (
        <div key={item.id} className="product-card">
          <h3 className="product-title">{item.name}</h3>
          <p className="product-desc">{item.description}</p>
          <p className="product-price">{item.price} ₽</p>
          <button 
            className="add-btn"
            onClick={() => addToCart(item)}
          >
            +
          </button>
        </div>
      ))}
      
      {cart.length > 0 && (
        <button 
          className="floating-cart"
          onClick={() => window.location.hash = '#order'}
        >
          🛒
        </button>
      )}
    </div>
  );

  // Order Screen Component
  const OrderScreen = () => {
    const [deliveryType, setDeliveryType] = useState('courier'); // 'courier' or 'pickup'
    const [promoCode, setPromoCode] = useState('');
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    
    const deliveryCost = deliveryType === 'courier' ? 99 : 0;
    const totalWithDelivery = cartTotal + deliveryCost;
    const finalTotal = Math.max(0, totalWithDelivery - loyaltyPoints);
    
    return (
      <div className="screen">
        <h1 className="text-xl font-semibold text-center mb-6">Оформление заказа</h1>
        
        {cart.map((item, index) => (
          <div key={index} className="order-item">
            <span>{item.name} × {item.quantity}</span>
            <span>{item.price * item.quantity} ₽</span>
          </div>
        ))}
        
        <div className="order-summary">
          <div className="order-item">
            <span>Товары</span>
            <span>{cartTotal} ₽</span>
          </div>
          <div className="order-item">
            <span>Доставка</span>
            <span>{deliveryCost} ₽</span>
          </div>
          {loyaltyPoints > 0 && (
            <div className="order-item">
              <span>Баллы Лови</span>
              <span>-{loyaltyPoints} ₽</span>
            </div>
          )}
          <div className="order-total">
            <span>Итого</span>
            <span>{finalTotal} ₽</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Доставка</h2>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <button
              className={`btn ${deliveryType === 'pickup' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setDeliveryType('pickup')}
              style={{ flex: 1, marginBottom: 0 }}
            >
              Самовывоз
            </button>
            <button
              className={`btn ${deliveryType === 'courier' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setDeliveryType('courier')}
              style={{ flex: 1, marginBottom: 0 }}
            >
              Курьер
            </button>
          </div>
          
          {deliveryType === 'courier' && addresses.length > 0 && (
            <div className="address-item">
              <div className="address-name">{addresses[0].name}</div>
              <div className="address-details">
                {addresses[0].street}, д. {addresses[0].house}
                {addresses[0].apartment && `, кв. ${addresses[0].apartment}`}
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Промокод</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Введите промокод"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              style={{ flex: 1 }}
            />
            <button 
              className="btn btn-outline" 
              style={{ width: 'auto', padding: '0 16px', marginBottom: 0 }}
              onClick={() => alert('Промокод применен')}
            >
              Применить
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Оплата</h2>
          <p className="text-sm mb-2">У вас {userData.balance} баллов "Лови"</p>
          
          <div className="payment-slider-container">
            <div className="payment-slider-label">
              <span>Потратить</span>
              <span>{loyaltyPoints} из {userData.balance}</span>
            </div>
            <input
              type="range"
              min="0"
              max={userData.balance}
              value={loyaltyPoints}
              className="slider"
              onChange={(e) => setLoyaltyPoints(parseInt(e.target.value))}
            />
          </div>
        </div>
        
        <button 
          className="btn btn-primary" 
          onClick={() => window.location.hash = '#order-confirmed'}
        >
          Оплатить {finalTotal} ₽
        </button>
      </div>
    );
  };

  // Orders Screen Component
  const OrdersScreen = () => (
    <div className="screen">
      <h1 className="text-xl font-semibold text-center mb-6">Мои заказы</h1>
      
      {mockData.orders.map(order => (
        <div key={order.id} className="order-details" onClick={() => console.log('Order details')}>
          <div className="order-details-header">
            <h3>{order.shopName}</h3>
            <span>{order.total + order.delivery} ₽</span>
          </div>
          <p className="text-sm" style={{ color: '#4B5563' }}>{order.date}</p>
        </div>
      ))}
      
      <div className="nav-bottom">
        <a href="#vitrina" className="nav-item">
          <div className="nav-icon">🛒</div>
          <span>Витрина</span>
        </a>
        <a href="#orders" className="nav-item active">
          <div className="nav-icon">📦</div>
          <span>Заказы</span>
        </a>
        <a href="#profile" className="nav-item">
          <div className="nav-icon">👤</div>
          <span>Профиль</span>
        </a>
      </div>
    </div>
  );

  // Order Confirmed Screen Component
  const OrderConfirmedScreen = () => (
    <div className="screen">
      <div className="success-screen">
        <div className="success-icon">
          <i>✓</i>
        </div>
        <h1 className="success-title">Заказ принят!</h1>
        <p className="success-subtitle">Спасибо за покупку в "Пекарне Грибоедов"</p>
        <div className="success-bonus">
          <i>💰</i>
          <span>+9 баллов "Лови" начислено на ваш счёт</span>
        </div>
        <div className="order-summary mb-8">
          <div className="order-details-header">
            <h3>Детали заказа</h3>
            <span>▼</span>
          </div>
          <div className="order-details-content expanded">
            <div className="order-item">
              <span>Сдобная булочка ×2</span>
              <span>180 ₽</span>
            </div>
            <div className="order-item">
              <span>Доставка</span>
              <span>99 ₽</span>
            </div>
            <div className="order-total">
              <span>Итого</span>
              <span>279 ₽</span>
            </div>
          </div>
        </div>
        <button 
          className="btn btn-primary mb-4" 
          onClick={() => window.location.hash = '#vitrina'}
        >
          Вернуться в витрину
        </button>
        <button 
          className="btn btn-outline" 
          onClick={() => window.location.hash = '#orders'}
        >
          Мои заказы
        </button>
      </div>
    </div>
  );

  // TSP Register Screen Component
  const TspRegisterScreen = () => (
    <div className="screen">
      <h1 className="text-xl font-semibold text-center mb-6">Добавить свой бизнес</h1>
      
      <div className="mb-6">
        <input
          type="text"
          className="form-input mb-4"
          placeholder="Название точки"
        />
        <input
          type="text"
          className="form-input mb-4"
          placeholder="Тип деятельности (кафе, магазин и т.д.)"
        />
        <input
          type="text"
          className="form-input mb-4"
          placeholder="Адрес"
        />
        <input
          type="tel"
          className="form-input mb-4"
          placeholder="Телефон"
        />
        <textarea
          className="form-input mb-4"
          placeholder="Описание"
          rows="3"
        />
      </div>
      
      <button 
        className="btn btn-primary" 
        onClick={() => {
          alert('Заявка отправлена на модерацию');
          window.location.hash = '#tsp';
        }}
      >
        Отправить на модерацию
      </button>
    </div>
  );

  // Courier Register Screen Component
  const CourierRegisterScreen = () => (
    <div className="screen">
      <h1 className="text-xl font-semibold text-center mb-6">Стать курьером</h1>
      
      <div className="mb-6">
        <input
          type="text"
          className="form-input mb-4"
          placeholder="ФИО"
        />
        <input
          type="tel"
          className="form-input mb-4"
          placeholder="Телефон"
        />
        <input
          type="text"
          className="form-input mb-4"
          placeholder="Транспорт (велосипед, скутер, машина)"
        />
        <textarea
          className="form-input mb-4"
          placeholder="Дополнительная информация"
          rows="3"
        />
      </div>
      
      <button 
        className="btn btn-primary" 
        onClick={() => {
          alert('Заявка отправлена');
          window.location.hash = '#courier';
        }}
      >
        Отправить заявку
      </button>
    </div>
  );

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App
