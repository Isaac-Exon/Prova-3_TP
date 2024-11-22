## Prova 3 - Técnicas de programação

Esse são apenas exemplos.

endpoint :http://localhost:3001/militar

Teste para Militar
POST
{
"nome": "João Silva",
"idade": 30,
"email": "joao.silva@example.com",
"fone": "1234567890"
}

DELETE
{
"id": "5f7e7d5f9b58a82ab01c8973"
}

PUT
{
"id": "5f7e7d5f9b58a82ab01c8973",
"nome": "João Silva",
"idade": 31,
"email": "joao.silva_updated@example.com",
"fone": "1122334455"
}

---

endpoint :http://localhost:3001/soldado

Soldado
Ao criar o militar tem que pegar o id do mesmo para o soldado.
POST
{
"cim": "12345",
"altura": "1.80",
"militar": "6740882c2ccf5201493b4c15"
}

---

Patente
endpoint :http://localhost:3001/patente

Post
{
"codigo": "123",
"descricao": "Capitão"
}

Put
{
"id": "67408a242ccf5201493b4c2e",
"codigo": "123",
"descricao": "Major"
}

Delete
{
"id": "645fca7b78e6a72d5c99a123"
}
