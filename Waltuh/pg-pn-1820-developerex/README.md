# Developerex
*Kuba Żywiecki, Bartosz Pawłowski, Krzysztof Wysocki, Dominik Pilipczuk*

Klon [doodle](https://doodle.com) - aplikacji służacej do uzgadniania terminów
spotkań.

# Plan działania

## Realizacja tworzenia sugerownaych terminów spotkania.
- Autentykacja poprzez logowanie.
- Wybór określonego interwału czasu trwania spotkania z zadanej puli: (np. 15min, 30min, 60min 90min, 120min).
- Po wyborze danego interwału czasowego możliwość dodawania go co 15 min dla wybranego dnia
(np. dla czasu spotkania 60min możliwe przedziały: 00:00-01:00, 00:15:-01:15, ...,  23:00-00:00).
- Wysyłanie zaproszeń do głosowania na najlepszy termin.

## Głosowanie na najlepszy termin:
- Autentykacja poprzez logowanie.
- Możliwość oddania głosu na wiele terminów.
- Zapisanie preferencji. 
- Możliwość późniejszej edycji preferencji.

## Do przemyślenia:
- Określenie deadline na głosowanie.
- Wybór najlepszego terminu.
- Sposób wysyłania zaproszeń i akceptowania.

## Schemat bazy danych
![img.png](img.png)

## Uruchomienie projektu
- Server
    ```
    cd server
    ./gradlew build
    ./gradlew bootRun
    ```
- Client
    
    Wymagania: Node: `v20.10.0` lub nowszy. Upewnić się, że w pliku `src/lib/data.ts` jest poprawny adres (w szczególności port) serwera.
    ```
    cd client
    npm install
    npm run dev
    ```

## Milestone 1
- [x] Setup repozytorium
- [x] Plik README, plan działania
- [x] Struktura
- [x] Setup bazy danych
- [x] Setup unit testów
- [x] Klasy modelu z możliwością zapisu
- [x] Wydmuszka UI
