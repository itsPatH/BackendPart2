import UserDao from '../db/dao/UserDao.js';
import UserDTOSession from '../dto/user/UserDTOSession.js';

const usersDAO = new UserDao();

const getUsers = async (req, res) => {
    try {
        const users = await usersDAO.getAll();
        res.send({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersDAO.getById(id);
        if (!user) {
            return res.status(404).send({ status: 'error', error: 'User not found' });
        }
        res.send({ status: 'success', payload: user });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        if (!firstName || !lastName || !email) {
            return res.status(400).send({ status: 'error', error: 'Incomplete values' });
        }
        const newUser = { firstName, lastName, email };
        const result = await usersDAO.create(newUser);
        res.status(201).send({ status: 'success', payload: { id: result._id } });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await usersDAO.update(id, req.body);
        if (!updatedUser) {
            return res.status(404).send({ status: 'error', error: 'User not found' });
        }
        res.send({ status: 'success', payload: updatedUser });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await usersDAO.delete(id);
        if (!deletedUser) {
            return res.status(404).send({ status: 'error', error: 'User not found' });
        }
        res.send({ status: 'success', payload: deletedUser });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await usersDAO.getById(userId);

        if (!user) {
            return res.status(404).send({ status: 'error', error: 'User not found' });
        }

        const userDTO = new UserDTOSession(user);
        res.send({ status: 'success', payload: userDTO });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

export default {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
    getCurrentUser,
};
