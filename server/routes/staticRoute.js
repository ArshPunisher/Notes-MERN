const notesController = require('../controller/notesController')
const {checkAuth} = require('../middleware/authentication')
const express = require('express')
const router = express.Router()


router.post("/login", notesController.login)
router.post("/register", notesController.register)
router.get("/get-user", checkAuth, notesController.getUser)
router.get("/get-notes", checkAuth, notesController.getNotes)
router.get("/search-notes", checkAuth, notesController.searchNotes)
router.post("/add-notes", checkAuth, notesController.addNotes)
router.put("/edit-notes/:noteId", checkAuth, notesController.editNotes)
router.put("/pinned-notes/:noteId", checkAuth, notesController.pinnedNotes)
router.delete("/delete-notes/:noteId", checkAuth, notesController.deleteNotes)

module.exports = router;