import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type Props = {
  currentPage: number;
  setCurrentPage: any;
  data: any;
  handleWithdraw: any;
};

export default function Header({
  currentPage,
  setCurrentPage,
  data,
  handleWithdraw,
}: Props) {
  return (
    <>
      <div className="hidden xl:flex w-full px-8 py-4 justify-center items-center bg-stone-800">
        <div className="w-full flex flex-row justify-between items-center">
          <button
            onClick={() => setCurrentPage(0)}
            className="flex flex-row justify-between items-center text-xl text-orange-200 w-[244px]"
          >
            <Image src="/images/coffee.svg" width={70} height={70} alt="logo" />
            Buy me a coffee
          </button>
          <div className="flex flex-row items-center space-x-10">
            <button
              className={`text-orange-200 hover:text-orange-400 ${
                currentPage === 0 && "border-b-2 border-orange-200"
              }`}
              onClick={() => setCurrentPage(0)}
            >
              Send Coffee
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
        </div>
      </div>

      <div className="flex xl:hidden navbar bg-stone-800 text-orange-200">
        <div className="flex-1">
          <button
            onClick={() => setCurrentPage(0)}
            className="flex flex-row justify-between items-center normal-case text-lg w-[210px] ml-4"
          >
            <Image src="/images/coffee.svg" width={50} height={50} alt="logo" />
            Buy me a coffee
          </button>
        </div>

        {/* <ConnectButton /> */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-stone-800 rounded-box w-52"
          >
            <li>
              <button
                onClick={() => setCurrentPage(0)}
                className="bg-transparent hover:text-orange-400"
              >
                Send Coffee
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage(1)}
                className="bg-transparent hover:text-orange-400"
              >
                Check Memos
              </button>
            </li>
            {data && (
              <li className="pl-3">
                <button
                  className="bg-orange-400  mb-2 text-white hover:bg-orange-500 rounded-2xl hover:bg-orange-500 active:bg-orange-300 max-w-[159px]"
                  onClick={handleWithdraw}
                >
                  Withdraw Coffees
                </button>
              </li>
            )}
            <li className="pl-2">
              <ConnectButton />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
