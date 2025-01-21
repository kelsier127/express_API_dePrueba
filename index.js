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
readData();

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