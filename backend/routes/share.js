import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../services/db.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { versionId } = req.body;
    if (!versionId) {
      return res.status(400).json({ message: 'versionId is required' });
    }

    const token = uuidv4();
    const db = getDb();
    await db.run('INSERT INTO shares (token, version_id) VALUES (?, ?)', token, versionId);

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

router.get('/:token', async (req, res, next) => {
  try {
    const db = getDb();
    const row = await db.get(
      `SELECT v.* FROM shares s JOIN versions v ON s.version_id = v.id WHERE s.token = ?`,
      req.params.token
    );

    if (!row) {
      return res.status(404).json({ message: 'Share not found' });
    }

    res.json({
      id: row.id,
      jd: row.jd,
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
