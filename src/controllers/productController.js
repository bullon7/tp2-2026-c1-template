import { getProducts } from "../services/productService.js";

export async function getAllProducts(req, res) {
    try {
        res.json(getProducts());
        
    } catch (error) {
        res.json({message: "Error al obtener product", error: error.message});
    }
}

export async function getProductById(req, res) {
    res.json({message: `Producto con ID ${req.params.id}`});
}

export async function newProduct(req, res) {
    try {
        const { name, brand, category, price, stock } = req.body;
        const products = getProducts();

    if (!name || !name.trim() || !brand || !category || price === undefined || stock === undefined) {
            return res.status(400).json({ 
                message: "Cuerpo de solicitud inválido", 
                error: "Todos los campos (name, brand, category, price, stock) son obligatorios." 
            });
        }

        // 2. Validación de Price (Numérico y > 0)
        if (typeof price !== 'number' || price < 0) {
            return res.status(400).json({ 
                message: "Cuerpo de solicitud inválido", 
                error: "El precio debe ser un número mayor a 0." 
            });
        }

        // 3. Validación de Stock (Entero y >= 0)
        if (!Number.isInteger(stock) || stock < 0) {
            return res.status(400).json({ 
                message: "Cuerpo de solicitud inválido", 
                error: "El stock debe ser un número entero mayor o igual a 0." 
            });
        }

        // 4. Generación automática del ID (basado en el máximo actual)
        const newId = (products.length > 0) 
            ? (Math.max(...products.map(p => parseInt(p.id))) + 1).toString() 
            : "1";

        // 5. Creación del objeto siguiendo tu modelo
        const productToAdd = {
            id: newId,
            name: name.trim(),
            brand,
            category,
            price,
            stock
        };

        // 7. Respuesta de éxito
        res.status(201).json({
            message: "Producto creado",
            data: productToAdd});
        
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto", 
            error: error.message
        });
    }
}

//falta hacer aca el function de put