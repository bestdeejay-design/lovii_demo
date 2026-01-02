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
      date: '2026-01-03',
      statusHistory: [
        { status: 'Оформлен', time: '12:30' },
        { status: 'Подтверждён', time: '12:35' },
        { status: 'Передан курьеру', time: '12:50', active: true },
        { status: 'В пути', time: 'ожидается' },
        { status: 'Доставлен', time: 'ожидается' }
      ],
      courier: {
        name: 'Алексей',
        phone: '+79991234569'
      },
      deliveryAddress: '7-я линия В.О., 25, кв. 12',
      shopAddress: 'Пекарня "Грибоедов", 10-я линия В.О., 10'
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
      case '#wallet':
        return <WalletScreen />;
      case '#connect-loyalty':
        return <ConnectLoyaltyScreen />;
      case '#exchange':
        return <ExchangeScreen />;
      case '#payout':
        return <PayoutScreen />;
      case '#tsp':
        return <TspPanelScreen />;
      case '#payout-confirmed':
        return <PayoutConfirmedScreen />;
      case '#courier':
        return <CourierPanelScreen />;
      case '#hr-register':
        return <HrRegisterScreen />;
      case '#hr-dashboard':
        return <HrDashboardScreen />;
      default:
        if (currentScreen.startsWith('#shop?id=')) {
          const shopId = parseInt(currentScreen.split('=')[1]);
          const shop = mockData.shops.find(s => s.id === shopId);
          if (shop) {
            return <ShopScreen shop={shop} />;
          }
        }
        if (currentScreen.startsWith('#order-detail?id=')) {
          const orderId = parseInt(currentScreen.split('=')[1]);
          const order = mockData.orders.find(o => o.id === orderId);
          if (order) {
            return <OrderDetailScreen order={order} />;
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
  const ProfileScreen = () => {
    // Check if profile is already filled (not just the initial screen)
    const isProfileFilled = userData.name && addresses.length > 0;
    
    if (isProfileFilled) {
      // Filled profile screen
      return (
        <div className="screen">
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center mb-1">{userData.name}</h2>
            <p className="text-center" style={{ color: '#4B5563' }}>{formatPhoneDisplay(userData.phone)}</p>
          </div>
          
          <div className="order-summary mb-6">
            <div className="order-item">
              <div className="flex items-center">
                <span className="mr-2">💰</span>
                <span>{userData.balance} баллов "Лови"</span>
              </div>
              <button 
                className="btn btn-accent" 
                style={{ width: 'auto', padding: '4px 12px', height: 'auto', fontSize: '0.875rem' }}
                onClick={() => window.location.hash = '#payout'}
              >
                Вывести на карту
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <a href="#orders" className="profile-section">
              <div className="profile-section-content">
                <div className="flex items-center">
                  <span className="profile-section-icon">📦</span>
                  <span>История заказов</span>
                </div>
              </div>
              <span className="profile-section-arrow">→</span>
            </a>
            
            <a href="#addresses" className="profile-section">
              <div className="profile-section-content">
                <div className="flex items-center">
                  <span className="profile-section-icon">📍</span>
                  <span>Адреса доставки</span>
                </div>
              </div>
              <span className="profile-section-arrow">→</span>
            </a>
            
            <a 
              href="#" 
              className="profile-section"
              onClick={(e) => {
                e.preventDefault();
                alert('Реферальная ссылка: https://lovii.mobiap.com/mobile/ref/' + userData.phone.replace(/\D/g, ''));
              }}
            >
              <div className="profile-section-content">
                <div className="flex items-center">
                  <span className="profile-section-icon">🔗</span>
                  <span>Реферальная ссылка</span>
                </div>
              </div>
              <span className="profile-section-arrow">→</span>
            </a>
            
            <a href="#tsp-register" className="profile-section">
              <div className="profile-section-content">
                <div className="flex items-center">
                  <span className="profile-section-icon">🏪</span>
                  <span>Добавить свой бизнес</span>
                </div>
              </div>
              <span className="profile-section-arrow">→</span>
            </a>
            
            <a href="#courier-register" className="profile-section">
              <div className="profile-section-content">
                <div className="flex items-center">
                  <span className="profile-section-icon">🚴</span>
                  <span>Стать курьером</span>
                </div>
              </div>
              <span className="profile-section-arrow">→</span>
            </a>
            
            <a 
              href="#" 
              className="profile-section"
              onClick={(e) => {
                e.preventDefault();
                alert('Настройки уведомлений (в демо: переключатель без действия)');
              }}
            >
              <div className="profile-section-content">
                <div className="flex items-center">
                  <span className="profile-section-icon">🔔</span>
                  <span>Настройки уведомлений</span>
                </div>
              </div>
            </a>
          </div>
          
          <button 
            className="btn btn-error" 
            onClick={() => {
              if (confirm('Выйти из аккаунта?')) {
                setUserData({ ...mockData.user });
                window.location.hash = '';
              }
            }}
          >
            Выйти из аккаунта
          </button>
          
          <div className="nav-bottom">
            <a href="#vitrina" className="nav-item">
              <div className="nav-icon">🛒</div>
              <span>Витрина</span>
            </a>
            <a href="#orders" className="nav-item">
              <div className="nav-icon">📦</div>
              <span>Заказы</span>
            </a>
            <a href="#profile" className="nav-item active">
              <div className="nav-icon">👤</div>
              <span>Профиль</span>
            </a>
          </div>
        </div>
      );
    } else {
      // Initial profile setup screen
      return (
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
    }
  };

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
        <div 
          key={order.id} 
          className="order-details" 
          onClick={() => {
            window.location.hash = `#order-detail?id=${order.id}`;
          }}
        >
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

  // Wallet Screen Component
  const WalletScreen = () => (
    <div className="screen">
      <h1 className="text-xl font-semibold text-center mb-6">Мои баллы</h1>
      
      <div className="mb-8">
        <div className="flex items-center justify-center mb-2">
          <span className="text-2xl mr-2">💰</span>
          <span className="text-xl font-semibold">Общий баланс: {userData.balance} ₽</span>
        </div>
        <p className="text-center text-sm" style={{ color: '#6B7280' }}>Эквивалент в рублях по текущим курсам</p>
      </div>
      
      <div className="mb-6">
        <div className="address-item">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-3">📱</span>
            <div className="flex-grow">
              <div className="font-medium">Баллы Лови</div>
              <div className="text-sm" style={{ color: '#4B5563' }}>{userData.balance} баллов</div>
            </div>
            <span className="text-sm font-medium" style={{ color: '#FF6B00' }}>= {userData.balance} ₽</span>
          </div>
          <div className="text-xs" style={{ color: '#6B7280' }}>Сгорают 31.12.2026</div>
        </div>
      </div>
      
      <button 
        className="btn btn-accent mb-8" 
        onClick={() => window.location.hash = '#connect-loyalty'}
      >
        + Подключить банк или сервис
      </button>
      
      <div className="nav-bottom">
        <a href="#vitrina" className="nav-item">
          <div className="nav-icon">🛒</div>
          <span>Витрина</span>
        </a>
        <a href="#orders" className="nav-item">
          <div className="nav-icon">📦</div>
          <span>Заказы</span>
        </a>
        <a href="#profile" className="nav-item active">
          <div className="nav-icon">👤</div>
          <span>Профиль</span>
        </a>
      </div>
    </div>
  );

  // Connect Loyalty Screen Component
  const ConnectLoyaltyScreen = () => (
    <div className="screen">
      <h1 className="text-xl font-semibold text-center mb-6">Подключите программу лояльности</h1>
      
      <p className="text-base text-center mb-8" style={{ color: '#4B5563' }}>
        Выберите сервис, в котором у вас есть баллы. Мы покажем, сколько вы можете обменять.
      </p>
      
      <div className="mb-6">
        <div className="address-item">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-xl mr-3">📱</span>
              <div>
                <div className="font-medium">Билайн</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>Доступно: 500 баллов</div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 16px', height: 'auto' }}>
              Подключить
            </button>
          </div>
        </div>
        
        <div className="address-item">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-xl mr-3">💳</span>
              <div>
                <div className="font-medium">Тинькофф</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>Доступно: 1200 баллов</div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 16px', height: 'auto' }}>
              Подключить
            </button>
          </div>
        </div>
        
        <div className="address-item">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-xl mr-3">📷</span>
              <div>
                <div className="font-medium">Фотострана</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>Доступно: 800 баллов</div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 16px', height: 'auto' }}>
              Подключить
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-base font-medium mb-2">Или введите ID вручную</h2>
        <input
          type="text"
          className="form-input mb-4"
          placeholder="ID программы лояльности"
        />
        <button className="btn btn-primary">Продолжить</button>
      </div>
      
      <div className="flex items-center justify-center text-sm" style={{ color: '#6B7280' }}>
        <span className="mr-2">🛡️</span>
        <span>Ваши данные защищены. Мы не храним пароли и не получаем доступ к личному кабинету.</span>
      </div>
    </div>
  );

  // Exchange Screen Component
  const ExchangeScreen = () => {
    const [source, setSource] = useState('loyi');
    const [amount, setAmount] = useState('');
    const [exchangeRate] = useState(1); // 1 балл = 1 рубль
    const [commission] = useState(0.05); // 5% commission
    
    const numericAmount = parseFloat(amount) || 0;
    const commissionAmount = numericAmount * commission;
    const finalAmount = numericAmount - commissionAmount;
    
    return (
      <div className="screen">
        <h1 className="text-xl font-semibold text-center mb-6">Обмен баллов</h1>
        
        <div className="mb-4">
          <h2 className="text-base font-medium mb-2">Откуда обмениваете?</h2>
          <select 
            className="form-input" 
            value={source} 
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="loyi">Баллы Лови</option>
            <option value="beeline">Баллы Билайна</option>
            <option value="tinkoff">Бонусы Тинькофф</option>
            <option value="fotostrana">Фотобаллы</option>
          </select>
        </div>
        
        <div className="mb-4">
          <h2 className="text-base font-medium mb-2">Сколько обменять?</h2>
          <input
            type="number"
            className="form-input"
            placeholder="Введите сумму"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Доступно: {userData.balance} баллов</p>
        </div>
        
        <div className="order-summary mb-6">
          <div className="order-item">
            <span>Курс</span>
            <span>1 балл = 1 ₽</span>
          </div>
          <div className="order-item">
            <span>Комиссия</span>
            <span>{(commission * 100).toFixed(0)}% ({commissionAmount.toFixed(0)} ₽)</span>
          </div>
          <div className="order-total">
            <span>Получите</span>
            <span>{finalAmount.toFixed(0)} баллов "Лови"</span>
          </div>
        </div>
        
        <button 
          className="btn btn-primary mb-8" 
          disabled={!amount || numericAmount > userData.balance}
          onClick={() => {
            if (numericAmount <= userData.balance) {
              alert(`Обмен ${numericAmount} баллов прошёл успешно!`);
              setUserData(prev => ({
                ...prev,
                balance: prev.balance - numericAmount + finalAmount
              }));
              window.location.hash = '#wallet';
            }
          }}
        >
          Обменять {finalAmount.toFixed(0)} баллов
        </button>
        
        <div>
          <h2 className="text-base font-medium mb-2">История</h2>
          <div className="order-details">
            <div className="order-details-header">
              <span>12.01.2026 — Билайн → Лови</span>
              <span>500 → 475</span>
            </div>
          </div>
          <div className="order-details">
            <div className="order-details-header">
              <span>05.01.2026 — Фотострана → Лови</span>
              <span>200 → 186</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Payout Screen Component
  const PayoutScreen = () => {
    const [payoutAmount, setPayoutAmount] = useState(userData.balance.toString());
    const [cardNumber, setCardNumber] = useState('');
    const commission = 0.03; // 3% commission
    const numericAmount = parseFloat(payoutAmount) || 0;
    const commissionAmount = numericAmount * commission;
    const finalPayout = numericAmount - commissionAmount;
    
    return (
      <div className="screen">
        <h1 className="text-xl font-semibold text-center mb-6">Вывод на карту</h1>
        
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <span className="text-xl mr-2">💰</span>
            <span>Доступно: {userData.balance} баллов "Лови"</span>
          </div>
          
          <h2 className="text-base font-medium mb-2">Сколько вывести?</h2>
          <input
            type="number"
            className="form-input mb-2"
            placeholder="Введите сумму"
            value={payoutAmount}
            onChange={(e) => setPayoutAmount(e.target.value)}
          />
          <p className="text-sm" style={{ color: '#6B7280' }}>1 балл = 1 рубль</p>
        </div>
        
        <div className="order-summary mb-6">
          <div className="order-item">
            <span>Комиссия</span>
            <span>{(commission * 100).toFixed(0)}% ({commissionAmount.toFixed(2)} ₽)</span>
          </div>
          <div className="order-total">
            <span>К получению</span>
            <span>{finalPayout.toFixed(2)} ₽</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Номер карты (СБП)</h2>
          <input
            type="tel"
            className="form-input"
            placeholder="Номер карты (СБП)"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        
        <button 
          className="btn btn-accent" 
          disabled={!payoutAmount || numericAmount > userData.balance || numericAmount < 30}
          onClick={() => {
            if (numericAmount <= userData.balance && numericAmount >= 30) {
              alert(`Вывод ${finalPayout.toFixed(2)} ₽ прошёл успешно!`);
              setUserData(prev => ({
                ...prev,
                balance: prev.balance - numericAmount
              }));
              window.location.hash = '#orders';
            }
          }}
        >
          Вывести {finalPayout.toFixed(2)} ₽
        </button>
      </div>
    );
  };

  // TSP Panel Screen Component
  const TspPanelScreen = () => {
    const [activeTab, setActiveTab] = useState('orders'); // orders, catalog, finance, analytics
    
    return (
      <div className="screen">
        <div className="header">
          <h1 className="header-title">Кафе "Островок"</h1>
          <div className="flex items-center">
            <span className="text-sm mr-2" style={{ color: '#10B981' }}>● Онлайн</span>
            <button 
              className="btn btn-accent" 
              style={{ width: 'auto', padding: '8px 16px', height: '40px' }}
              onClick={() => alert('Курьер вызван!')}
            >
              Вызвать курьера
            </button>
          </div>
        </div>
        
        <div className="flex mb-6">
          <button 
            className={`flex-1 py-4 ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('orders')}
          >
            Заказы
          </button>
          <button 
            className={`flex-1 py-4 ${activeTab === 'catalog' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('catalog')}
          >
            Каталог
          </button>
          <button 
            className={`flex-1 py-4 ${activeTab === 'finance' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('finance')}
          >
            Финансы
          </button>
          <button 
            className={`flex-1 py-4 ${activeTab === 'analytics' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Статистика
          </button>
        </div>
        
        <div className="mb-6">
          {activeTab === 'orders' && (
            <div>
              <div className="order-details">
                <div className="order-details-header">
                  <div>
                    <div className="font-medium">Заказ #123</div>
                    <div className="text-sm" style={{ color: '#4B5563' }}>14:30, Сдобная булочка ×2</div>
                  </div>
                  <span style={{ color: '#FF6B00' }}>Новый</span>
                </div>
                <button 
                  className="btn btn-primary mt-2" 
                  style={{ width: 'auto', padding: '8px 16px', height: 'auto' }}
                  onClick={() => alert('Заказ готов!')}
                >
                  Готов
                </button>
              </div>
              
              <div className="order-details">
                <div className="order-details-header">
                  <div>
                    <div className="font-medium">Заказ #124</div>
                    <div className="text-sm" style={{ color: '#4B5563' }}>14:45, Капучино ×1</div>
                  </div>
                  <span style={{ color: '#10B981' }}>Готов</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'catalog' && (
            <div>
              <button 
                className="btn btn-primary mb-4" 
                onClick={() => alert('Форма добавления товара')}
              >
                Добавить товар
              </button>
              
              {mockData.shops[0]?.items.map(item => (
                <div key={item.id} className="order-details">
                  <div className="order-details-header">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm" style={{ color: '#4B5563' }}>{item.description}</div>
                    </div>
                    <span>{item.price} ₽</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'finance' && (
            <div>
              <div className="order-summary mb-4">
                <div className="order-item">
                  <span>Баланс</span>
                  <span>24 500 ₽</span>
                </div>
                <div className="order-item">
                  <span>Доступно для вывода</span>
                  <span>24 500 ₽</span>
                </div>
              </div>
              
              <button 
                className="btn btn-primary" 
                onClick={() => window.location.hash = '#payout-confirmed'}
              >
                Вывести средства
              </button>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div>
              <div className="order-summary">
                <div className="order-item">
                  <span>Заказов за сегодня</span>
                  <span>12</span>
                </div>
                <div className="order-item">
                  <span>Выручка за сегодня</span>
                  <span>4 200 ₽</span>
                </div>
                <div className="order-item">
                  <span>Средний чек</span>
                  <span>350 ₽</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="nav-bottom">
          <a 
            href="#" 
            className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              if (confirm('Выйти из аккаунта?')) {
                setUserData({ ...mockData.user });
                window.location.hash = '';
              }
            }}
          >
            <div className="nav-icon">🚪</div>
            <span>Выйти</span>
          </a>
        </div>
      </div>
    );
  };

  // Payout Confirmed Screen Component
  const PayoutConfirmedScreen = () => (
    <div className="screen">
      <div className="success-screen">
        <div className="success-icon">
          <i>✓</i>
        </div>
        <h1 className="success-title">Выплата подтверждена!</h1>
        <p className="success-subtitle">Средства за заказ #123 зачислены на ваш счёт</p>
        
        <div className="order-summary mb-8">
          <div className="order-item">
            <span>Итого к получению</span>
            <span>279 ₽</span>
          </div>
          <div className="order-item">
            <span>Комиссия платформы</span>
            <span>14 ₽ (5%)</span>
          </div>
          <div className="order-item">
            <span>Исходная сумма заказа</span>
            <span>293 ₽</span>
          </div>
        </div>
        
        <button className="btn btn-primary mb-4">Скачать акт</button>
        <button className="btn btn-outline mb-8">Выгрузить в 1С</button>
        
        <button 
          className="btn btn-primary mb-4" 
          onClick={() => window.location.hash = '#tsp'}
        >
          Вернуться в панель
        </button>
        <button 
          className="btn btn-outline" 
          onClick={() => alert('Реферальная ссылка: https://lovii.mobiap.com/mobile/ref/12345')}
        >
          Пригласить партнёра
        </button>
      </div>
    </div>
  );

  // Courier Panel Screen Component
  const CourierPanelScreen = () => {
    const [orders] = useState([
      {
        id: 1,
        shopName: 'Пекарня "Грибоедов"',
        shopAddress: '10-я линия В.О., 10',
        deliveryAddress: '7-я линия В.О., 25, кв. 12',
        weight: '~1.2 кг',
        amount: 149,
        status: 'new'
      }
    ]);
    
    return (
      <div className="screen">
        <h1 className="text-xl font-semibold text-center mb-6">Мои заказы</h1>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Баланс: 2 450 ₽</span>
            <button 
              className="btn btn-accent" 
              style={{ width: 'auto', padding: '8px 16px', height: '40px' }}
              onClick={() => window.location.hash = '#payout'}
            >
              Вывести на СБП
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          {orders.map(order => (
            <div key={order.id} className="order-details">
              <div className="order-details-header">
                <div>
                  <div className="font-medium">Заказ #{order.id}</div>
                  <div className="text-sm" style={{ color: '#4B5563' }}>{order.shopName}</div>
                  <div className="text-sm" style={{ color: '#4B5563' }}>Забрать: {order.shopAddress}</div>
                  <div className="text-sm" style={{ color: '#4B5563' }}>Доставить: {order.deliveryAddress}</div>
                </div>
                <span className="font-semibold">{order.amount} ₽</span>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <button 
                  className="btn btn-primary" 
                  style={{ width: 'auto', padding: '8px 16px', height: 'auto' }}
                  onClick={() => alert('Заказ взят в работу!')}
                >
                  Взять в работу
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ width: 'auto', padding: '8px 16px', height: 'auto' }}
                  onClick={() => {
                    const url = `https://yandex.ru/maps/?rtext=${encodeURIComponent(order.shopAddress)}~${encodeURIComponent(order.deliveryAddress)}&rtt=mt`;
                    window.open(url, '_blank');
                  }}
                >
                  Навигация
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ width: 'auto', padding: '8px 16px', height: 'auto' }}
                  onClick={() => alert('Заказ доставлен!')}
                >
                  Доставлено
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <h2 className="text-base font-medium mb-2">История</h2>
          <div className="order-details">
            <div className="order-details-header">
              <div>
                <div className="font-medium">Заказ #120</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>Вчера, 15:30</div>
              </div>
              <span style={{ color: '#10B981' }}>Выплачено</span>
            </div>
          </div>
        </div>
        
        <div className="nav-bottom">
          <a 
            href="#" 
            className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              if (confirm('Выйти из аккаунта?')) {
                setUserData({ ...mockData.user });
                window.location.hash = '';
              }
            }}
          >
            <div className="nav-icon">🚪</div>
            <span>Выйти</span>
          </a>
        </div>
      </div>
    );
  };

  // HR Register Screen Component
  const HrRegisterScreen = () => {
    const [companyData, setCompanyData] = useState({
      name: '',
      inn: '',
      employees: '',
      email: '',
      phone: '',
      tariff: 'basic'
    });
    const [agreed, setAgreed] = useState(false);
    
    return (
      <div className="screen">
        <h1 className="text-xl font-semibold text-center mb-6">Подключите корпоративную мотивацию</h1>
        
        <p className="text-base text-center mb-8" style={{ color: '#4B5563' }}>
          Начисляйте сотрудникам баллы "Лови" за достижения. Они смогут тратить их на подписки, товары, услуги или выводить на карту.
        </p>
        
        <div className="mb-6">
          <input
            type="text"
            className="form-input mb-4"
            placeholder="Название компании"
            value={companyData.name}
            onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
          />
          <input
            type="text"
            className="form-input mb-4"
            placeholder="ИНН"
            value={companyData.inn}
            onChange={(e) => setCompanyData({...companyData, inn: e.target.value})}
          />
          <select 
            className="form-input mb-4" 
            value={companyData.employees} 
            onChange={(e) => setCompanyData({...companyData, employees: e.target.value})}
          >
            <option value="">Количество сотрудников</option>
            <option value="10-50">10–50</option>
            <option value="51-200">51–200</option>
            <option value="201-1000">201–1000</option>
            <option value="1000+">1000+</option>
          </select>
          <input
            type="email"
            className="form-input mb-4"
            placeholder="Email HR-менеджера"
            value={companyData.email}
            onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
          />
          <input
            type="tel"
            className="form-input mb-4"
            placeholder="Телефон"
            value={companyData.phone}
            onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
          />
        </div>
        
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Выберите тариф</h2>
          <div className="order-details mb-2">
            <div className="order-details-header">
              <div>
                <div className="font-medium">Базовый</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>5 000 ₽/мес — до 100 сотрудников</div>
              </div>
              <input 
                type="radio" 
                name="tariff" 
                checked={companyData.tariff === 'basic'}
                onChange={() => setCompanyData({...companyData, tariff: 'basic'})}
              />
            </div>
          </div>
          <div className="order-details mb-2">
            <div className="order-details-header">
              <div>
                <div className="font-medium">Профессиональный</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>15 000 ₽/мес — до 500 сотрудников</div>
              </div>
              <input 
                type="radio" 
                name="tariff" 
                checked={companyData.tariff === 'pro'}
                onChange={() => setCompanyData({...companyData, tariff: 'pro'})}
              />
            </div>
          </div>
          <div className="order-details">
            <div className="order-details-header">
              <div>
                <div className="font-medium">Корпоративный</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>от 30 000 ₽/мес — индивидуальные условия</div>
              </div>
              <input 
                type="radio" 
                name="tariff" 
                checked={companyData.tariff === 'corp'}
                onChange={() => setCompanyData({...companyData, tariff: 'corp'})}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mr-2"
            />
            <span>Принимаю условия подключения и обработку персональных данных</span>
          </label>
        </div>
        
        <button 
          className="btn btn-primary" 
          disabled={!agreed || !companyData.name}
          onClick={() => window.location.hash = '#hr-dashboard'}
        >
          Подключить компанию
        </button>
      </div>
    );
  };

  // HR Dashboard Screen Component
  const HrDashboardScreen = () => {
    return (
      <div className="screen">
        <div className="header">
          <h1 className="header-title">ООО "Ромашка"</h1>
          <div className="flex flex-col items-end">
            <div className="text-sm mb-1">Профессиональный (до 500 сотрудников)</div>
            <div className="text-sm font-medium">Доступно: 500 000 баллов "Лови"</div>
            <button 
              className="btn btn-accent mt-2" 
              style={{ width: 'auto', padding: '4px 12px', height: 'auto', fontSize: '0.875rem' }}
            >
              Пополнить счёт
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              className="btn btn-primary" 
              style={{ width: 'auto', flex: '1 1 48%', padding: '12px' }}
              onClick={() => alert('Форма начисления баллов')}
            >
              Начислить баллы
            </button>
            <button 
              className="btn btn-outline" 
              style={{ width: 'auto', flex: '1 1 48%', padding: '12px' }}
              onClick={() => alert('Загрузка Excel')}
            >
              Загрузить список
            </button>
          </div>
          <button 
            className="btn btn-outline" 
            onClick={() => alert('Создание акции')}
          >
            Создать акцию
          </button>
        </div>
        
        <div className="order-summary mb-6">
          <div className="order-item">
            <span>Активных сотрудников</span>
            <span>182 / 200</span>
          </div>
          <div className="order-item">
            <span>Средний остаток на сотрудника</span>
            <span>1 200 баллов</span>
          </div>
          <div className="order-item">
            <span>Выведено на карту</span>
            <span>42 человека</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">История операций</h2>
          <div className="order-details">
            <div className="order-details-header">
              <div>
                <div className="font-medium">12.01.2026</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>Иванов А.</div>
              </div>
              <div className="text-right">
                <div>5 000</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>Потрачено</div>
              </div>
            </div>
          </div>
          <div className="order-details">
            <div className="order-details-header">
              <div>
                <div className="font-medium">10.01.2026</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>Петров Б.</div>
              </div>
              <div className="text-right">
                <div>3 000</div>
                <div className="text-sm" style={{ color: '#4B5563' }}>Потрачено</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-base font-medium mb-2">Управление доступом</h2>
          <button 
            className="btn btn-outline mb-2" 
            onClick={() => alert('Приглашение HR-менеджера')}
          >
            Добавить HR-менеджера
          </button>
          <button 
            className="btn btn-outline" 
            onClick={() => alert('Настройка прав доступа')}
          >
            Права доступа
          </button>
        </div>
        
        <div>
          <h2 className="text-base font-medium mb-2">Документы</h2>
          <button className="btn btn-outline mb-2">Скачать акт</button>
          <button className="btn btn-outline mb-2">Выгрузить в 1С</button>
          <button className="btn btn-outline">История выплат</button>
        </div>
      </div>
    );
  };

  // Order Detail Screen Component
  const OrderDetailScreen = ({ order }) => (
    <div className="screen">
      <h1 className="text-xl font-semibold text-center mb-6">Заказ #{order.id}</h1>
      
      <div className="order-details mb-6">
        <div className="order-details-header">
          <span>Передан курьеру</span>
          <span style={{ color: '#0066FF' }}>● Активный</span>
        </div>
      </div>
      
      <div className="order-summary mb-6">
        {order.statusHistory.map((statusItem, index) => (
          <div 
            key={index} 
            className={`order-item ${statusItem.active ? 'font-medium' : ''}`} 
            style={{ 
              color: statusItem.active ? '#0066FF' : '#6B7280',
              fontWeight: statusItem.active ? '500' : 'normal'
            }}
          >
            <span>{statusItem.status}</span>
            <span>{statusItem.time}</span>
          </div>
        ))}
      </div>
      
      <div className="order-details mb-6">
        <div className="order-details-header">
          <div className="flex items-center">
            <div className="mr-3">🚴</div>
            <div>
              <div className="font-medium">{order.courier.name}</div>
              <div className="text-sm" style={{ color: '#4B5563' }}>{formatPhoneDisplay(order.courier.phone)}</div>
            </div>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ width: 'auto', padding: '8px 16px', height: 'auto' }}
            onClick={() => alert('Позвонить курьеру')}
          >
            Позвонить
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-base font-medium mb-2">Маршрут</h2>
        <div className="order-details">
          <div className="order-details-header">
            <div>📍 {order.shopAddress}</div>
            <div>📍 {order.deliveryAddress}</div>
          </div>
          <button 
            className="btn btn-outline mt-2" 
            onClick={() => {
              const url = `https://yandex.ru/maps/?rtext=${encodeURIComponent(order.shopAddress)}~${encodeURIComponent(order.deliveryAddress)}&rtt=mt`;
              window.open(url, '_blank');
            }}
          >
            Открыть в Яндекс.Картах
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-base font-medium mb-2">Состав заказа</h2>
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <span>{item.name} ×{item.quantity}</span>
            <span>{item.price} ₽</span>
          </div>
        ))}
        <div className="order-item">
          <span>Доставка</span>
          <span>{order.delivery} ₽</span>
        </div>
        <div className="order-total">
          <span>Итого</span>
          <span>{order.total + order.delivery} ₽</span>
        </div>
      </div>
      
      <div className="mb-6">
        <button 
          className="btn btn-error mb-2" 
          onClick={() => alert('Сообщение о проблеме доставки отправлено в поддержку')}
        >
          Проблема с доставкой?
        </button>
        <button 
          className="btn btn-outline" 
          onClick={() => alert('Заказ повторён')}
        >
          Повторить заказ
        </button>
      </div>
      
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

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App
