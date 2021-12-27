import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xEfD44Fe86772b34239269639b03Dc58fabd0736B");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // The collection's name, ex. CryptoPunks
      name: "GoutDAO Membership",
      // A description for the collection.
      description: "A DAO for anyone suffering from gout.",
      // The image for the collection that will show up on OpenSea.
      image: readFileSync("scripts/assets/gout.png"),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()

/*
~/Buildspace-DAO-Starter$ node scripts/2-deploy-drop.js 
Your app address is: 0xEfD44Fe86772b34239269639b03Dc58fabd0736B
✅ Successfully deployed bundleDrop module, address: 0x8b3087fAD255c3Edb994eBd1aCCFE1Ec6D99a73b
✅ bundleDrop metadata: {
  metadata: {
    name: 'GoutDAO Membership',
    description: 'A DAO for anyone suffering from gout.',
    image: 'https://cloudflare-ipfs.com/ipfs/bafkreiae22qevjbwfk67akhhc75cwr225iocksemfmleup3givhhha3zyi',
    primary_sale_recipient_address: '0x0000000000000000000000000000000000000000',
    uri: 'ipfs://bafkreib3o2pluqbad65stajvxaixnyihzf4rtfkrh7xkxwqhbofczolkva'
  },
  address: '0x8b3087fAD255c3Edb994eBd1aCCFE1Ec6D99a73b',
  type: 11
}
*/