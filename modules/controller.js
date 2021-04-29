function listenHash(){
    let url = window.location.hash;
    url = url.slice(1) || '/';
    if(url == "/"){
        if(sessionStorage.getItem('access_token') === null){
            clientId = localStorage.getItem('clientId');
            let url = authentification(clientId);
            window.location.href = url;
        }
        else displayIndex();
    }
    else{
        let parts = url.split('/').filter((elt)=> {return (elt !== '')});
        switch(parts[0]){
            case 'artist':
                SpotifyApi.getDiscography(parts[1], displayDiscography);
                break;
            case 'search':
                SpotifyApi.search(parts[1],parts[2],displayResults);
                break;
            case 'album':
                SpotifyApi.getAlbum(parts[1],displayAlbum);
                break;
            default :
                throw new Error("Not a valid url");
        }
    }
}
