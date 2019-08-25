import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';

interface Env extends NodeJS.ProcessEnv {
  CLIENT_ORIGIN: string;
  STRIPE_SECRET_KEY: string;
}

interface PaymentRequestBody {
  token: {
    id: string;
  };
  amount: number;
}

interface Payment {
  source: string;
  amount: number;
  currency: string;
}

const { CLIENT_ORIGIN, STRIPE_SECRET_KEY, PORT } = process.env as Env;
const app = express();

const stripe = new Stripe(STRIPE_SECRET_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: CLIENT_ORIGIN }));

app.post('/payment', async (req: Request, res: Response) => {
  const { token, amount } = req.body as PaymentRequestBody;
  const payment: Payment = {
    amount,
    source: token.id,
    currency: 'usd',
  };

  try {
    const charge = await stripe.charges.create(payment);

    res.status(200).json({
      data: charge,
    });
  } catch ({ message }) {
    console.error('/payment', message);
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
