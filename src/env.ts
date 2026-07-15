declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly TOKEN?: string;
      readonly TRAINS_API_KEY?: string;
    }
  }
}

function getEnv() {
  const token = process.env.TOKEN;
  const apiKey = process.env.TRAINS_API_KEY;

  if (!token) {
    throw new Error("Missing TOKEN env variable");
  }

  if (!apiKey) {
    throw new Error("Missing TRAINS_API_KEY env variable");
  }

  return { token, apiKey };
}

const { token, apiKey } = getEnv();

export { token, apiKey };
