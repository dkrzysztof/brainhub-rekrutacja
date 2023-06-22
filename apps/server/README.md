# Brainhub Recruitment Task - server app

## Przed uruchomieniem

1. Należy utworzyć nową bazę danych w postgres
2. Utworzyć plik `.env` w folderze projektu i umieścić w nim następujące zmienne:

```
# port pod ktorym uruchomi sie serwer
PORT=5000

# nazwa uzytkownika postgres
POSTGRES_USERNAME=postgres
# haslo do konta uzytkownika postgres
POSTGRES_PASSWORD=postgres
# nazwa utworzonej bazy danych
POSTGRES_DATABASE=brainhub_db
```

3. Uruchomić komendę `npm install` w celu zainstlowania zależności projektowych

## Uruchomienie aplikacji

Aby uruchomić aplikację serwerową należy wywołać komendę `npm start`

## Przeprowadzenie testów

### Unit tests

Aby przeprowadzić unit testy należy wywołać komendę `npm run test`

### E2E tests

Aby przeprowadzić testy e2e należy wywołać komendę `npm run test:e2e`
