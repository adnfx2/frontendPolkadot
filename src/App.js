import React, { useState } from "react";
import colorApi from "color";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { networks } from "./utils/networkProviders.js";
import { ToastContainer } from "react-toastify";
import {
  useProvider,
  useBlockListener,
  useQueryBlock,
} from "./utils/polkaHooks";
import { createUseStyles } from "react-jss";
import Selector from "./components/Selector";
import LatestBlock from "./components/LatestBlock";
import SearchBlock from "./components/SearchBlock";
import BlockInfo from "./components/BlockInfo";
import hackathon from "./assets/helloWorldPolkadot.png";

const defaultNetwork = networks[1];

const useStyles = createUseStyles({
  appWrapper: {
    position: "relative",
    height: "100%",
    overflow: "hidden",
  },
  appHeader: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    zIndex: 1000,
    width: "100%",
    height: "4rem",
    padding: ".25rem",
    backgroundColor: (color) => color,
  },
  appContent: {
    padding: "4rem 1rem 3.5rem",
    width: "100%",
    height: "100%",
    backgroundColor: (color) => colorApi(color).lightness(95).hex(),
    "& .responsive": {
      display: "grid",
      gridGap: "1rem",
      maxWidth: "800px",
    },
  },
  appImage: {
    justifySelf: "center",
    width: 300,
    height: "auto",
    overflow: "hidden",
  },
});

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [networkSelected, setNetwork] = useState(defaultNetwork);

  const _color = networkSelected.color;
  const style = useStyles(_color);

  const api = useProvider(networkSelected);
  const latestBlock = useBlockListener(api, networkSelected);
  const blockSearched = useQueryBlock(api, searchValue, networkSelected);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleChangeNetwork = (index) => {
    const _networkSelected = networks[index];
    setNetwork(_networkSelected);
    setSearchValue("");
  };

  return (
    <div className={style.appWrapper}>
      <div className={style.appHeader}>
        <Selector
          options={networks}
          defaultValue={networkSelected}
          selectorHandler={handleChangeNetwork}
          disabled={!api}
        />
      </div>
      <div className={style.appContent}>
        <div className="responsive">
          <LatestBlock blockNumber={latestBlock} />
          <SearchBlock
            color={_color}
            handleSearch={handleSearch}
            disabled={!api}
          />
          <BlockInfo blockInfo={blockSearched} color={_color} />
          <img className={style.appImage} src={hackathon} alt="hackathon" />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
