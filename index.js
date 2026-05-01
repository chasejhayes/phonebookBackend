const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

let people = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/", (request, response) => {
    response.send("<h1>Phonebook</h1>")
})

app.get("/api/persons", (request, response) => {
    response.json(people)
})

const number = people.length;
const date = Date().toLocaleString()



app.get("/info", (request, response) => {
    response.send(`<p>The Phonebook has ${number} people.</p>
    <p>${date}</p>`
    )

})

app.get("/api/people/:id", (request, response) => {
    const id = request.params.id
    const person = people.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/people/:id", (request, response) => {
    const id = request.params.id
    people = people.filter(person => person.id !== id)

    response.status(204).end()
})

function getID(min, max){
    return Math.random() * (max - min) + min
}
function generateID(){
    return String(Math.floor(getID(1, 1000)))
}

app.post("/api/people", (request, response) => {
    const body = request.body


    if (!body.number && !body.name){
        return response.status(400).json({
            error: "Missing name and number"
        })
    }
    else if (!body.name){
        return response.status(400).json({
            error: "Missing name"
        })
        
    }
    else if (!body.number){
        return response.status(400).json({
            error: "Missing number"
        })
    }
    else if (people.find(person => person.name ===body.name)){
         return response.status(400).json({
            error: "Already in phone book"
        })
    }
    // const person = people.find(person => person.id === id)
    
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateID()

    }

    people = people.concat(person)



    // console.log(person)
    response.json(person)
})

 

const PORT = 3001
app.listen(PORT, () => {
    console.log("Server running")
})
