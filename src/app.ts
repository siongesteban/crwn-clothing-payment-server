import express, { Request, Response } from 'express';

const app = express();

app.get('/something', (req: Request, res: Response) => {
  res.json({
    message: 'Hola!',
  });
});

export { app };
