const jwt = require('jsonwebtoken');
const config = require('../config/conf');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports.login = async function (req, res) {
    try {
        // Достать логин пароль из запроса
        const { login, password } = req.body;

        // Есть ли пользователь с таким логином
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({
                message: 'Неверная пара логин/пароль'
            });
        }
        // Совпадает ли введенный пароль
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Неверная пара логин/пароль'
            });
        }
        // Генерация токена
        const token = jwt.sign(
            { userId: user._id },
            config.jwtSecret,
            { expiresIn: '1h' });

        // Отправка ответа и токена на клиент
        res.status(200).json({
            token: `Bearer ${token}`,
            userId: user.id
        });

    } catch (e) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

module.exports.register = async function (req, res) {
    try {
        // Достать логин пароль из запроса
        const { login, password } = req.body;

        // Есть ли уже пользователи с таким логином
        const potentialUser = await User.findOne({ login });

        if (potentialUser) {
            return res.status(400).json({
                message: 'Пользователь с таким именем уже зарегистрирован'
            });
        }

        // Шифрование пароля
        const salt = bcrypt.genSaltSync(10);
        const criptedPassword = bcrypt.hashSync(password, salt);

        // Создание нового пользователя
        const user = new User({ login, password: criptedPassword });
        if (!user) {
            res.status(500).json({ message: 'Не удалось добавить пользователя' });
        }

        // Созранение в базе
        await user.save();

        // Отправка ответа клиент
        res.status(201).json({ message: 'Пользователь успешно создан' });

    } catch (e) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}