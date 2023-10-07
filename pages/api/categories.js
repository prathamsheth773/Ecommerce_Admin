import { Category } from "@/models/categories";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req,res)
{
    await mongooseConnect();
    const {method} = req;
    if(method === 'POST'){
        const {name,parentCategory,properties} = req.body;
        const categoryDoc = await Category.create({
            name,
            parent:parentCategory || undefined,
            properties,
        });
        res.json(categoryDoc);  
    }
    if(method === 'GET'){
        res.json(await Category.find().populate('parent'))
    }
    if(method === 'PUT'){
        const {name,parentCategory,properties,_id} = req.body;
        const categoryDoc = await Category.updateOne({_id},{
            name,
            parent:parentCategory || undefined,
            properties,
        });
        res.json(categoryDoc);  
    }
    if(method === 'DELETE'){
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json('ok')
    }
}