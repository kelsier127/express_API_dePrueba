import express from "express";
import bodyParser from 'body-parser';
import fs from 'fs';

// Generar app express
const app = express();

// Configurar bodyParser para que convierta el body de las peticiones a JSON
app.use(bodyParser.json());

// Configurar puerto
const port = 3000;

const readData = () => {
    try {
        const data = fs.readFileSync('./db.json');
        console.log(data);
        console.log(JSON.parse(data));
        return JSON.parse(data);
    }catch(err){
        console.log(err);
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data));
    }catch(err){
        console.log(err);
    }
}
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando al puerto: ${port}`);
})

// fem el primer endpoint

app.get('/', (req, res) => {
    res.send("hello world");
})

app.get('/books', (req, res) => {    
    const data = readData();
    res.json(data.books);
})
app.get('/books/:id', (req, res) => {    
    const data = readData();

    let libro = data.books.find((libro) => {
        return libro.id === parseInt(req.params.id);
    });
    
    res.send(libro);
})

app.post('/books', (req, res) => {
    const data = readData();
    const body = req.body;
    const newBook = {
        id:data.books.length + 1,
        ...body 

    }

    data.books.push(newBook);

    writeData(data);
    res.json(newBook);
})

app.put('/books/:id', (req, res) => {
    const data = readData();
    const body = req.body;

    const id = parseInt(req.params.id);

    const index = data.books.findIndex(libro =>  libro.id === id );

    data.books[index] = {
        ...data.books[index],
        ...body
        
    };

    writeData(data);
    res.json({
        message:"Actualitzacio correcta",
    });
})

app.delete('/books/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    const index = data.books.findIndex(libro =>  libro.id === id );

    data.books.splice(index,1);

    writeData(data);

    res.json({
        message:"Eliminacio correcta",
    });
}   )