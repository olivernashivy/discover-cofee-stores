import styles from './Banner.module.css';
const Banner = (props) => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>
            <span className={styles.title1}>
        Kigali
        </span>
        <span className={styles.title2}>Search</span> </h1>
        <p className={styles.subTitle}>Find the best coffee shops in Kigali</p>
        <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleClick}>{props.buttonText}</button>
        </div>
        </div>
    );
    }

export default Banner;