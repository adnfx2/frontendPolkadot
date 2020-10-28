// polka networks
import substrateLogo from "../assets/hash-img.png";
import polkadotLogo from "../assets/polkadot-logo.png";
import kusamaLogo from "../assets/kusama.png";
import moonbeamLogo from "../assets/moonbeam-logo.png";

export const networks = [
  {
    name: "SubstrateDev",
    serviceId: "Development",
    webSocket: "wss://dev-node.substrate.dev",
    color: "#18FFB2",
    logo: substrateLogo,
  },
  {
    name: "Polkadot",
    serviceId: "Polkadot",
    webSocket: "wss://rpc.polkadot.io",
    color: "#E6007A",
    logo: polkadotLogo,
  },
  {
    name: "Kusama",
    serviceId: "Kusama",
    webSocket: "wss://cc3-5.kusama.network",
    color: "#000",
    logo: kusamaLogo,
  },
  {
    name: "Moonbeam",
    serviceId: "Moonbase Alpha",
    webSocket: "wss://wss.testnet.moonbeam.network",
    color: "#0D1126",
    logo: moonbeamLogo,
  },
];
