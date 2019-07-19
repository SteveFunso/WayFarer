import express from 'express';
import Response from './model/Response';
import userRouter from './routes/UserRouter';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', userRouter);
app.use('*', (req, res) => {
  res.status(404).json(new Response(false, 404, 'URL not found'));
});
const PORT = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`app open on port: ${PORT}`));
export default app;
