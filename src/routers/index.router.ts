import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('index router')
});


export default router;