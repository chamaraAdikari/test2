import { useState } from "react";
import { useCurrency } from "../../context/CurrencyContext";
import "./currencySelector.css";

const currencies = [
  { code: "LKR", flag: "\u{1F1F1}\u{1F1F0}", symbol: "Rs" },
  { code: "USD", flag: "\u{1F1FA}\u{1F1F8}", symbol: "$" },
  { code: "EUR", flag: "\u{1F1EA}\u{1F1FA}", symbol: "€" },
  { code: "GBP", flag: "\u{1F1EC}\u{1F1E7}", symbol: "£" },
  { code: "JPY", flag: "\u{1F1EF}\u{1F1F5}", symbol: "¥" },
  { code: "AUD", flag: "\u{1F1E6}\u{1F1FA}", symbol: "A$" },
  { code: "CAD", flag: "\u{1F1E8}\u{1F1E6}", symbol: "C$" },
  { code: "CHF", flag: "\u{1F1E8}\u{1F1ED}", symbol: "Fr" },
  { code: "CNY", flag: "\u{1F1E8}\u{1F1F3}", symbol: "¥" },
  { code: "HKD", flag: "\u{1F1ED}\u{1F1F0}", symbol: "HK$" },
  { code: "NZD", flag: "\u{1F1F3}\u{1F1FF}", symbol: "NZ$" },
  { code: "SEK", flag: "\u{1F1F8}\u{1F1EA}", symbol: "kr" },
  { code: "KRW", flag: "\u{1F1F0}\u{1F1F7}", symbol: "₩" },
  { code: "SGD", flag: "\u{1F1F8}\u{1F1EC}", symbol: "S$" },
  { code: "NOK", flag: "\u{1F1F3}\u{1F1F4}", symbol: "kr" },
  { code: "MXN", flag: "\u{1F1F2}\u{1F1FD}", symbol: "$" },
  { code: "INR", flag: "\u{1F1EE}\u{1F1F3}", symbol: "₹" },
  { code: "RUB", flag: "\u{1F1F7}\u{1F1FA}", symbol: "₽" },
  { code: "ZAR", flag: "\u{1F1FF}\u{1F1E6}", symbol: "R" },
  { code: "TRY", flag: "\u{1F1F9}\u{1F1F7}", symbol: "₺" },
  { code: "BRL", flag: "\u{1F1E7}\u{1F1F7}", symbol: "R$" },
  { code: "TWD", flag: "\u{1F1F9}\u{1F1FC}", symbol: "NT$" },
  { code: "DKK", flag: "\u{1F1E9}\u{1F1F0}", symbol: "kr" },
  { code: "PLN", flag: "\u{1F1F5}\u{1F1F1}", symbol: "zł" },
  { code: "THB", flag: "\u{1F1F9}\u{1F1ED}", symbol: "฿" },
  { code: "IDR", flag: "\u{1F1EE}\u{1F1E9}", symbol: "Rp" },
  { code: "HUF", flag: "\u{1F1ED}\u{1F1FA}", symbol: "Ft" },
  { code: "CZK", flag: "\u{1F1E8}\u{1F1FF}", symbol: "Kč" },
  { code: "ILS", flag: "\u{1F1EE}\u{1F1F1}", symbol: "₪" },
  { code: "CLP", flag: "\u{1F1E8}\u{1F1F1}", symbol: "$" },
  { code: "PHP", flag: "\u{1F1F5}\u{1F1ED}", symbol: "₱" },
  { code: "AED", flag: "\u{1F1E6}\u{1F1EA}", symbol: "د.إ" },
  { code: "COP", flag: "\u{1F1E8}\u{1F1F4}", symbol: "$" },
  { code: "SAR", flag: "\u{1F1F8}\u{1F1E6}", symbol: "﷼" },
  { code: "MYR", flag: "\u{1F1F2}\u{1F1FE}", symbol: "RM" },
  { code: "RON", flag: "\u{1F1F7}\u{1F1F4}", symbol: "lei" },
  { code: "ARS", flag: "\u{1F1E6}\u{1F1F7}", symbol: "$" },
  { code: "BGN", flag: "\u{1F1E7}\u{1F1EC}", symbol: "лв" },
  { code: "BHD", flag: "\u{1F1E7}\u{1F1ED}", symbol: ".د.ب" },
  { code: "BWP", flag: "\u{1F1E7}\u{1F1FC}", symbol: "P" },
  { code: "CRC", flag: "\u{1F1E8}\u{1F1F7}", symbol: "₡" },
  { code: "DOP", flag: "\u{1F1E9}\u{1F1F4}", symbol: "RD$" },
  { code: "EGP", flag: "\u{1F1EA}\u{1F1EC}", symbol: "£" },
  { code: "FJD", flag: "\u{1F1EB}\u{1F1EF}", symbol: "FJ$" },
  { code: "GHS", flag: "\u{1F1EC}\u{1F1ED}", symbol: "₵" },
  { code: "HRK", flag: "\u{1F1ED}\u{1F1F7}", symbol: "kn" },
  { code: "ISK", flag: "\u{1F1EE}\u{1F1F8}", symbol: "kr" },
  { code: "JMD", flag: "\u{1F1EF}\u{1F1F2}", symbol: "J$" },
  { code: "JOD", flag: "\u{1F1EF}\u{1F1F4}", symbol: "د.ا" },
  { code: "KES", flag: "\u{1F1F0}\u{1F1EA}", symbol: "KSh" },
  { code: "KWD", flag: "\u{1F1F0}\u{1F1FC}", symbol: "د.ك" },
  { code: "LBP", flag: "\u{1F1F1}\u{1F1E7}", symbol: "ل.ل" },
  { code: "MAD", flag: "\u{1F1F2}\u{1F1E6}", symbol: "د.م." },
  { code: "MUR", flag: "\u{1F1F2}\u{1F1FA}", symbol: "₨" },
  { code: "NGN", flag: "\u{1F1F3}\u{1F1EC}", symbol: "₦" },
  { code: "OMR", flag: "\u{1F1F4}\u{1F1F2}", symbol: "ر.ع." },
  { code: "PAB", flag: "\u{1F1F5}\u{1F1E6}", symbol: "B/." },
  { code: "PEN", flag: "\u{1F1F5}\u{1F1EA}", symbol: "S/." },
  { code: "PKR", flag: "\u{1F1F5}\u{1F1F0}", symbol: "₨" },
  { code: "QAR", flag: "\u{1F1F6}\u{1F1E6}", symbol: "ر.ق" },
  { code: "RSD", flag: "\u{1F1F7}\u{1F1F8}", symbol: "дин." },
  { code: "TND", flag: "\u{1F1F9}\u{1F1F3}", symbol: "د.ت" },
  { code: "TTD", flag: "\u{1F1F9}\u{1F1F9}", symbol: "TT$" },
  { code: "UAH", flag: "\u{1F1FA}\u{1F1E6}", symbol: "₴" },
  { code: "UYU", flag: "\u{1F1FA}\u{1F1FE}", symbol: "$U" },
  { code: "VND", flag: "\u{1F1FB}\u{1F1F3}", symbol: "₫" },
];

const CurrencySelector = () => {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const currentCurrency = currencies.find(c => c.code === selectedCurrency);

  const handleSelect = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="currencySelector">      <div 
        className="currencyButton" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentCurrency.code}</span>
      </div>
      {isOpen && (
        <div className="currencyDropdown">
          <div className="currencySearch">
            <input
              type="text"
              placeholder="Search currency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="currencyList">
            {filteredCurrencies.map((currency) => (
              <div
                key={currency.code}
                className={`currencyOption ${currency.code === selectedCurrency ? 'selected' : ''}`}
                onClick={() => handleSelect(currency.code)}
              >
                <span className="currencyFlag">{currency.flag}</span>
                <span className="currencyCode">{currency.code}</span>
                <span className="currencySymbol">{currency.symbol}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
