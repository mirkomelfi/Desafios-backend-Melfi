import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";

const expect = chai.expect

const requester = supertest('http://localhost:4000') //Configuracion de la ruta inicial de mi app para testear

await mongoose.connect("mongodb+srv://admin:coderhouse@cluster0.gis7zph.mongodb.net/?retryWrites=true&w=majority")

describe("Testing de la aplicacion Ecommerce", () => {
    let cookie = ""

        //Testing de Sesiones

        describe("Testing de la ruta de sessions", () => {
           // let cookie = ""
            it("Ruta: /auth/register con el metodo POST", async function () {
                const newUser = {
                    first_name: "mdfir",
                    last_name: "dfm",
                    email: "mdfirmm",
                    //rol: "Admin",
                    password: "coder",
                    age:32
                }
                //const response= await requester.post('/auth/register').send(newUser)
                const {statusCode}= await requester.post('/auth/register').send(newUser)
                //console.log(response)
                let ok=false
                if (statusCode===201||statusCode===401){
                    ok=true
                }
                expect(ok).to.be.ok
    
            })
    
             it("Ruta: /auth/login con el metodo POST", async function () {
                const newUser = {
                    email: "mdfirmm",
                    password: "coder"
                }
    
                const result = await requester.post('/auth/login').send(newUser)
                const cookieResult = result.headers['set-cookie'][0]
    
                expect(cookieResult).to.be.ok //Verificar existencia de cookie
    
                cookie = {
                    name: cookieResult.split("=")[0],
                    value: cookieResult.split("=")[1],
                }
    
                expect(cookie.name).to.be.ok.and.equal('jwt') //Verificacion de nombre cookie
                expect(cookie.value).to.be.ok //Verificion de valor correcto
    
            })
    
           it("Ruta: /auth/current con el metodo GET", async function () {
                //.set() setear valores como si tratara de las cookies del navegador
                const { _body } = await requester.get('/auth/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
    
                expect(_body.payload.user.id).to.be.ok
            })
    
    
        })

    describe("Testing de las rutas de productos", () => {
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
            
            //const response =await requester.post('/product/create').send(newProduct).set('Cookie', [`${cookie.name}=${cookie.value}`])
            const { statusCode, _body, ok } = await requester.post('/product/create').send(newProduct).set('Cookie', [`${cookie.name}=${cookie.value}`]) //requester.metodo(concatenacion de rutas)
            //console.log(_body)
            expect(ok).to.be.ok
        })

        //GET

        it("Ruta: /product con el metodo GET", async function () {

            const { statusCode, _body } = await requester.get('/product')

            expect(_body).to.be.ok
        })

        it("Ruta: /product/{pid} con el metodo GET", async function () {
            const pid = "647ce94fd5b31ad0934c6604"
            const { statusCode, _body } = await requester.get(`/product/${pid}`)
            //console.log(statusCode)
            let ok=false
            if (statusCode===200||statusCode===400){
                ok=true
            }
            expect(ok).to.be.ok

        })

        it("Ruta: /product/add con el metodo POST", async function () {
            //_body, StatusCode, Ok(true o false)
            const product= {
                idCart: "649b44cc2370f6da248b243c",
                idProduct: "647ce94fd5b31ad0934c6604",
                quantity: 888 
            }
            
            const { statusCode, _body, ok } = await requester.post('/product/add').send(product).set('Cookie', [`${cookie.name}=${cookie.value}`]) //requester.metodo(concatenacion de rutas)
            //console.log(_body)
            expect(statusCode).to.be.equal(200)
        })

        //Put

        it("Ruta: /product/{pid} con el metodo Put", async function () {
            const pid = "647ce94fd5b31ad0934c6604"
            const updateProduct= {
                title:"Prod1",
                description:"desc1",
                code:"43gds232fsd",
                price:11000011,
                stock:1111,
                category: "cat1"   
            }
            const {statusCode} = await requester.put(`/product/${pid}`).send(updateProduct)

            let ok=false
            if (statusCode===200||statusCode===400||statusCode===401){
                ok=true
            }
            expect(ok).to.be.ok
        })

        //DELETE
        it("Ruta: /product/{pid} con el metodo delete", async function () {
            const pid = "647ce94fd5b31ad0934c6604"

            const { statusCode, _body } = await requester.delete(`/product/${pid}`)

            let ok=false
            if (statusCode===200||statusCode===400||statusCode===401){
                ok=true
            }
            expect(ok).to.be.ok
        })


    })

    describe("Testing de las rutas de carts", () => {
        //get
        
        it("Ruta: /cart con el metodo GET", async function () {
            //_body, StatusCode, Ok(true o false)

            const { statusCode, _body } = await requester.get('/cart') //requester.metodo(concatenacion de rutas)

            let ok=false
            if (statusCode===200||statusCode===400){
                ok=true
            }
            expect(ok).to.be.ok

        })

        //get by id
        it("Ruta: /cart/{cid} con el metodo GET", async function () {
            const cid = "649b44cc2370f6da248b243c"
            const { statusCode, _body } = await requester.get(`/cart/${cid}`)

            let ok=false
            if (statusCode===200||statusCode===400){
                ok=true
            }
            expect(ok).to.be.ok
        })

        //purchase

        it("Ruta: /cart/{cid}/purchase con el metodo GET", async function () {
            const cid = "649b44cc2370f6da248b243c"
            const { statusCode, _body } = await requester.get(`/cart/${cid}/purchase`)

            expect(statusCode).to.be.equal(200)

        })

    })



})