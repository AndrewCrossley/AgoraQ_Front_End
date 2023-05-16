// need to update these!
const contract = "secret1uk0s4wav7hvy9rg6nscspztc3eqwp4fg55035y";
const contractHash = "2c213b7e0c6894557e32e4b0e267534e6e5985bad4c892cd8307ee072dc67057";
// add stablecoin contract! and hash!

//const queryButton = document.getElementById("queryContract");
const keplrButton = document.getElementById("openKeplr");

keplrButton.addEventListener('click', async () => {
    if (window.keplr) {
        await window.keplr.enable('secretdev-1');

        const offlineSigner = window.getOfflineSigner('secretdev-1');
        const accounts = await offlineSigner.getAccounts();

        console.log(accounts);

        const secretjs = new window.secretjs.SecretNetworkClient({
            url: "http://localhost:1317",
            chainId: "secretdev-1"
        });
    }
    else {
        alert('Please install Keplr extension');
    }
});
