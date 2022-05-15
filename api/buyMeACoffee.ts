import { ethers } from "ethers";
import ABI from "../utils/abi.json";
import Notification from "../components/Notification";

const CONTRACT = "0x0a409e1f1C77B0a193042638dEadCeaB929bE5e8"

type buyProps = {
  name: string,
  message: string,
  value: number,
  type: number
}

export async function buy({name, message, value, type}: buyProps) {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          CONTRACT,
          ABI,
          signer
        );

        console.log("buying coffee..")
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "anon",
          message ? message : "Enjoy your coffee!",
          type,
          {value: ethers.utils.parseEther(value.toString())}
        );

        Notification({
          type: "",
          title: "Transaction Submited",
          message: "Your coffee was successfully submitted.",
          link: `https://goerli.etherscan.io/tx/${coffeeTxn.hash}`,
        });

        await coffeeTxn.wait();

        Notification({
          type: "success",
          title: "Thank you!",
          message: "Your coffee was successfully sent.",
          link: `https://goerli.etherscan.io/tx/${coffeeTxn.hash}`,
        });
        

        console.log("mined ", coffeeTxn.hash);
      }
    } catch (error: any) {
      console.log(error);
      Notification({
        type: "error",
        title: "Transaction failure",
        message: error.error ? error.error.message : error.message,
        link: "",
      });
    }
}

export async function getMemos() {    
  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_URL, "goerli");
    const buyMeACoffee = new ethers.Contract(CONTRACT, ABI, provider);
    const memos = await buyMeACoffee.getMemos();
    return memos;
  } catch (error) {
    console.log(error);
  }
}

export async function withdraw() {
  try {
    const { ethereum } = window;
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      const buyMeACoffee = new ethers.Contract(
        CONTRACT,
        ABI,
        signer
      );
      
      console.log("withdrawing..");
      const coffeeTxn = await buyMeACoffee.withdrawtips();
      
      Notification({
        type: "",
        title: "Transaction Submited",
        message: "Your withdraw was successfully submitted.",
        link: `https://goerli.etherscan.io/tx/${coffeeTxn.hash}`,
      });

      console.log(coffeeTxn);

      await coffeeTxn.wait();

      Notification({
        type: "success",
        title: "Transaction confirmed, Thanks!",
        message: "Your withdraw was successfully confirmed.",
        link: `https://goerli.etherscan.io/tx/${coffeeTxn.hash}`,
      });

      console.log("Coffees withdrawed");
    } else {
      console.log("Metamask is not connected");
    }
    
  } catch (error: any) {
    Notification({
      type: "error",
      title: "Transaction failure",
      message: error.error ? error.error.message : error.message,
      link: "",
    });
  }
}