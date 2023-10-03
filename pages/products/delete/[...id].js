import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage(){
    const router = useRouter();
    const {id} = router.query;
    const [productsInfo, setProductInfo] = useState();
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response =>{
            setProductInfo(response.data);
        });
    },[id]);

    function goBack(){
        router.push('/products');
    }
    async function deleteProduct(){
        await axios.delete('/api/products?id='+id);
        goBack();
    }

    return(
        <Layout>
            <h1 className="text-center">
                Do You Really Want To Delete {productsInfo?.title}?
            </h1>
            <div className="flex gap-2 justify-center">
                <button 
                    onClick={deleteProduct }
                    className="btn-red">
                        Yes
                </button>
                <button 
                    className="btn-default"
                    onClick={goBack}>
                        No 
                </button>
            </div>
        </Layout>
    )
}