import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('auth router')
});


export default router;