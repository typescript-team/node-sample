import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('todo router')
});


export default router;