import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0xEfD44Fe86772b34239269639b03Dc58fabd0736B");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: "GoutDAO Governance Token",
      // What's your token's symbol? Ex. "ETH"
      symbol: "GOUT",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();

// Your app address is: 0xEfD44Fe86772b34239269639b03Dc58fabd0736B
// ✅ Successfully deployed token module, address: 0x1F7f4BbD3Ff072B2BDBbb8D826DfB3c3deD622A6