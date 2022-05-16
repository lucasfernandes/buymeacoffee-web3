import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ToastContainer } from "react-toastify";
import { buy, getMemos, withdraw } from "../api/buyMeACoffee";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";

type CoffeeType = {
  size: number;
  name: string;
  value: number;
  boxSize: number;
  class: string;
};

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState({} as CoffeeType);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [coffeeTypes, _] = useState([
    {
      size: 1,
      name: "Small",
      value: 1,
      boxSize: 60,
      class: "top-[22%] left-[20%]",
    },
    {
      size: 2,
      name: "Medium",
      value: 3,
      boxSize: 70,
      class: "top-5 left-4",
    },
    {
      size: 3,
      name: "Large",
      value: 5,
      boxSize: 80,
      class: "top-4 left-3",
    },
  ]);
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(null as any);
  const { data } = useAccount();

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e?.target.value);
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e?.target.value);
  }

  function handleSelect(coffee: any) {
    setSelected(coffee);
  }

  function handleSize(size: number) {
    switch (size) {
      case 1:
        return "Small";
      case 2:
        return "Medium";
      case 3:
        return "Large";
    }
  }

  async function handleBuy() {
    setLoading(true);
    await buy({
      name: name,
      message: message,
      value: selected.value,
      type: selected.size,
    });

    setName("");
    setMessage("");
    setLoading(false);
  }

  async function handleWithdraw() {
    setLoading(true);
    await withdraw();
    setLoading(false);
  }

  const getReceivedMemos = useCallback(async () => {
    setLoading(true);
    const allMemos = await getMemos();
    setMemos(allMemos || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentPage === 1) {
      getReceivedMemos();
    }
  }, [currentPage, getReceivedMemos]);

  useEffect(() => {
    if (data) {
      return setWallet(data);
    }

    return setWallet(null);
  }, [data, setWallet]);

  return (
    <div className="flex flex-col items-center w-full h-full bg-stone-900 font-['Poppins'] min-h-screen">
      <Head>
        <title>Buy me a coffee</title>
        <meta name="description" content="Buy me a coffee app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        data={wallet}
        currentPage={currentPage}
        handleWithdraw={handleWithdraw}
        setCurrentPage={setCurrentPage}
      />
      <main className="text-white text-[30px] text-center">
        <div className="my-10 lg:my-20 font-bold text-[34px] md:text-[44px] lg:text-[64px]">
          {currentPage === 0 ? "Buy me a coffee" : "Memos received"}
        </div>

        {currentPage === 0 ? (
          <div className="flex flex-col md:flex-row justify-between items-center mb-[100px]">
            <div
              className="
              flex flex-col justify-center items-center bg-gradient-to-t from-stone-600 to-stone-800 rounded-[38px] shadow-2xl w-[320px] h-[300px]
              xs:w-[400px] xs:h-[400px]
              "
            >
              {loading && (
                <>
                  <Image
                    src="/images/coffee.svg"
                    alt="coffee"
                    width={200}
                    height={200}
                    className="animate-spin"
                  />
                </>
              )}
              {!loading && Object.keys(selected).length === 0 && (
                <>
                  <Image
                    src="/images/coffee.svg"
                    alt="coffee"
                    width={200}
                    height={200}
                    className="hover:animate-spin"
                  />
                </>
              )}
              {!loading && Object.keys(selected).length > 0 && (
                <div className="flex flex-col justify-center items-center space-y-4 text-sm w-full p-10">
                  <div className="relative w-[50px] h-[50px] xs:w-[80px] xs:h-[80px]">
                    <Image
                      src="/images/coffee.svg"
                      alt="coffee"
                      layout="fill"
                      className="hover:animate-spin"
                    />
                  </div>

                  <div className="p-2 xs:p-4 bg-stone-900 hover:bg-stone-800 active:bg-stone-800 rounded-xl w-full">
                    <input
                      type="text"
                      spellCheck={false}
                      className="bg-transparent outline-none w-full"
                      placeholder="Type your name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="p-2 xs:p-4 bg-stone-900 hover:bg-stone-800 active:bg-stone-800 rounded-xl w-full">
                    <textarea
                      spellCheck={false}
                      style={{ resize: "none" }}
                      className="bg-transparent outline-none w-full"
                      placeholder="Fill a message"
                      value={message}
                      onChange={handleMessageChange}
                    />
                  </div>

                  <button
                    disabled={!data}
                    className={`flex justify-center items-center ${
                      data
                        ? "bg-green-700 hover:bg-green-600 active:bg-green-500"
                        : "bg-green-700 opacity-50"
                    }  p-3 xs:p-4 rounded-3xl w-full shadow-xl text-[10px] xs:text-sm`}
                    onClick={handleBuy}
                  >
                    Send a {selected.name} Coffee ({selected?.value?.toString()}{" "}
                    FTM)
                  </button>

                  <button
                    className="flex justify-center items-center w-full text-stone-900 hover:text-stone-800 text-[10px] xs:text-sm"
                    onClick={() => setSelected({} as CoffeeType)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div
              className="
              flex flex-row justify-between mt-12 w-full
              md:flex-col md:justify-center md:space-y-10 md:ml-12 md:mt-0 md:w-auto
            "
            >
              {coffeeTypes.map((coffee, index) => (
                <div
                  className="
                    flex flex-col items-center w-full
                    md:flex-row md:space-x-5
                  "
                  key={index}
                >
                  <button
                    className="active:scale-90"
                    onClick={() => handleSelect(coffee)}
                  >
                    <div className="relative flex justify-center items-center">
                      <Image
                        src={
                          selected === coffee
                            ? "/images/box-highlight.svg"
                            : "/images/box.svg"
                        }
                        alt="box"
                        width={100}
                        height={100}
                      />
                      <div
                        className={`absolute ${
                          coffee?.class
                        } hover:animate-bounce ${
                          selected === coffee ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        <Image
                          src="/images/cup.svg"
                          alt="cup"
                          width={coffee?.boxSize}
                          height={coffee?.boxSize}
                        />
                      </div>
                    </div>
                  </button>
                  <div className="md:text-left">
                    <div className="text-[22px] md:text-md">{coffee.name}</div>
                    <div className="text-[12px] md:text-[16px]">
                      {coffee?.value?.toString()} FTM
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center w-full flex-wrap max-w-[800px]">
            {loading && (
              <div className="mb-60 animate-pulse">
                <Image
                  src="/images/coffee.svg"
                  alt="coffee"
                  width={200}
                  height={200}
                  className="animate-spin"
                />
              </div>
            )}
            {!loading && memos.length === 0 && (
              <div className="flex flex-col justify-center items-center space-y-6 mb-32 bg-stone-800 px-24 py-12 rounded-2xl shadow-2xl m-4">
                <div className="relative w-[140px] h-[140px]">
                  <Image src="/images/sadcup.svg" layout="fill" alt="sad cup" />
                </div>
                <p className="text-lg">No memos yet</p>
              </div>
            )}
            {!loading &&
              memos.map((memo, index) => (
                <div
                  key={index}
                  className="bg-stone-800 p-6 rounded-2xl text-left text-sm space-y-2 shadow-2xl my-4 sm:mx-4"
                >
                  <div>
                    <div className="text-orange-300 text-[22px]">{memo[2]}</div>
                    <div className="leading-8">
                      sent a {handleSize(memo[4])} coffee
                      <span className="text-[12px] ml-1">
                        (
                        {Number(memo[4]) === 1
                          ? "1 FTM"
                          : Number(memo[4]) === 2
                          ? "3 FTM"
                          : "5 FTM"}
                        )
                      </span>
                    </div>
                  </div>

                  <div className="text-[12px] text-orange-300">
                    Message:
                    <div className="text-white">{memo[3]}</div>
                  </div>
                  <div className="text-[12px] text-orange-300">
                    Wallet:<div className="text-white">{memo[0]}</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>

      <ToastContainer
        containerId="toast-notification"
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <footer className="p-10">
        <div className="text-white">Skeletor Ⓒ 2022</div>
      </footer>
    </div>
  );
};

export default Home;
