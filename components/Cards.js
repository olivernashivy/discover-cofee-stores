import  Styles from  './Cards.module.css' ;
import Image from 'next/image'
import Link from 'next/link'
    const  Cards = (props) => { 
        return (
            <Link href={props.href} className={Styles.cardLink}>
            

                <div className={Styles.container}>
                    <div className={Styles.cardHeaderWrapper}>
                <h3 className={Styles.cardTitle}>{props.title}</h3>
                   </div>
                    <div className={Styles.cardImageWrapper}>
                        <Image className={Styles.cardImage} src={props.imageurl} alt={props.title} width={260} height={160}/>
                    </div>
                </div>
           
            </Link>
        );
    }

    export default Cards;