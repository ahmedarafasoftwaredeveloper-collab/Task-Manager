const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks.controller");

/*

*/

router.route("/").get(taskController.getAllTasks).post(taskController.addTask);

router
  .route("/:taskId")
  .get(taskController.getTask)
  .delete(taskController.deleteTask)
  .patch(taskController.updateTask);

module.exports = router;
