import { useRouter } from "next/router";
import Link from 'next/link'
const StoreDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    return <div>
        
        <h1>Store Details</h1>
        <p>Store ID: {id}</p>
        <Link href="/">Go back</Link>

        </div>;
    };

export default StoreDetails;