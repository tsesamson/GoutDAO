import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x8b3087fAD255c3Edb994eBd1aCCFE1Ec6D99a73b",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Ibuprofen structure",
        description: "This Ibuprofen NFT will give you access to GoutDAO!",
        image: readFileSync("scripts/assets/ibuprofen.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()