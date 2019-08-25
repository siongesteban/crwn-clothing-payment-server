export interface Env extends NodeJS.ProcessEnv {
  CLIENT_ORIGIN: string;
  STRIPE_SECRET_KEY: string;
}
