import express from 'express';
import cors from 'cors';
import analyzeRouter from './routes/analyze.js';
import versionRouter from './routes/versions.js';
import shareRouter from './routes/share.js';
import exportRouter from './routes/export.js';
import { initDb } from './services/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'jobping-ai-backend' });
});

app.use('/api/analyze', analyzeRouter);
app.use('/api/versions', versionRouter);
app.use('/api/share', shareRouter);
app.use('/api/export', exportRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to init db', error);
    process.exit(1);
  });
