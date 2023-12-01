class Model{
    static data = null
    async getData(){
        console.log('getData')
        if(this.data == null){
            console.log('fetch')
            const reponse = await fetch("data/photographers.json")
            this.data = await reponse.json()
       }
        
        return this.data
    
    }
    
    async getListPhotographers(){
        console.log("getListPhotographer")
        const data = await this.getData()
        return data.photographers
    }
    async getPhotographerById(id){
        console.log("getPhotographerById")
        let listPhotographers = await this.getListPhotographers()
        for(const photographer of listPhotographers){
            if (photographer.id == id){
                return photographer
            }
        }
        return null
    }
    async getListMedias(){
        console.log("getListMedia")
        const data = await this.getData()
        return data.media
    }
    async getListMediaById(id){
        console.log("getListMedia")
        const listMedias = await this.getListMedias()
        for(const media of listMedias){
            if (media.id == id){
                return media
            }
        }
        return null
    }
}

