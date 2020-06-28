const Basemap = require('../models/Basemap');

module.exports.getBasemaps = async function (req, res) {
    try {
        const basemaps = await Basemap.find({ user: req.user.id });
        if (!basemaps) {
            res.status(500).json({ message: 'Не удалось получить подложки' });
        }

        res.status(200).json(basemaps);

    } catch (e) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

module.exports.deleteBasemap = async function (req, res) {
    try {
        await Basemap.remove({ _id: req.params.id });
        res.status(200).json({ message: 'Подложка удалена' });

    } catch (e) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

module.exports.updateBasemap = async function (req, res) {
    try {
        const update = {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
        };
        console.log('req.body', req.body)
        console.log('update', update)
        const basemap = await Basemap.findOneAndUpdate(
            { _id: req.params.id },
            { $set: update },
            { new: true }
        );

        if (!basemap) {
            res.status(500).json({ message: 'Не удалось отредактировать подложку' });
        }

        res.status(200).json(basemap);


    } catch (e) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

module.exports.addBasemap = async function (req, res) {
    try {
        // Достать параметры из запроса
        const { title, description, url } = req.body;

        const basemap = await new Basemap({
            title,
            description,
            url,
            user: req.user.id,
        });

        if (!basemap) {
            res.status(500).json({ message: 'Не удалось добавить подложку' });
        }

        await basemap.save();

        res.status(200).json(basemap);

    } catch (e) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }

}