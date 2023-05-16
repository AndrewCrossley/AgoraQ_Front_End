document.addEventListener('DOMContentLoaded', async () => {

    if (window.keplr) {
        await window.keplr.enable('secretdev-1');

        const offlineSigner = window.getOfflineSigner('secretdev-1');
        const accounts = await offlineSigner.getAccounts();

        console.log(accounts);

        const secretjsClient = new secretjs.SecretNetworkClient({
            url: "http://localhost:1317",
            chainId: "secretdev-1"
        });

        try {
            const query = await secretjsClient.query.compute.queryContract({
                contract_address: contract,
                code_hash: contractHash,
                query: { get_listings: {} },
            });
            console.log("Query results: ", query);
            console.log("Strigified results: ", JSON.stringify(query));

            let listings = query.listings.map(listingData => {
                let listing = listingData[1]; // Access the second element of the nested array
                return {
                    title: listing.title,
                    description: listing.description,
                    price: listing.price
                };
            });


            let listingsContainer = document.getElementById('Listing-Container');

            console.log('listingsContainer: ', listingsContainer);

            listings.forEach(listing => {
                let listingDiv = document.createElement('div');
                listingDiv.className = 'listing-item';

                let title = document.createElement('h2');
                title.className = 'Listing-Title heading-4';
                title.textContent = listing.title;

                let description = document.createElement('p');
                description.className = 'Listing-Description text-block-3';
                description.textContent = "Description: " + listing.description;

                let price = document.createElement('p');
                price.className = 'StaticPrice text-block-4';
                price.textContent = `Price: ${listing.price / 1000000} Silk`;

                let image = document.createElement('img');
                image.src = "images/placeholder-2.svg";
                image.className = "Listing-Image image";
                image.alt = "";
                image.loading = "lazy";
                image.width = "240";

                listingDiv.append(title, description, price, image);

                listingsContainer.append(listingDiv);
            });

        } catch (error) {
            console.log("Error: ", error);
            //queryOutput.innerHTML = "Error: " + error.message;
        }
    }
    else {
        alert('Please install Keplr extension');
    }
});


//// This would be the result of your SecretJS query
//let listings = [
//    { title: 'Listing 1', description: 'Description 1', price: '100' },
//];
//
//let listingsContainer = document.getElementById('listings');
//
//listings.forEach(listing => {
//    let listingDiv = document.createElement('div');
//    listingDiv.className = 'listing-item';
//
//    let title = document.createElement('h2');
//    title.textContent = listing.title;
//
//    let description = document.createElement('p');
//    description.textContent = listing.description;
//
//    let price = document.createElement('p');
//    price.textContent = `Price: ${listing.price}`;
//
//    listingDiv.append(title, description, price);
//
//    listingsContainer.append(listingDiv);
//});
