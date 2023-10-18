import Layout from "@/components/layout";

export default function OrdersPage() {
    return (
        <Layout>
            <h1>Orders</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>10-10-2023</th>
                        <th>Pratham Sheth prathamsheth077@gmial.com Stockholm 123 Test test</th>
                        <th>Xiaomi Redmi Note 11x1</th>
                    </tr>
                </tbody>
            </table>

        </Layout>
    );
}