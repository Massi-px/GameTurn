export default class AbstractController {
    constructor(model) {
        this.model = new model();
    }

    _formatRes(data){
        return data;
    }

     async get(req,res){
        let data = await this.model.get(req.params.id)
        if(data){
            res.json(this._formatRes(data));
            return;
        }
        res.status(404).json(true);
    }

     async getAll(req, res){
        let data = await this.model.getAll()
        if(data){
            res.json(data.map(this._formatRes));
            return;
        }
        res.status(404).json();
    }

    _formatReq(obj){
        return obj
    }

    async post(req,res){
        let data = await this.model.insert(this._formatReq(req.body))
        if(data){
            res.json(this._formatRes(data));
            return data;
        }
        res.status(400).json(false);
    }

    async put(req,res){
        let data = await  this.model.update(req.params.id, this._formatReq(req.body))
        if(data){
            res.json(this._formatRes(data));
            return;
        }
        res.status(404).json();
    }

    async delete(req,res){
        let data = await this.model.delete(req.params.id)

        if(data){
            res.json(data);
            return;
        }
        res.status(404).json();

    }

    async getBy(req, res){
        let data = await this.model.getBy(req.params)
        if(data){
            res.json(data.map(this._formatRes));
            return;
        }

        res.status(404).json();
    }

}