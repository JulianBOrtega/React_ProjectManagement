const express = require('express');
const router = express.Router();

const { addCollaborator, detail, list, remove, removeCollaborator, store, update } = require('../controllers/projectController');

/* /projects */
router
    .route('/')
        .get(list)
        .post(store);

router
    .route('/:id')
        .get(detail)
        .put(update)
        .delete(remove);

router
        .get('/collaborator/add', addCollaborator)
        .delete('/collaborator/remove', removeCollaborator)

module.exports = router;
