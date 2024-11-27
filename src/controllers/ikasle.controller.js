const Ikasle = require('../models/ikasle.model');

exports.getIkasleak = async (req, res, next) => {
    try {
        const ikasleak = await Ikasle.find();
        res.json(ikasleak);
    } catch (error) {
        next(error);
    }
};

exports.createIkasle = async (req, res, next) => {
    try {
        const ikasle = new Ikasle(req.body);
        const savedIkasle = await ikasle.save();
        res.status(201).json(savedIkasle);
    } catch (error) {
        next(error);
    }
};

exports.getIkasleById = async (req, res, next) => {
    try {
        const ikasle = await Ikasle.findById(req.params.id);
        if (!ikasle) {
            return res.status(404).json({ message: 'Ikaslea ez da aurkitu' });
        }
        res.json(ikasle);
    } catch (error) {
        next(error);
    }
};

exports.deleteIkasleByID = async (req, res, next) => {
    try {
        const ikasle = await Ikasle.findByIdAndDelete(req.params.id);
        if (!ikasle) {
            return res.status(404).json({ message: 'Ikaslea ez da aurkitu' });
        }
        res.json(ikasle);
    } catch (error) {
        next(error);
    }
};

exports.editIkasle = async (req, res, next) => {
    try {
        const { email, izena, adina } = req.body; 
        const ikasle = await Ikasle.findOneAndUpdate(
            { email }, 
            { izena, adina, email },  
            { new: true, runValidators: true }
        );
        
        if (!ikasle) {
            return res.status(404).json({ message: 'Ikaslea ez da aurkitu' });
        }

        res.json(ikasle); 
    } catch (error) {
        next(error);
    }
};

// Añadir un endpoint para obtener un estudiante por su email
exports.getIkasleByEmail = async (req, res, next) => {
    try {
        // Busca el ikasle por su email (no por el _id)
        const ikasle = await Ikasle.findOne({ email: req.params.email });
        
        if (!ikasle) {
            return res.status(404).json({ message: 'Ikaslea ez da aurkitu' });
        }
        
        res.json(ikasle);  // Devuelve la respuesta con los datos del ikasle
    } catch (error) {
        next(error);  // Pasa el error al middleware de manejo de errores
    }
};


// Gehitu beste kontroladoreak...