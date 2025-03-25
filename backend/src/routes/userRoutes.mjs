import Router from 'express';
import { createUser, 
  logUser, 
  loggoutCurrentUser, 
  getAllUsers, 
  getCurrentUserProfile, 
  updateTheCurrentUserProfile, 
  deleteUserById, 
  getUserById, updateUserById } from '../controllers/userController.mjs';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.mjs';

const router = Router();
 

// allows method chaining
router.post('/', createUser);
router.get('/', authenticate, authorizeAdmin, getAllUsers);
router.post('/auth', logUser);
router.post('/logout', loggoutCurrentUser);
// router.route('/profile').get(authenticate, getCurrentProfile);
router.get('/profile', authenticate, getCurrentUserProfile);
router.put('/profile', updateTheCurrentUserProfile);
router.delete('/:id', authenticate, authorizeAdmin, deleteUserById);
router.get('/:id', authenticate, authorizeAdmin, getUserById);
router.put('/:id', authenticate, authorizeAdmin, updateUserById)

export default router;