// start mogngo
// /Users/Ben/mongodb/bin/mongod.exe --dbpath=/Users/Ben/mongodb-data


// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    // DELETE ONE

    // db.collection('tasks').deleteOne({
    //     description: 'Schedule'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // DELETE MANY

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // UPDATING ONE

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5d0c241814380a4010db1c60')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // UPDATING MANY

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set : {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // INSERTING

    // // Inserting one
    // db.collection('users').insertOne({
    //     name: 'Benji',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // // Insert many
    // db.collection('users').insertMany([
    //     {
    //         name: 'Steve',
    //         age: 28
    //     }, {
    //         name: 'Billy',
    //         age: 40
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')

    //     }

    //     console.log(result.ops)
    // })

    // Insert many (again)
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Resume',
    //         completed: true
    //     }, {
    //         description: 'Schedule',
    //         completed: false
    //     }, {
    //         description: 'Legal Paperwork',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }

    //     console.log(result.ops)
    // })


    // FIND

    // Find one
    // db.collection('users').findOne({ _id: new ObjectID('5d05ca1dc2cc4a513420622b') }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID('5d0c25280f9d282dd4921205') }, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(task)
    // })

    // Find multiple
    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //      if (error) {
    //          return console.log('Unable to fetch')
    //      }
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 27 }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').find( { completed: false }).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(tasks)
    // })
})