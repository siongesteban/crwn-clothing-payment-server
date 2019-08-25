# crwn-clothing-payment-server

> Stripe payment server for crwn-clothing-client.

```
git clone https://github.com/siongesteban/crwn-clothing-payment-server.git

cd crwn-clothing-payment-server

npm i

npm start
```

### Stripe
The app uses Stripe as its payment API. You can get your own `secret_key` by signing up an account.

### Environment Variables
```
PORT=3001
CLIENT_ORIGIN="http://localhost:3000"
STRIPE_SECRET_KEY="key"
```