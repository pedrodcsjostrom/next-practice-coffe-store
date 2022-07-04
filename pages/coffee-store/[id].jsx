import Link from "next/link";
import { useRouter } from "next/router";

export default function CoffeStore() {
  const router = useRouter();
  console.log("router", router);
  return <div>CoffeStore {router.query.id} <Link href="/"><a>Home</a></Link></div>;
}
