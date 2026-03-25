import { Router } from 'express';
import { getDb } from '../services/db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const db = getDb();
    const rows = await db.all(
      'SELECT id, created_at as createdAt, jd FROM versions ORDER BY id DESC'
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const db = getDb();
    const row = await db.get('SELECT * FROM versions WHERE id = ?', req.params.id);
    if (!row) {
      return res.status(404).json({ message: 'Version not found' });
    }

    res.json({
      id: row.id,
      jd: row.jd,
      originalResume: row.original_resume,
      optimizedResume: row.optimized_resume,
      greetings: JSON.parse(row.greetings_json),
      suggestions: JSON.parse(row.suggestions_json),
      createdAt: row.created_at,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
