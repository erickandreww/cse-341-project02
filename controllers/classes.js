const mongodb = require('../data/database'); 
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const mongoose = require('mongoose');

const getAllClasses = async (req,res) => {
    //#swagger.tags=['Classes']
    const result = await mongodb.getDatabase().db().collection('class').find();
    result.toArray().then((classes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(classes);
    })
    .catch((error) => {
        console.log(error.message);
    });
}

const getClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    try {
        const classId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('class').find({_id: classId});
        result.toArray().then((classes) => {
            if (!classes[0]) {
                return next(createError(404, 'class does not exist'))
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(classes[0])
        })
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const createClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    const newClass = {
        class_name: req.body.class_name, 
        class_floor: req.body.class_floor,
    }; 
    const result = await mongodb.getDatabase().db().collection('class');
    result.insertOne(newClass).then((result) => { 
        if (result.acknowledged) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(newClass);
        }
    })
    .catch((error) => {
        if (error.name === 'ValidationError') {
            return next(createError(422, error.message));
        }
        console.log(error.message);
        next(error);
    });
}

const updateClass = async (req, res, next) => {
    //#swagger.tags=['Classes'];
    try {
        const classId = new ObjectId(req.params.id);
        const classPath = mongodb.getDatabase().db().collection('class');
        classPath.findOneAndUpdate(
            {_id: classId}, 
            {
                $set: {
                    class_name: req.body.class_name, 
                    class_floor: req.body.class_floor,
                },
            },
            {
                upsert: false,
            }
        )
        .then((result) => {
            if (!result) {
                return next(createError(404, 'class does not exist'))
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(204).send();
        })
        .catch((error) => {
            console.log(error.message);
            next(error);
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const deleteClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    try {
        const classId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('class');
        result.findOneAndDelete({_id: classId})
        .then((result) => {
            if (!result) {
                return next(createError(404, 'Class does not exist'))
            }
            res.status(204).json({message:"Class Deleted"});
        })
        .catch((error) => {
            console.log(error.message);
            next(error);
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const getClassStudents = async (req, res, next) => {
    //#swagger.tags=['Classes']
    try {
        const classId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('class').find({_id: classId});
        const mongoData = await result.toArray();
        const newString = JSON.stringify(mongoData[0]._id);
        const newId = JSON.parse(newString)
        const studentsList = await mongodb.getDatabase().db().collection('students').find({class_id: newId});
        studentsList.toArray().then((student) => {
            if (!student[0]) {
                return next(createError(404, 'Class does not have students'))
            }
            res.status(200).json({class: mongoData, students: student });
        }).catch((error) => {
            console.log(error.message);
            next(error);
        });
    } catch (error) {
        if (error.message === "Cannot read properties of undefined (reading '_id')") {
            return next(createError(404, 'Class does not exist'));
        }
        console.log(error.message);
        next(error);
    }
}

module.exports = { getAllClasses, getClass, createClass, updateClass, deleteClass, getClassStudents }