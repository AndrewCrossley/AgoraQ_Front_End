// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Get the submit button and add a click event listener
    const submitCountryBtn = document.getElementById("submitCountry");
    submitCountryBtn.addEventListener('click', async () => {
        // Get the selected country from the dropdown
        const dropdown = document.getElementById("Country-Selection");
        const selectedCountry = dropdown.value;

        // Your existing code
        if (window.keplr) {
            await window.keplr.enable('secretdev-1');

            const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino('secretdev-1');
            const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

            //const offlineSigner = window.getOfflineSigner('secretdev-1');
            //const accounts = await offlineSigner.getAccounts();

            //console.log(accounts);

            const secretjsClient = new secretjs.SecretNetworkClient({
                url: "http://localhost:1317",
                chainId: "secretdev-1",
                wallet: keplrOfflineSigner,
                walletAddress: myAddress,
                encryptionUtils: window.keplr.getEnigmaUtils('secretdev-1'),
            });

            tx = await secretjsClient.tx.compute.executeContract(
                {
                    sender: myAddress,
                    contract_address: contract,
                    code_hash: contractHash,
                    msg: { create_seller: { shipping_country: selectedCountry } },
                    sentFunds: [],
                },
                {
                    gasLimit: 100_000,
                }
            );
            window.location.href = "listing.html";
        }
    });
});
