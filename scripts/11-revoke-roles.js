import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0x1F7f4BbD3Ff072B2BDBbb8D826DfB3c3deD622A6",
);

(async () => {
  try {
    // Log the current roles.
    console.log(
      "👀 Roles that exist right now:",
      await tokenModule.getAllRoleMembers()
    );

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log(
      "🎉 Roles after revoking ourselves",
      await tokenModule.getAllRoleMembers()
    );
    console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");

  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury", error);
  }
})();

// ~/Buildspace-DAO-Starter$ node scripts/11-revoke-roles.js 
// Your app address is: 0xEfD44Fe86772b34239269639b03Dc58fabd0736B
// 👀 Roles that exist right now: {
//   admin: [ '0x99B325e95b4060865208cC159cCB9DA51EbbF299' ],
//   minter: [
//     '0x99B325e95b4060865208cC159cCB9DA51EbbF299',
//     '0xFf3438223E8f11A91a61F07b48F3DfF2049eA056'
//   ],
//   pauser: [ '0x99B325e95b4060865208cC159cCB9DA51EbbF299' ],
//   transfer: [ '0x99B325e95b4060865208cC159cCB9DA51EbbF299' ]
// }
// 🎉 Roles after revoking ourselves {
//   admin: [],
//   minter: [ '0xFf3438223E8f11A91a61F07b48F3DfF2049eA056' ],
//   pauser: [],
//   transfer: []
// }
// ✅ Successfully revoked our superpowers from the ERC-20 contract