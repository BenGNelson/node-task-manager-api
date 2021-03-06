const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up a new user', async () => {
    const response = await request(app)
        .post('/users').send({
            name: 'Ash',
            email: 'ash@ketchum.com',
            password: 'Dogsarecool123!$'
        })
        .expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Ash',
            email: 'ash@ketchum.com',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Dogsarecool123!$')
})

test('Should log in existing user', async () => {
    const response = await request(app)
        .post('/users/login').send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)

    // Assert that a new token was added correctly
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should fail to log in nonexistant user', async () => {
    await request(app)
        .post('/users/login').send({
            email: userOne.email,
            password: 'Frogsarecool53#[]'
        })
        .expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should fail to get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // Assert that the user was deleted correctly
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    
    // Assert that the avatar was uploaded correctly
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Misty',
            email: 'misty@hydropump.com',
        })
        .expect(200)

    // Assert that the user data was updated correctly
    const user = await User.findById(userOneId)
    expect(user.name).toBe(response.body.name)
    expect(user.email).toBe(response.body.email)
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Cerulean City',
        })
        .expect(400)
})

// TODO tests
//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated