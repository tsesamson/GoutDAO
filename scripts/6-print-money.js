import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule = sdk.getTokenModule(
  "0x1F7f4BbD3Ff072B2BDBbb8D826DfB3c3deD622A6",
);

(async () => {
  try {
    // What's the max supply you want to set? 1,000,000 is a nice number!
    const amount = 1_000_000_000_000;
    // We use the util function from "ethers" to convert the amount
    // to have 18 decimals (which is the standard for ERC20 tokens).
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    
    // Print out how many of our token's are out there now!
    console.log(
      "✅ There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$GOUT in circulation",
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();

// ~/Buildspace-DAO-Starter$ node scripts/6-print-money.js 
// Your app address is: 0xEfD44Fe86772b34239269639b03Dc58fabd0736B
// ✅ There now is 1000000000000.0 $GOUT in circulation