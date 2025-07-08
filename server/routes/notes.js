
import express from 'express';
import Note from '../models/Note.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(notes);
    }
    catch (err) {
        res.status(500).json({ error: "Server error while fetching notes" })
    }
});

router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({ title, content, user: req.user.id });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }
    catch (err) {
        res.status(400).json({ error: 'Invalid note data' });
    }
})

router.put('/:id', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const node = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        if (note.user.toString() !== req.user.id) return res.status(403).json({ msg: "Unauthorized" });

        note.title = title;
        note.content = content;
        const updateNote = await note.save();

        res.json(updateNote);
    }
    catch (err) {
        req.status(404).json({ error: 'Note not found or update failed' })
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });

        if (note.user.toString() !== req.user.id)
            return res.status(403).json({ error: 'Unauthorized' });
        await note.deleteOne();
        res.json({ message: 'Note deleted' });
    } catch (err) { res.status(404).json({ error: "Note not found or deletion failed" }) }
})

export default router; 
