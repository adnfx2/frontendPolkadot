// polka react hooks
import { useEffect, useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { toast } from "react-toastify";

function isHex(num) {
  return Boolean(num.match(/^0x[0-9a-f]+$/i));
}

export const useProvider = (network) => {
  const [api, setApi] = useState(null);
  const { webSocket } = network;

  useEffect(() => {
    const connectSocket = async () => {
      try {
        const provider = new WsProvider(webSocket);
        const _api = await ApiPromise.create({ provider });
        console.log(`Api from ${network.name} created`);
        setApi(_api);
      } catch (e) {
        console.error("error useProvider");
        setApi(null);
      }
    };

    connectSocket();

    return () => {
      setApi(null);
      console.log(`Api from ${network.name} deleted`);
    };
  }, [webSocket]);

  return api;
};

export const useBlockListener = (api, network) => {
  const [block, addBlock] = useState("");

  useEffect(() => {
    if (!api) return;

    let stopListeningBlocks;

    const listenBlocks = async () => {
      try {
        stopListeningBlocks = await api.rpc.chain.subscribeNewHeads(
          (header) => {
            const blockNumber = header.number.toNumber();
            addBlock(blockNumber);
          }
        );
        console.log(`Listening blocks from --> ${network.name} <--`);
      } catch (e) {
        addBlock("");
        console.error("error useBlockListener");
      }
    };

    listenBlocks();

    return () => {
      addBlock("");
      if (stopListeningBlocks) {
        stopListeningBlocks();
        console.log(`Stopped listening blocks from --> ${network.name} <--`);
      }
    };
  }, [api]);
  return block;
};

const initialBlockData = {
  blockNumber: null,
  blockHash: null,
  parentHash: null,
  stateRoot: null,
  extrinsicsRoot: null,
};
export const useQueryBlock = (api, block) => {
  const [blockData, setBlockData] = useState(initialBlockData);

  useEffect(() => {
    if (!api || !block) return;

    const getBlock = async () => {
      try {
        var blockHash;
        if (!isHex(block)) {
          const rawHash = await api.rpc.chain.getBlockHash(block);
          blockHash = rawHash.toString(16);
        } else {
          blockHash = block;
        }

        const rawBlock = await api.rpc.chain.getHeader(blockHash);

        const blockInfo = {
          blockNumber: rawBlock.number.toNumber(),
          blockHash,
          parentHash: rawBlock.parentHash.toHuman(),
          stateRoot: rawBlock.stateRoot.toHuman(),
          extrinsicsRoot: rawBlock.extrinsicsRoot.toHuman(),
        };

        setBlockData(blockInfo);
      } catch (e) {
        console.error("error useQueryBlock");
        toast.error("Block not found");
        setBlockData(initialBlockData);
      }
    };

    getBlock();

    return () => {
      setBlockData(initialBlockData);
    };
  }, [api, block]);

  return blockData;
};
