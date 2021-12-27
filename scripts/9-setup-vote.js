import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const voteModule = sdk.getVoteModule(
  "0xFf3438223E8f11A91a61F07b48F3DfF2049eA056",
);

// This is our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x1F7f4BbD3Ff072B2BDBbb8D826DfB3c3deD622A6",
);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 10% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent10 = ownedAmount.div(100).mul(10);

    // Transfer 10% of the supply to our voting contract.
    await tokenModule.transfer(
      voteModule.address,
      percent10
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();

// ~/Buildspace-DAO-Starter$ node scripts/9-setup-vote.js 
// Your app address is: 0xEfD44Fe86772b34239269639b03Dc58fabd0736B
// Successfully gave vote module permissions to act on token module
// ✅ Successfully transferred tokens to vote module