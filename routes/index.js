var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }

      res.render('index', {
        title: 'My Simple TODO',
        todos: results
      });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* CREATE todo */
router.post('/create', function(req, res, next) {
  const task = req.body.task ? req.body.task.trim() : '';

  if (!task) {
    return res.status(400).send('Task cannot be blank.');
  }

  try {
    req.db.query(
      'INSERT INTO todos (task, completed) VALUES (?, ?);',
      [task, 0],
      (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }

        console.log('Todo added successfully:', results);
        res.redirect('/');
      }
    );
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).send('Error adding todo');
  }
});

/* DELETE todo */
router.post('/delete', function(req, res, next) {
  const { id } = req.body;

  try {
    req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
      if (err) {
        console.error('Error deleting todo:', err);
        return res.status(500).send('Error deleting todo');
      }

      console.log('Todo deleted successfully:', results);
      res.redirect('/');
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Error deleting todo');
  }
});

/* EDIT todo */
router.post('/edit', function(req, res, next) {
  const { id } = req.body;
  const task = req.body.task ? req.body.task.trim() : '';

  if (!task) {
    return res.status(400).send('Edited task cannot be blank.');
  }

  try {
    req.db.query(
      'UPDATE todos SET task = ? WHERE id = ?;',
      [task, id],
      (err, results) => {
        if (err) {
          console.error('Error editing todo:', err);
          return res.status(500).send('Error editing todo');
        }

        console.log('Todo edited successfully:', results);
        res.redirect('/');
      }
    );
  } catch (error) {
    console.error('Error editing todo:', error);
    res.status(500).send('Error editing todo');
  }
});

/* COMPLETE todo */
router.post('/complete', function(req, res, next) {
  const { id } = req.body;

  try {
    req.db.query(
      'UPDATE todos SET completed = 1 WHERE id = ?;',
      [id],
      (err, results) => {
        if (err) {
          console.error('Error updating todo:', err);
          return res.status(500).send('Error updating todo');
        }

        console.log('Todo marked completed successfully:', results);
        res.redirect('/');
      }
    );
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send('Error updating todo');
  }
});

module.exports = router;