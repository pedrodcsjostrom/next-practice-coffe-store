import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import cls from "classnames";

import styles from "../../styles/coffee-store.module.css";

import coffeStoreData from "../../data/coffee-stores.json";
import Image from "next/image";

export default function CoffeStore({ coffeStore }) {
  // console.log("props", props)
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { name, address, neighbourhood, imgUrl } = coffeStore;

  const handleUpvoteButton = () => {
    console.log("upvote");
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/places.svg"}
              width={24}
              height={24}
              alt={name}
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/nearMe.svg"}
              width={24}
              height={24}
              alt={name}
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/star.svg"}
              width={24}
              height={24}
              alt={name}
            />
            <p className={styles.text}> 1 </p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export function getStaticProps(staticProps) {
  console.log(staticProps);
  const params = staticProps.params;

  return {
    props: {
      coffeStore: coffeStoreData.find((coffeStore) => {
        return coffeStore.id.toString() === params.id; // dynamic id
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeStoreData.map((coffeStore) => {
    return {
      params: { id: coffeStore.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
}
