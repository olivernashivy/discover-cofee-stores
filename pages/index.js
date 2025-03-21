import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/Banner'
import Cards from '@/components/Cards'
//import coffestores from '@/data/coffee-stores.json'
import { fetchcoffeestores } from '@/lib/coffeestore'
import useTrackLocation from '@/lib/usertracklocation'
import { useEffect, useState, useContext } from 'react'

import { ACTION_TYPES ,StoreContext} from "@/pages/_app";


export async function getStaticProps() {
  const results = await fetchcoffeestores();
  return {
    props: {
      coffestores:results,
    },

  }
}

export default function Home(props) {
  const {coffestores} = props;
  const imageurldefault = 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
  const {   handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();
  const { dispatch, state } = useContext(StoreContext);
  //const [coffeeStores, setCoffeeStores] = useState([]);
  const { coffeeStores, latLong } = state;
  const [coffeStoresError, setCoffeeStoresError] = useState('');
  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const response = await fetch(
            `/api/getCofeeStoresByLocation?latLong=${latLong}&limit=8`
          );

          const coffeeStores = await response.json();
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {coffeeStores:coffeeStores,},
          });
          setCoffeeStoresError("");
        } catch (error) {
          //set error
          console.log("Error", { error });
          setCoffeeStoresError(error.message);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong]);


const handlebuttonClick = () => {
  console.log('button clicked')
  handleTrackLocation()
  console.log({latLong}, {locationErrorMsg})
}
  return (
    <>
      <Head>
        <title>Get coffe houses</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <ul className={styles.header}>
            <li>
              <a href="#">Home</a>
              </li>
            <li>
              <a href="#">About</a>
              </li>
            <li>
              <a href="#">Contact</a>
              </li>

          </ul>
          <div>
            <h1 className={styles.title}>
              Login
              </h1>
          </div>
        </div>
        <div className={styles.hero}>
          <Banner buttonText={isFindingLocation?  "Locating": "Views stores Nearby" } handleClick={handlebuttonClick}/>
        <div>
          <Image src="/static/hero.svg" alt='Hero image' width={700} height={400} />
        </div>
        </div>

        <div className={styles.center}>
          { locationErrorMsg && <p>{locationErrorMsg}</p>
         } 
           { coffeStoresError && <p>{coffeStoresError}</p>
         } 
        </div>
        <div>
        <div>
          <h1 className={styles.titleshop}>
            Coffee shops Near Me
          </h1>
        </div>
        {coffeeStores && coffeeStores.length > 0 && (


        <div className={styles.grid}>
          {coffeeStores.map((cofestore) => (
          <div key={cofestore.id} className={styles.card}>
            <Cards href={`store-details/${cofestore.id}`}
             imageurl={cofestore.imgUrl ? cofestore.imgUrl : imageurldefault}
              title={cofestore.name}/>
         
        </div>

          ))}
        
        </div>
        )}
        </div>

        <div>
        <div>
          <h1 className={styles.titleshop}>
            Coffee shops
          </h1>
        </div>
        {coffestores && coffestores.length > 0 && (


        <div className={styles.grid}>
          {coffestores.map((cofestore) => (
          <div key={cofestore.id} className={styles.card}>
            <Cards href={`store-details/${cofestore.id}`}
             imageurl={cofestore.imgUrl ? cofestore.imgUrl : imageurldefault}
              title={cofestore.name}/>
         
        </div>

          ))}
        
        </div>
        )}
        </div>
       

      </main>
    </>
  )
}
