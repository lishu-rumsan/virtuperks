import hre from "hardhat";
interface Fixture {
    accessManagerV2: any;
    rumsanForwarder: any;
    rewardToken: any;
    deployer: any;
    signers: any;

}
export const deployRahatTokenFixture = async function (): Promise<Fixture> {
    console.log("deploying fixtures");
    const [deployer, ...signers] = await hre.ethers.getSigners();
    const rumsanForwarder = await hre.ethers.deployContract("ERC2771Forwarder", ['rumsanForwarder']);
    const accessManagerV2 = await hre.ethers.deployContract("AccessManagerV2", [deployer.address]);
    const rewardToken = await hre.ethers.deployContract("RewardToken",
        ["Rahat", "RTH", 0, 0, deployer.address, accessManagerV2.target, rumsanForwarder.target]);
    console.log('fixtures deployed')
    return {
        rumsanForwarder,
        accessManagerV2,
        rewardToken,
        deployer,
        signers
    };
}