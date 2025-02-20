import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { tarefaRouter } from './presentation/routers/TarefaRouter';

const app = express();

const t = initTRPC.create();

app.use(express.json());

const appRouter = t.router({
  tarefa: tarefaRouter,
});

app.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter }));

const port = 4000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} 💖✨`);
});