import express, { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/authentication';

const router = Router();

// Get user profile
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // const user = await User.findById(id).select('-password');
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    res.json({ data: null });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    res.json({
      message: 'Profile updated successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user achievements
router.get('/:id/achievements', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // const achievements = await Achievement.find({ userId: id });

    res.json({ data: [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user activities
router.get('/:id/activities', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // const activities = await Participation.find({ userId: id })
    //   .populate('activityId');

    res.json({ data: [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
