const fs = require ("fs")

/* Importo la libreria de file system */

const writeFile = (path, products) =>
	fs.promises.writeFile(path, JSON.stringify({ products: products }))

/* creamos la funcion write file para no tener que repetir codigo mas adelante. Sirve para escribir archivo y lo pasa a json */

const readFile = async (path) => {
    const asyncGetProducts = await fs.promises.readFile(path);
    const parseResult = JSON.parse(asyncGetProducts);
    return parseResult;
}

/* creamos esta funcion para no tener que repertir mas adelante. Sirve para pasar de string a .json  */

class ProductManager {
    constructor(path){
        this.path = path
        this.products = []
    }

    /* Path es la ruta para donde queremos que se cree, modifique, busque o elimine nuestro archivo */

    initialize = async () => {
		const existsFile = fs.existsSync(this.path);

		if (existsFile) {
			console.log("El archivo ya existía!");
			const { products } = await readFile(this.path);
			this.products = products;
		} else {
			await writeFile(this.path, this.products);
			console.log("El archivo se creó exitosamente!");
		}
	};

    /* este metodo sirve para que si el archivo existe me avise que esta y sino que me cree el archivo. */

    getProducts= async function (limit) {
        if (limit == undefined){
        const fileData = await readFile(this.path);
        return fileData
        } else {
            const { products } = await readFile(this.path);
            const filtredArray = products.slice(0,limit)
            return filtredArray
        }
    }

    /* este metodo me trae todos los productos */

    addProducts = async({title, desc, price, thumbnail, code, stock}) => {

        const existingProduct = this.products.find((product) => product.code === code || product.title === title);
        
        if (existingProduct) {
            console.log("Error, ya existe un producto con ese codigo o titulo");
        }else {
            const id = this.products.length + 1;
			this.products.push({
            id,
            title,
            desc,
            price,
            thumbnail,
            code,
            stock
            });
        await writeFile(this.path, this.products)
        console.log("Se ha creado un producto")
        }
    }

    getProductsById(id){
        const findedProduct = this.products.find((product)=> product.id === id)

        if(findedProduct){
            return findedProduct
        }else{
            console.log("No se encuentra un producto con ese id")
        }
    }
}

updateProduct = async (id, newProduct) => {
    const findIndexProduct = this.products.findIndex(
        (product) => product.id === id
    )

    if (findIndexProduct !== -1) {
        const id = this.products[findIndexProduct].id;

        this.products[findIndexProduct] = {
            id,
            ...newProduct,
        }
        await writeFile(this.path, this.products)
        console.log("Actualizado correctamente")
    } else {
        console.log("No se encuentra un producto con ese id")
    }
}

deleteProduct = async (id) => {
    const findIndexProduct = this.products.findIndex(
        (product) => product.id === id
    )

    if (findIndexProduct !== -1) {
        const newProducts = this.products.filter(
            (product) => product.id !== id
        )
        await writeFile(this.path, newProducts)
        console.log("Eliminado correctamente")
    } else {
        console.log("No se encuentra un producto con ese id");
    }
}


async function main(){
    const productManager = new ProductManager("./data.json")
    await productManager.initialize()

    let products = await productManager.getProducts()

    const newProduct1 = {
        title: "P1",
        desc: "D1",
        price: "P1",
        thumbnail: "T1",
        code:"C1",
        stock: "S1"
    }

    const newProduct2 = {
        title: "P2",
        desc: "D1",
        price: "P1",
        thumbnail: "T1",
        code:"C2",
        stock: "S1"
    }

    const newProduct3 = {
        title: "P3",
        desc: "D1",
        price: "P1",
        thumbnail: "T1",
        code:"C3",
        stock: "S1"
    }

    await productManager.addProducts(newProduct1)
    await productManager.addProducts(newProduct2)
    await productManager.addProducts(newProduct3)

    products = await productManager.getProducts()

    console.log(products)
}

main()

module.exports = ProductManager












/* const ProductManager = new ProductManager()

const newProduct1 = {
    title: "P1",
    desc: "D1",
    price: "P1",
    thumbnail: "T1",
    code:"C1",
    stock: "S1"
}

const newProduct2 = {
	title: "P2",
	desc: "D2",
	price: "P2",
	thumbnail: "T2",
	code: "C2",
	stock: "S2",
};

ProductManager.addProducts(newProduct1)
ProductManager.addProducts(newProduct2)


console.log(ProductManager.getProducts) */