# 🌊 SwimFlow Analytics

**SwimFlow** to nowoczesna aplikacja typu Full-stack (MERN), zaprojektowana do monitorowania i analizy wydajności pływackiej. System automatycznie oblicza kluczowe wskaźniki inżynierii sportowej, takie jak **Moc (Watts)** oraz **SWOLF**, wizualizując postępy użytkownika w czasie.



## 🚀 Główne Funkcje

-   **Analityka w czasie rzeczywistym**: Automatyczne przeliczanie parametrów efektywności przy każdym wpisie.
-   **Interaktywne Wykresy**: Wizualizacja trendów mocy i SWOLF za pomocą biblioteki `Recharts`.
-   **Tryb Dark/Light**: Dynamiczne dostosowanie interfejsu do preferencji użytkownika.
-   **Pełna Walidacja**: Ochrona integralności danych po stronie klienta i serwera.
-   **Responsive Design**: Interfejs w pełni zoptymalizowany pod urządzenia mobilne i desktopy.

## 🛠 Technologia

-   **Frontend**: React.js, CSS3 (zmienne dynamiczne), Recharts.
-   **Backend**: Node.js, Express.
-   **Baza danych**: MongoDB Atlas (Cloud).
-   **Komunikacja**: REST API.



## 📉 Kluczowe Wskaźniki

W aplikacji zaimplementowano algorytmy obliczające:
* **SWOLF**: Suma czasu i liczby ruchów na dystansie ($SWOLF = t + n$). Im niższy wynik, tym wyższa efektywność techniczna.
* **Moc (W)**: Szacowana siła generowana w wodzie na podstawie dynamiki ruchu.

## 🏁 Jak uruchomić projekt?

### 1. Klonowanie repozytorium
```bash
git clone [https://github.com/TWOJA-NAZWA/swimflow.git](https://github.com/TWOJA-NAZWA/swimflow.git)
cd swimflow