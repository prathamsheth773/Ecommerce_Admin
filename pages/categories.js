import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

function Categories({ swal }) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties,setProperties] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);
    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }
    async function saveCategory(ev) {
        ev.preventDefault();
        const data = 
        {
             name, 
             parentCategory,
             properties:properties.map(p =>({
                name:p.name,
                values:p.values.split(','),
             })),
        }
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        }
        else {
            await axios.post('/api/categories', data);
        }
        setName('');
        setParentCategory('')
        setProperties([]);
        fetchCategories();
    }
    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name)
        setParentCategory(category.parent?._id)
        setProperties(
            category.properties.map(({name,values})=>({
                name,
                values:values.join(',')
            }))
            )
    }
    function deleteCategory(category) {
        swal.fire({
            title: 'Are You Sure?',
            text: `Do you want to delete ${category.name}`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,

        }).then(async result => {
            if (result.isConfirmed) {
                const { _id } = category;
                await axios.delete('/api/categories?_id=' + _id);
                fetchCategories();
            }
        });
    }
    function addProperty(){
        setProperties(prev =>{
            return[...prev, {name:'',values:''}];
        })
    }
    function handlePropertyNameChange(index,property,newName){
        setProperties(prev=>{
            const properties = [...prev];
            properties[index].name = newName;
            return properties
        })
    }  
    function handlePropertyValuesChange(index,property,newValues){
        setProperties(prev=>{
            const properties = [...prev];
            properties[index].values = newValues;
            return properties
        })
    }
    function removeProperty(indexToRemove){
        setProperties(prev =>{
            return [...prev].filter((p,pindex)=>{
                return pindex !== indexToRemove
            })
        })
    }
    return (
        <Layout>
            <h1>Categories</h1>
            <label className="font-bold">
                {
                    editedCategory
                        ? `Edit Category ${editedCategory.name}`
                        : 'Create New Category'
                }
            </label>
            <form onSubmit={saveCategory} >
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder={'Category Name'}
                        onChange={ev => setName(ev.target.value)}
                        value={name}
                    />
                    <select
                        onChange={ev => setParentCategory(ev.target.value)}
                        value={parentCategory}
                    >
                        <option value="">No Parent Category</option>
                        {categories.length > 0 && categories.map(Category => (
                            <option value={Category._id} key={Category._id}>{Category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-1">
                    <label className="block font-bold">Properties</label>
                    <button
                        onClick={addProperty}
                        className="btn-default mb-3"
                        type="button">
                        Add new Property
                    </button>
                    {properties.length > 0 && properties.map((property,index) =>(
                        <div className="flex gap-1 mb-2" key={property._id}>
                            <input 
                            type="text" 
                            value={property.name}
                            className="mb-0"
                            onChange={(ev)=> handlePropertyNameChange(index,property,ev.target.value)}
                            placeholder="Property Name: (Example: color)"/>

                            <input 
                            type="text"
                            className="mb-0"
                            onChange={(ev)=> handlePropertyValuesChange(index,property,ev.target.value)} 
                            value={property.values}
                            placeholder="Values, Comma Separated"/>

                            <button 
                            onClick={() => removeProperty(index)}
                            type="button"
                            className="btn-default">
                                Remove
                            </button>

                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    {editedCategory && (
                        <button 
                            type="button"
                            onClick={()=> {
                                setEditedCategory(null)
                                setName('')                            
                                setParentCategory('')
                                setProperties([]);
                            }}
                            className="btn-default">Cancel
                        </button>
                    )}
                    <button 
                        type="submit" 
                        className="btn-primary py-1">
                        Save
                    </button>
                </div>
            </form>
            {!editedCategory && (

            <table className="basic mt-4 ">
                <thead>
                    <tr>
                        <td>
                            Category Name
                        </td>
                        <td>
                            Parent Category
                        </td>
                        <td>

                        </td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(Category => (
                        <tr key={Category._id}>
                            <td>{Category.name}</td>
                            <td>{Category?.parent?.name}</td>
                            <td>
                                <button
                                    className="btn-default mr-2"
                                    onClick={() => editCategory(Category)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn-red"
                                    onClick={() => deleteCategory(Category)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </Layout>
    );
}
export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
))