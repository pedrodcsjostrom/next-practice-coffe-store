import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import cls from "classnames";

import styles from "../../styles/coffee-store.module.css";

import coffeStoreData from "../../data/coffee-stores.json";
import { fetchCoffeStores } from "../../lib/coffe-stores";

export async function getStaticProps(staticProps) {
  // console.log(staticProps);
  const params = staticProps.params;
  const coffeStores = await fetchCoffeStores();

  return {
    props: {
      coffeStore: coffeStores.find((coffeStore) => {
        return coffeStore.fsq_id.toString() === params.id; // dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeStores = await fetchCoffeStores();

  const paths = coffeStores.map((coffeStore) => {
    return {
      params: { id: coffeStore.fsq_id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export default function CoffeStore({ coffeStore }) {
  console.log("props", coffeStore)
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { name, location, imgUrl } = coffeStore;

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
              <a> ← Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl || coffeStoreData[0].imgUrl}
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
            <p className={styles.text}>{location.formatted_address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/nearMe.svg"}
              width={24}
              height={24}
              alt={name}
            />
            <p className={styles.text}>{location.locality}</p>
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


