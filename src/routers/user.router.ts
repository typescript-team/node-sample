import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('user router')
});


export default router;