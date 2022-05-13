import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ToastContainer } from "react-toastify";
import { buy, getMemos, withdraw } from "../api/buyMeACoffee";
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
      value: 0.001,
      boxSize: 60,
      class: "top-[22%] left-[20%]",
    },
    {
      size: 2,
      name: "Medium",
      value: 0.003,
      boxSize: 70,
      class: "top-5 left-4",
    },
    {
      size: 3,
      name: "Large",
      value: 0.005,
      boxSize: 80,
      class: "top-4 left-3",
    },
  ]);
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(false);
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
    await withdraw();
  }

  const getReceivedMemos = useCallback(async () => {
    const allMemos = await getMemos();
    setMemos(allMemos);
  }, []);

  useEffect(() => {
    if (currentPage === 1) {
      getReceivedMemos();
    }
  }, [currentPage, getReceivedMemos]);

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-stone-900 font-['Poppins']">
      <Head>
        <title>Buy me a coffee</title>
        <meta name="description" content="Buy me a coffee ethereum app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full p-8 flex justify-center items-center space-x-10">
        <button
          className={`text-orange-200 hover:text-orange-400 ${
            currentPage === 0 && "border-b-2 border-orange-200"
          }`}
          onClick={() => setCurrentPage(0)}
        >
          Buy me a Coffee
        </button>
        <button
          className={`text-orange-200 hover:text-orange-400 ${
            currentPage === 1 && "border-b-2 border-orange-200"
          }`}
          onClick={() => setCurrentPage(1)}
        >
          Check Memos
        </button>{" "}
        {data && (
          <button
            className="bg-orange-400 p-4 text-white hover:bg-orange-500 rounded-2xl"
            onClick={handleWithdraw}
          >
            Withdraw Coffees
          </button>
        )}
        <ConnectButton />
      </div>
      <main className="text-white text-[30px] w-[740px] text-center">
        <div className="my-20 font-bold text-[64px]">
          {currentPage === 0 ? "Buy me a coffee" : "Memos received"}
        </div>
        <div className="flex flex-row justify-between items-center">
          {currentPage === 0 ? (
            <>
              <div className="flex flex-col justify-center items-center bg-stone-700  rounded-[38px] shadow-xl w-[400px] h-[400px]">
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
                  <div className="space-y-4 text-sm w-full p-10">
                    <Image
                      src="/images/coffee.svg"
                      alt="coffee"
                      width={80}
                      height={80}
                      className="hover:animate-spin"
                    />

                    <div className="p-4 bg-stone-900 hover:bg-stone-800 active:bg-stone-800 rounded-xl">
                      <input
                        type="text"
                        spellCheck={false}
                        className="bg-transparent outline-none w-full"
                        placeholder="Type your name"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="p-4 bg-stone-900 hover:bg-stone-800 active:bg-stone-800 rounded-xl">
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
                      }  p-4 rounded-3xl w-full shadow-xl`}
                      onClick={handleBuy}
                    >
                      Send a {selected.name} Coffee (
                      {selected?.value?.toString()} ETH)
                    </button>

                    <button
                      className="flex justify-center items-center w-full text-stone-900 hover:text-stone-800"
                      onClick={() => setSelected({} as CoffeeType)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center space-y-10">
                {coffeeTypes.map((coffee, index) => (
                  <div
                    className="flex flex-row items-center space-x-5"
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
                    <div className="text-left">
                      <div>{coffee.name}</div>
                      <div className="text-[16px]">
                        {coffee?.value?.toString()} ETH
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center w-full flex-wrap">
              {memos.map((memo, index) => (
                <div
                  key={index}
                  className="bg-black p-6 rounded-2xl text-left text-sm space-y-2 shadow-xl m-4"
                >
                  <div>
                    <span className="text-orange-300 text-[18px]">
                      {memo[2]}
                    </span>{" "}
                    sent a{" "}
                    <span className="border-b-2">{handleSize(memo[4])}</span>{" "}
                    coffee for
                    <span className="text-[12px] ml-1">
                      {Number(memo[4]) === 1
                        ? "0.001 ETH"
                        : Number(memo[4]) === 2
                        ? "0.003 ETH"
                        : "0.005 ETH"}
                    </span>
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
        </div>
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
      <footer className="fixed bottom-0 p-10">
        <div className="text-white">Skeletor Ⓒ 2022</div>
      </footer>
    </div>
  );
};

export default Home;
