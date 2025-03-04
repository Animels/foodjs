import { errorHandler } from '@middlewares';
import { authRouter, cartRouter, productRouter, restaurantRouter } from '@routes';
import cors from 'cors';
import express from 'express';

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use('/auth', authRouter);

app.use('/', cartRouter);
app.use('/', restaurantRouter);
app.use('/', productRouter);

// app.get('/promos', () => {});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
