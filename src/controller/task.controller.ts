import { Handler } from 'express';
import { getConnection } from '../database/db';
import { nanoid } from 'nanoid';

export const getTasks: Handler = (req, res) => {
  const data = getConnection().get('tasks').value();

  return res.json(data);
};

export const getTask: Handler = (req, res) => {
  try {
    const { id } = req.params;

    const task = getConnection().get('tasks').find({ id }).value();

    if (!task) {
      return res.status(404).json({ msg: 'Task was not found' });
    }

    res.json(task);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
};

export const createTask: Handler = (req, res) => {
  try {
    const { name, description } = req.body;

    const newTask = {
      name,
      description,
      id: nanoid(),
    };

    getConnection().get('tasks').push(newTask).write();

    res.json(newTask);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
};

export const deleteTask: Handler = (req, res) => {
  try {
    const { id } = req.params;

    const taskFound = getConnection().get('tasks').find({ id }).value();

    if (!taskFound) {
      return res.status(404).json({ msg: 'Task was not found' });
    }

    const deletedTask = getConnection()
      .get('tasks')
      .remove({ id: req.params.id })
      .write();

    res.json(deletedTask);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
};

export const updateTask: Handler = (req, res) => {
  try {
    const { id } = req.params;

    const taskFound = getConnection().get('tasks').find({ id }).value();

    if (!taskFound) {
      return res.status(404).json({ msg: 'Task was not found' });
    }

    const updatedTask = getConnection()
      .get('tasks')
      .find({ id })
      .assign(req.body)
      .write();

    res.json(updatedTask);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const countTasks: Handler = (req, res) => {
  const taskLength = getConnection().get('tasks').value().length;
  res.json(taskLength);
};
