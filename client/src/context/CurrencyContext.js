import { createContext, useState, useContext, useEffect } from "react";

const currencies = {
  LKR: { symbol: "Rs" },
  USD: { symbol: "$" },
  EUR: { symbol: "€" },
  GBP: { symbol: "£" },
  JPY: { symbol: "¥" },
  AUD: { symbol: "A$" },
  CAD: { symbol: "C$" },
  CHF: { symbol: "Fr" },
  CNY: { symbol: "¥" },
  HKD: { symbol: "HK$" },
  NZD: { symbol: "NZ$" },
  SEK: { symbol: "kr" },
  KRW: { symbol: "₩" },
  SGD: { symbol: "S$" },
  NOK: { symbol: "kr" },
  MXN: { symbol: "$" },
  INR: { symbol: "₹" },
  RUB: { symbol: "₽" },
  ZAR: { symbol: "R" },
  TRY: { symbol: "₺" },
  BRL: { symbol: "R$" },
  TWD: { symbol: "NT$" },
  DKK: { symbol: "kr" },
  PLN: { symbol: "zł" },
  THB: { symbol: "฿" },
  IDR: { symbol: "Rp" },
  HUF: { symbol: "Ft" },
  CZK: { symbol: "Kč" },
  ILS: { symbol: "₪" },
  CLP: { symbol: "$" },
  PHP: { symbol: "₱" },
  AED: { symbol: "د.إ" },
  COP: { symbol: "$" },
  SAR: { symbol: "﷼" },
  MYR: { symbol: "RM" },
  RON: { symbol: "lei" }
};

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("LKR");
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/eedbb22a380f58dfb382830f/latest/LKR`
        );
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertPrice = (price, fromCurrency = "LKR") => {
    if (loading || !exchangeRates) return price;
    const rate = exchangeRates[selectedCurrency] / exchangeRates[fromCurrency];
    return Math.round(price * rate);
  };

  const formatPrice = (price, fromCurrency = "LKR") => {
    const convertedPrice = convertPrice(price, fromCurrency);
    const symbol = currencies[selectedCurrency]?.symbol || "";
    
    // Format the price with the currency symbol
    if (selectedCurrency === "USD" || selectedCurrency === "EUR" || selectedCurrency === "GBP") {
      return `${symbol}${convertedPrice.toLocaleString()}`;
    }
    return `${convertedPrice.toLocaleString()} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      selectedCurrency, 
      setSelectedCurrency, 
      convertPrice,
      formatPrice,
      loading 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
