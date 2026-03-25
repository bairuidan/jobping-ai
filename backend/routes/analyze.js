import { Router } from 'express';
import { getDb } from '../services/db.js';
import { callDeepSeek, safeJsonParse } from '../services/deepseek.js';
import {
  buildMessages,
  greetingPrompt,
  rewritePrompt,
  suggestionPrompt,
} from '../services/prompts.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { jd, resume, apiKey } = req.body;
    if (!jd || !resume || !apiKey) {
      return res.status(400).json({ message: 'jd, resume, apiKey are required' });
    }

    const greetingsRaw = await callDeepSeek({
      apiKey,
      messages: buildMessages(greetingPrompt, jd, resume),
      temperature: 0.8,
    });

    const suggestionsRaw = await callDeepSeek({
      apiKey,
      messages: buildMessages(suggestionPrompt, jd, resume),
      temperature: 0.4,
    });

    const rewrittenResume = await callDeepSeek({
      apiKey,
      messages: buildMessages(rewritePrompt, jd, resume),
      temperature: 0.6,
    });

    const greetings = safeJsonParse(greetingsRaw, []);
    const suggestions = safeJsonParse(suggestionsRaw, []);

    const db = getDb();
    const saved = await db.run(
      `INSERT INTO versions (jd, original_resume, optimized_resume, greetings_json, suggestions_json)
       VALUES (?, ?, ?, ?, ?)`,
      jd,
      resume,
      rewrittenResume,
      JSON.stringify(greetings),
      JSON.stringify(suggestions)
    );

    return res.json({
      versionId: saved.lastID,
      greetings,
      suggestions,
      optimizedResume: rewrittenResume,
    });
  } catch (error) {
    if (error.response?.status === 401) {
      return res.status(401).json({ message: 'DeepSeek API Key 无效' });
    }
    return next(error);
  }
});

export default router;
