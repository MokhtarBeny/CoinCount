import { useSelector, useDispatch } from "react-redux";
import { Inter } from "next/font/google";
import { logout } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import getAxiosInstance from "@/utils/axios/getAxiosInstance";
import CanvasGradientAnimation from "@/components/Background/CanvasBackground";

const inter = Inter({ subsets: ["latin"] });

interface Article {
  title: string;
  link: string;
  description: string;
  image: string;
}

export default function Home() {
  const router = useRouter();
  const axiosInstance = getAxiosInstance();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const signOut = () => {
    dispatch(logout());
    window.localStorage.clear();
    router.replace("/");
  };
  const [cryptos, setCryptos] = useState([]);
  const [articles, setArticles] = useState<Article[]>([]);


  useEffect(() => {
    function calculateHotScore(crypto) {
      const changeWeight = 0.4;
      const volumeWeight = 0.3;
      const marketCapWeight = 0.3;

      const normalizedChange = parseFloat(crypto.changePercent24Hr) / 100;
      const normalizedVolume = Math.log10(parseFloat(crypto.volumeUsd24Hr));
      const normalizedMarketCap = Math.log10(parseFloat(crypto.marketCapUsd));

      return (
        normalizedChange * changeWeight +
        normalizedVolume * volumeWeight +
        normalizedMarketCap * marketCapWeight
      );
    }

    const fetchRSSFeed = async () => {
      try {
        const response = await axiosInstance.get("articles");
        setArticles(response.data.slice(0, 2));
        console.log("Articles", articles);
      } catch (error) {
        console.error("Erreur lors de la récupération du flux RSS", error);
        throw error;
      }
    };

    fetchRSSFeed();
    axiosInstance
      .get("/cryptos")
      .then((response) => {
        const sortedCryptos = response.data
          .filter((crypto) => crypto.visibility)
          .map((crypto) => ({
            ...crypto,
            hotScore: calculateHotScore(crypto),
            priceEuro: "€" + (crypto.priceUsd * 0.88).toFixed(0), // Normalized and formatted price in Euro
          }))
          .sort((a, b) => b.hotScore - a.hotScore)
          .slice(0, 4);

        console.log("Top Hot Cryptos", sortedCryptos);
        setCryptos(sortedCryptos);
      })
      .catch((error) => {
        console.error("Error fetching crypto data:", error);
      });
  }, []);
  return (
    <>
      <CanvasGradientAnimation />
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <div className="flex flex-col items-center justify-center w-full flex-1 text-center">
          <div className="flex flex-col items-center justify-center flex-1 text-center my-20 md:px-20 px-10">
            <h1 className="md:my-10  my-2 text-center font-extrabold tracking-[-0.02em] py-4 text-4xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-tr from-zinc-900 to-zinc-900/90">
              <p>Empowering Crypto</p>
              <p className="mt-3">Crafted with Love ❤️</p>
            </h1>
            <p className="container text-lg font-light text-zinc-700">
              Dive into the dynamic world of cryptocurrency. Explore, learn, and
              stay ahead with insights and analytics from around the globe.
            </p>
            <div className="flex flex-col justify-center w-full mx-auto mt-8 gap-4 sm:flex-row sm:max-w-lg mb-6 ">
              <Link
                href="/crypto/dashboard"
                className="sm:w-1/2 sm:text-center inline-block space-x-2 rounded px-4 py-1.5 md:py-2 text-base font-semibold leading-7 text-zinc-900  ring-1 ring-zinc-600 backdrop-blur hover:bg-white hover:text-zinc-900 duration-150 "
              >
                View Cryptos
              </Link>
              {auth.token ? (
                <Link
                  className="sm:w-1/2 sm:text-center inline-block transition-all space-x-2  rounded px-4 py-1.5 md:py-2 text-base font-semibold leading-7 text-zinc-100   bg-zinc-900 ring-1 ring-zinc-900 hover:text-zinc-900   hover:bg-zinc-100 duration-150"
                  href="/article"
                >
                  Read Articles
                </Link>
              ) : (
                <Link
                  className="sm:w-1/2 sm:text-center inline-block transition-all space-x-2  rounded px-4 py-1.5 md:py-2 text-base font-semibold leading-7 text-zinc-100   bg-zinc-900 ring-1 ring-zinc-900 hover:text-zinc-900   hover:bg-zinc-100 duration-150"
                  href="/login"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center w-full flex-1 text-center px-20">
            <p className="text-4xl font-bold tracking-tight text-center text-zinc-900">
              Hot Cryptos 🚀
            </p>
            <div className="relative pt-10 overflow-hidden">
              <div className="mx-auto max-w-7xl lg:px-8">
                <dl className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 text-center">
                  {Object.keys(cryptos).map((key, index) => {
                    return (
                      <div
                        className="flex flex-col max-w-xs mx-auto gap-y-4"
                        key={index}
                      >
                        <Link href={`/crypto/${cryptos[key].id}`}>
                          <dd className="text-sm font-medium leading-5 text-gray-500">
                            Rank {cryptos[key].rank}
                          </dd>
                          <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                            <span>{cryptos[key].priceEuro}</span>
                          </dd>
                          <dt className="text-base leading-7 text-gray-600">
                            {cryptos[key].name}
                          </dt>
                        </Link>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </div>
          <div className="flex flex-1 w-100 flex-col justify-center w-full flex-1 text-center my-10 px-20">
            <div className="mx-auto text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-7xl">
              <Link
                href={"/article"}
                className="text-lg font-semibold tracking-tight text-transparent leading-8 bg-gradient-to-tr bg-clip-text from-primary-600 to-primary-400"
              >
                Read all our news
              </Link>
              <p className="py-2 text-4xl font-bold tracking-tight text-center text-zinc-900">
                Latest News 📰
              </p>
              <p className="leading-8 mt- text-zinc-500">
                Stay up to date with the latest news from the world of
                cryptocurrency.
              </p>
            </div>

            <div className="flex flex-col md:flex-row flex-1 text-center mt-5 gap-5">
              {articles.map((article, index) => {
                return (
                  <div
                    className="relative overflow-hidden border flex-1 rounded shadow-lg p-3"
                    key={index}
                  >
                    <Link href={article.link}>
                      <div className="grid grid-cols-3 h-full">
                        <div className="col-span-1 image-main">
                          <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            style={{ width: "100%", height: "100%" }}
                            src={
                              article.image
                                ? article.image
                                : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                            }
                            height={"100%"}
                          />
                        </div>
                        <div className="col-span-2 px-4 flex flex-col text-start">
                          <h2 className="text-xl font-bold ">
                            {article.title.split(" ").slice(0, 8).join(" ")}
                          </h2>
                          <p className="text-gray-500">
                            {article.description
                              .split(" ")
                              .slice(0, 15)
                              .join(" ")}{" "}
                            ...
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
