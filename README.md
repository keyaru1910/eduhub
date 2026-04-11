1. Install dependencies

```
npm i
```

2. Set up environment variables

```bash
cp .env.example .env
```

3. Generate Prisma client and run a migration against your PostgreSQL database

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

4. Run the development server

```bash
npm run dev
```
