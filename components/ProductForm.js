/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
export default function ProductFrom(
    {
        _id,
        title: existingTitle,
        description: existingDescription,
        price: existingPrice,
        images: existingImages,
        category:assignedCategory,
        properties: assignedProperties,
    })
{
    const [title, setTitile] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [productProperties,setProductProperties] = useState(assignedProperties || {});
    const [price, setPrice] = useState(existingPrice || '');
    const [images,setImages] = useState( existingImages || []);
    const [isuploading,setIsUploading] = useState(false)
    const [goToProducts, setGoToProducts] = useState(false);
    const [categories,setCategories] = useState([]);
    const [category,setCategory] = useState(assignedCategory || '');
    const router = useRouter();
    useEffect(() =>{
        axios.get('/api/categories').then(result =>{
            setCategories(result.data);
        })
    })
    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {
             title, description, price,images,category,
             properties:productProperties, }
        if (_id) {
            //update
            await axios.put('/api/products', { ...data, _id });
        }
        else {
            //create
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);

    }
    if (goToProducts) {
        router.push('/products')
    }
   async function uploadImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0)
        {
            setIsUploading(true)
            const data = new FormData();
            for(const file of files)
            {
                data.append('file',file);
            }
           const res =  await axios.post('/api/upload',data);
           console.log(res.data);
           setImages(oldImages => {
            return [...oldImages, ...res.data];
        });
        setIsUploading(false);
        }
    }
    function updateImagesOrder(images){
        setImages(images);
    }
    function setProductProp(propName,value){
        setProductProperties(prev =>{
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        })
    }
    const propertiesToFill = [];
    if(categories.length > 0 && category){
        let catInfo = categories.find(({_id}) => _id === category)
        propertiesToFill.push(...catInfo.properties);
        while(catInfo?.parent?._id){
            const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id)
            propertiesToFill.push(...parentCat.properties)
            catInfo = parentCat;
        }
    }
    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input
                type="text"
                placeholder="Product Name"
                value={title}
                onChange={ev => setTitile(ev.target.value)}
            />
            <label>Category</label>
            <select name="" id="" value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map(c =>(
                    <option value={c._id} key={c._id}>{c.name}</option>
                    ))}
            </select>
            {propertiesToFill.length > 0 && propertiesToFill.map(p =>(
                <div className="" key={p.name}>
                    <label>{p.name[0].toUpperCase()+p.name.substring(1)} </label>
                    <div>
                    <select 
                        value={productProperties[p.name]}
                        onChange={ev => setProductProp(p.name,ev.target.value)}

                    >
                        {p.values.map(v =>(
                            <option value={v} key={v}>{v}</option>
                            ))}
                    </select>
                    </div>
                </div>
            ))}

            <label>
                Photos
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
                <ReactSortable 
                    list={images} 
                    setList={updateImagesOrder}
                    className="flex flex-wrap gap-2"
                >
                {!!images?.length && images.map(link => (
                    <div key={link} className="h-24 bg-white p-2 shadow-md rounded-lg border border-gray-200">
                        <img src={link} alt="" className="rounded-lg"/>
                    </div>
                ))}
                </ReactSortable>
                {isuploading && (
                    <div className="h-24 flex items-center">
                        <Spinner></Spinner>
                    </div>
                )}
                <label className="w-24 h-24 text-center flex-col flex items-center justify-center text-sm gap-1  rounded-lg bg-white cursor-pointer shadow-md border border-gray-200 text-primary" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                                Add Image
                    </div>
                    <input type="file" name="" id="" className="hidden" onChange={uploadImages}/>
                </label>
            </div>
            <label>Description</label>
            <textarea
                placeholder="Description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            ></textarea>

            <label>Price (in INR)</label>
            <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={ev => setPrice(ev.target.value)} />

            <button
                type="submit"
                className="bg-green-300 text-green-900 rounded-lg px-9 py-2 text=lg font-bold mt-3 shadow-lg "
            >
                Save
            </button>
        </form>
    );
}