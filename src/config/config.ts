require('dotenv').config()

function getEnvVar(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

export default getEnvVar

