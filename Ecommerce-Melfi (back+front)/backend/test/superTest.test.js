import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";

const expect = chai.expect

const requester = supertest('http://localhost:4000') //Configuracion de la ruta inicial de mi app para testear

await mongoose.connect("mongodb+srv://admin:coderhouse@cluster0.gis7zph.mongodb.net/?retryWrites=true&w=majority")

describe("Testing de la aplicacion Ecommerce", () => {
    //Testing de mascotas
   /* describe("Testing de las rutas de productos", () => {
        //POST
        
        it("Ruta: /product/create con el metodo POST", async function () {
            //_body, StatusCode, Ok(true o false)
            const newProduct= {
                title:"Prod1",
                description:"desc1",
                code:"43gds232fsd",
                price:1111,
                stock:1111,
                category: "cat1"   
            }

            const { statusCode, _body, ok } = await requester.post('/product/create').send(newProduct) //requester.metodo(concatenacion de rutas)
            console.log(ok)
            console.log(statusCode)
            console.log(_body)
        })

        //GET

        it("Ruta: api/product con el metodo GET", async function () {

            const { statusCode, _body, ok } = await requester.get('/api/pets')
            console.log(ok)
            console.log(statusCode)
            console.log(_body)
        })

        //Put

        it("Ruta: api/pets con el metodo Put", async function () {
            const id = "6488f4c9d0b471a878a9cc82"
            const updatePet = {
                name: "Copito de nieve",
                specie: "Hamster",
                birthDate: "12-12-2022",
                adopted: true
            }
            const { statusCode, _body, ok } = await requester.put(`/api/pets/${id}`).send(updatePet)

            console.log(ok)
            console.log(statusCode)
            console.log(_body)
        })

        //DELETE
        it("Ruta: api/pets con el metodo delete", async function () {
            const id = "6488f44741745bfdb1094401"

            const { statusCode, _body, ok } = await requester.delete(`/api/pets/${id}`)

            console.log(ok)
            console.log(statusCode)
            console.log(_body)
        })


    })
*/

    //Testing de Sesiones

    describe("Testing de la ruta de sessions", () => {
        let cookie = ""
        it("Ruta: /auth/register con el metodo POST", async function () {
            const newUser = {
                first_name: "Pedro",
                last_name: "Perez",
                email: "pedro@pedro",
                password: "1@rt@ttr@114",
                age:32
            }
            
            const { _body } = await requester.post('/auth/register').send(newUser)
            console.log(_body)
            expect(_body.payload).to.be.ok //Analizar si el status es 200

        })

         it("Ruta: /auth/login con el metodo POST", async function () {
            const newUser = {
                email: "pedro@pedro",
                password: "1@rt@ttr@114"
            }

            const result = await requester.post('/auth/login').send(newUser)
            'nombreCookie="valor"'
            const cookieResult = result.headers['set-cookie'][0]

            expect(cookieResult).to.be.ok //Verificar existencia de cookie

            cookie = {
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1],
            }

            expect(cookie.name).to.be.ok.and.equal('1234coder') //Verificacion de nombre cookie
            expect(cookie.value).to.be.ok //Verificion de valor correcto

        })
/*
       it("Ruta: api/sessions/current con el metodo GET", async function () {
            //.set() setear valores como si tratara de las cookies del navegador
            const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])

            console.log(_body.payload)

            expect(_body.payload.email).to.be.equal("enri@eva.com")
        })
        */

    })

    describe("Testing de las rutas de carts", () => {
        //get
        
        it("Ruta: /cart con el metodo GET", async function () {
            //_body, StatusCode, Ok(true o false)

            const { statusCode, _body, ok } = await requester.get('/cart') //requester.metodo(concatenacion de rutas)
            console.log(ok)
            console.log(statusCode)
            console.log(_body)

            expect(Array.isArray(_body.payload)).to.be.ok

        })

        //get by id
        it("Ruta: /cart/{cid} con el metodo GET", async function () {
            const cid = "6488f4c9d0b471a878a9cc82"
            const { statusCode, _body, ok } = await requester.get(`/cart/${cid}`)

            console.log(ok)
            console.log(statusCode)
            console.log(_body)

            expect(_body.payload).to.be.ok
        })

        //purchase

        it("Ruta: /cart/{cid}/purchase con el metodo GET", async function () {
            const cid = "6488f4c9d0b471a878a9cc82"
            const { statusCode, _body, ok } = await requester.get(`/cart/${cid}/purchase`)

            console.log(ok)
            console.log(statusCode)
            console.log(_body)

            expect(_body.payload).to.be.ok

        })

    })


/*
    describe('Test de mascotas', () => {
        it('Pruebo el endpoint /api/pets/withimage POST', async function () {

            const newPet = {
                name: "Orion",
                specie: "Dog",
                birthDate: "12/12/2020"
            }
            const result = await requester.post('/api/pets/withimage')
                .field('name', newPet.name)
                .field('specie', newPet.specie)
                .field('birthDate', newPet.birthDate)
                .attach('image', './test/perro.jpg') //Agrego la imagen presente en el test y enviada a la carpeta publica

            expect(result.status).to.be.ok
            expect(result._body.payload.image).to.be.ok
            expect(result._body.payload).to.have.property('_id')

        })
    })

*/
})