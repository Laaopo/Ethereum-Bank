var ContractABI = [
  {
    inputs: [],
    name: "deposite",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawfunds",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getbalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getcontractbalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
var ContractAddress = "0x81B97f5eaa551240f0dfaBe2b1cFd301887E5d85";

//Buttons And Variable used In

var loginbutton = document.getElementById("connect_to_metamask");
var useraddress = document.getElementById("accountaddress");
var depositeinput = document.getElementById("depositeeth");
var depositebutton = document.getElementById("depositebutton");
var withdrawinput = document.getElementById("withdraweth");
var withdrawbutton = document.getElementById("withdrawbutton");
var getbalancebutton = document.getElementById("getbalance");
var balance = document.getElementById("balance");

//Contract Define
var address, web3, myContract;

//create function

//DOM Content Loader

document.addEventListener("DOMContentLoaded", async () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("Metamask is Installed");

    web3 = new Web3(window.ethereum);
    console.log("Web3 is Loaded", web3);

    myContract = new web3.eth.Contract(ContractABI, ContractAddress);
    console.log("Contract is Loaded", myContract);

    //ClickEvent

    loginbutton.addEventListener("click", async () => {
      var accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      address = accounts[0];
      useraddress.innerText = address;
      useraddress.classList.remove("d-none");
      loginbutton.classList.add("d-none");
      console.log(accounts);
      console.log(accounts[0]);
    });

    ethereum.on("accounttsChanged", async function (accounts) {
      //Time to reload interface with accounts[0]
      var accounts = await ethereum.request({ method: "eth_requestAccounts" }); //return an array of connected accounts
      address = accounts[0];
      useraddress.innerText = address;
    });

    depositebutton.addEventListener("click", async () => {
      console.log(depositeinput.value, address);

      //depositeinput value 10 ** 18 = 1000000000000000000 = 0.01

      //Deposite funds
      await myContract.methods
        .deposite()
        .send(
          { from: address, value: depositeinput.value },
          function (err, res) {
            console.log(res);
          }
        );
    });

    //withdraw funds
    withdrawbutton.addEventListener("click", async () => {
      await myContract.methods
        .withdraw(withdrawinput.value)
        .send({ from: address }, function (err, res) {
          console.log(res);
        });
    });

    //Know Yore Balance
    getbalancebutton.addEventListener("click", async () => {
      try {
        const balanceValue = await myContract.methods
          .getbalance()
          .call({ from: address });
        console.log(balanceValue);
        balance.innerText = balanceValue;
      } catch (error) {
        console.error(error);
      }
    });
  } else {
    alert("Please Install Metamask Wallet..!");
  }
});
