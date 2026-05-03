const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://chasejhayes1:${password}@cluster0.lzbkpoj.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    content: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    content: name,
    number: number,
})

if (name || number) {
    person.save().then(result => {
        console.log(`added ${name} and ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.content} ${person.number}`)
        })
        mongoose.connection.close()
    })

}

