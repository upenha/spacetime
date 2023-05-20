/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string

      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string

      SUPABASE_URL: string
      SUPABASE_KEY: string
    }
  }
}

export {}
