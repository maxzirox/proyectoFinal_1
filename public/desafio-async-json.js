const fs = require('fs/promises');


class Contenedor{
    constructor(ruta){
        this.ruta = ruta;
    }


    async getAll(){
        try{
            const objs = JSON.parse(await fs.readFile(this.ruta, 'utf-8'), null, 2)
            return objs;
        }catch(error){
            console.log('error: ', error)
        }
    }

    async update(id, obj){
        const objs = await this.getAll();
        try{
            const indexObj = objs.findIndex((obj) => obj.id == id);
            if(indexObj == -1){
                console.log('producto no encontrado')
            }
            objs[indexObj] = {id: id, ...obj};
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return indexObj;
        }catch(error){
            console.log('error: ', error)
        }
    }    

    async save(obj){
        const objs = await this.getAll();

        let newId;
        if(objs.length == 0){
            newId = 1;
        } else{
            newId =objs[objs.length - 1].id + 1;
        }

        const newProduct = {id: newId, ...obj};
        objs.push(... newProduct);

        try{
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return newProduct;
        } catch(error){
            console.log('error: ', error);
        }
        return console.log('id: ', newId);
    }

    async getById(id){
        const objs = await this.getAll();

        try {
            const findObj = objs.filter((obj) => (obj.id == id))
             return findObj;
                
            
        } catch (error) {
            console.log('error: ', error);
        }
        
    }

    async deleteById(id){
        const objs = await this.getAll();
        let indexObj = objs.findIndex((item) => item.id == id);
        
        try{
            if(indexObj == -1){
                console.log('producto no encontrado')
            }
            objs.splice(indexObj, 1);
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return objs;
        } catch(error){
            console.log('error: ', error);
        }
    }
    
}

module.exports = Contenedor;
