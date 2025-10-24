# Sprawozdanie opisowe aplikacji pogodowej
## Cel dokumentu
Krótki opis funkcjonalności i zachowania aplikacji pogodowej na podstawie dostarczonych widoków. Dokument koncentruje się na tym, co aplikacja robi dla poszczególnych ekranów: wprowadzanie lokalizacji i czasu, widok bieżącej pogody, widok wyszukiwania lokalizacji oraz widok mapy.

## Ogólny opis aplikacji
Aplikacja prezentuje pogodę w oparciu o lokalizację użytkownika lub wskazaną ręcznie lokalizację. Umożliwia edycję parametrów wejściowych (lokacja, data, czas), wyświetla szczegółowy raport godzinowy dla wybranej daty i czasu oraz mapę z ikonami pogodowymi dla różnych miejsc. Interfejs łączy prostotę edycji z szybkim dostępem do szczegółów godzinowych i kontekstowej nawigacji po mapie.

# Widoki

## Ekran edycji wejściowej Location Date Time
- Cel ekranu: pokazuje zapisane lokacje pogodwe.
- Elementy interfejsu:
- Pole wyszukiwania lokalizacji z podpowiedzią „Search location”.

![Widok Główny](./Modals/Main%20View.png)

## Ekran bieżącej pogody z widokiem godzinowym
- Cel ekranu: szybkie przedstawienie aktualnych warunków atmosferycznych i prognozy godzinowej dla wybranej lokalizacji i czasu.
- Kluczowe informacje wyświetlane:
- Aktualna temperatura z wartosciami „Feels like”.
- Ikona pogody odzwierciedlająca warunki (np. słonecznie).
- Prognostyk godzinowy w postaci poziomego paska/siatki z ikonami i temperaturami dla kolejnych godzin.
- Zachowanie aplikacji:
- Widok reaguje na zmiany lokalizacji, daty i czasu — wartości aktualizują się dynamicznie.
- Lista godzinowa umożliwia przewijanie oraz wybór konkretnej godziny celem ustawienia kontekstu (np. przejście do szczegółowego widoku danej godziny).
- Wartości „Feels like” i ikony są aktualizowane zgodnie z danymi modelu pogodowego i mogą uwzględniać informacje dodatkowe jak wilgotność, wiatr czy indeks UV w rozszerzonym widoku.

![Wiodok aktualnej pogody](./Modals/Current%20View.png)

## Ekran wyszukiwania lokalizacji z klawiaturą
- Cel ekranu: umożliwić szybką i dokładną zmianę lokalizacji przez wpisanie nazwy miejscowości lub użycie aktualnej lokalizacji.
- Elementy interfejsu:
- Pole wyszukiwania z etykietą „Search location”.
- Nagłówek Current location sugerujący możliwość wyboru pozycji GPS jako domyślnej.
- Klawiatura ekranowa aktywowana przy fokusie pola wejściowego.
- Zachowanie aplikacji:
- Wyniki wyszukiwania pojawiają się w czasie rzeczywistym; użytkownik wybiera jedną z podpowiedzi aby zastosować nową lokalizację.
- Obsługa błędów i braków danych: aplikacja powinna pokazać komunikat gdy nie ma dopasowań lub gdy połączenie z serwisem pogodowym zawiedzie.
- Po wyborze lokalizacji następuje powrót do ekranu głównego z odświeżonymi danymi.

![Widok wyszukiwania](./Modals/Search%20view.png)

## Ekran mapy z ikonami pogodowymi
- Cel ekranu: zaprezentować rozkład warunków pogodowych w regionie na interaktywnej mapie.
- Elementy interfejsu:
- Mapa z naniesionymi punktami reprezentującymi miasta/regiony.
- Ikony pogodowe dla każdego punktu oraz etykiety z nazwami lokalizacji.
- Możliwość przesuwania i powiększania mapy.
- Zachowanie aplikacji:
- Punkty na mapie odzwierciedlają aktualne warunki i temperatury; tapnięcie w punkt otwiera detal dla danej lokalizacji.
- Mapa odświeża się wraz ze zmianą zakresu (zoom) lub zastosowanymi filtrami (np. tylko określone warunki).
- Możliwość przełączenia między warstwami (np. temperatura, opady) jeśli aplikacja to wspiera.

![Mapa pogodowa](./Modals/Map%20View.png)

## Wymagania funkcjonalne i UX
- Responsywność interfejsu przy zmianie daty/czasu i lokalizacji bez potrzeby ręcznego odświeżania.
- Intuicyjność edycji: ikonografia ołówka oraz pola wejściowe wyraźnie komunikują możliwość modyfikacji.
- Szybkie wyszukiwanie lokalizacji z autouzupełnianiem i obsługą lokalizacji urządzenia.
- Spójność wizualna między ekranami: te same ikony i formaty temperatur zapewniają przewidywalność.
- Obsługa błędów i stanu offline: czytelne komunikaty i fallback do ostatnich dostępnych danych.

# Diagramy C4
![](./Modals/Slide%2016_9%20-%201(1).png)
![](./Modals/Slide%2016_9%20-%202.png)
![](./Modals/Slide%2016_9%20-%203-1.png)
![](./Modals/Slide%2016_9%20-%203-2.png)
![](./Modals/Slide%2016_9%20-%204.png)
![](./Modals/Slide%2016_9%20-%204-1.png)
![](./Modals/Slide%2016_9%20-%204-2.png)