import { app } from './app';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Now listening at port ${PORT}`);
});
