import ProductFrom from "@/components/ProductForm";
import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function EditProductPage(){
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);

        });
    },[id]);
    return (
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductFrom {...productInfo}/>
            )}
        </Layout>
    )
}