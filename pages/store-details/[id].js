import { useRouter } from "next/router";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import coffestoreData from '@/data/coffee-stores.json';
import Styles from '@/styles/StoreDetails.module.css'
import { fetchcoffeestores } from '@/lib/coffeestore'
export async function getStaticProps(staticparams) {
    const results = await fetchcoffeestores();
    const coffestore = results.find(
        (coffestore) => coffestore.id === staticparams.params.id
    );
    
    return {
        props: {
            coffestore: coffestore? coffestore: null,
        },
    };
}

export async function getStaticPaths() {
    const results = await fetchcoffeestores();
    const paths = results.map((coffestore) => ({
        params: { id: coffestore.id },
    }));
   
    return {
        paths,
        fallback: true,
    };
}
const handleUpvote = () => {
    console.log('button clicked')
}

const StoreDetails = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const imageurldefault = 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
    if (!props.coffestore) {
        return <div>Loading...</div>;
    }
    const { coffestore } = props;
    return <div className={Styles.layout}>
        <Head>
            <title>{coffestore.name}</title>
        </Head>
        <div className={Styles.container}>
        <div className={Styles.col1}>
        <Link className={Styles.backToHomeLink} href="/">Go back</Link>
        <div className={Styles.nameWrapper}>
            <h1 className={Styles.name}>{coffestore.name}</h1>
        </div>
        <div className={Styles.storeImgWrapper}>
        <Image src={coffestore.imgUrl || imageurldefault}
         alt={coffestore.name} width={600} 
         height={360} 
            className={Styles.storeImg}
         />

        </div>
       
        </div>
        <div className={Styles.col2}>
           {/* {JSON.stringify(coffestore.location) } */}
            <div className={Styles.iconWrapper}>
       <Image src="/static/svg/NearMe.svg" alt='Near me icon' width={24} height={24} />
        <p className={Styles.text}>
            {coffestore.location.region? coffestore.location.region : coffestore.location.cross_street? coffestore.location.cross_street : 'No region'}
        </p>
        </div>
        <div className={Styles.iconWrapper}>
        <Image src="/static/svg/Places.svg" alt='Near me icon' width={24} height={24} />
        <p className={Styles.text}>
            {coffestore.location.formatted_address? coffestore.location.formatted_address : 'No address'}
        </p>
        </div>
        <div className={Styles.iconWrapper}>   
           <Image src="/static/svg/star.svg" alt='Star icon' width={24} height={24} />

        <p className={Styles.text}>
            1
        </p>
        </div>
        <button onClick={handleUpvote} className={Styles.upvoteButton}>Vote</button>
    </div>
    </div>
        </div>;
    };

export default StoreDetails;