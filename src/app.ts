import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';

import { env } from './env';

const app = express();
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
);

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

export { app };
