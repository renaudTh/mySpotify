function authentification(clientId){

    let url = "https://accounts.spotify.com/authorize?";
    url += 'client_id='+clientId;
    url += '&response_type=code';
    url += '&redirect_uri='+encodeURI('http://127.0.0.1:5500/auth.html');
    url += '&scope=user-read-private';
    url += '&show_dialog=true';
    return url;
}
async function getTokens(authCode){

    clientSecret = localStorage.getItem('clientSecret');
    clientId = localStorage.getItem('clientId');
    
    let resp = await fetch('https://accounts.spotify.com/api/token',
    {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic '+btoa(clientId+':'+clientSecret)
        },
        body : 'grant_type=authorization_code&code='+authCode+'&redirect_uri='+encodeURI('http://127.0.0.1:5500/auth.html')
    });
    let data = await resp.json();
    return data;
}

class SpotifyApi{

    _accessToken = sessionStorage.getItem('access_token');
    _refreshToken = sessionStorage.getItem('refresh_token');

    static async getDiscography(artistId, display){

        const token = sessionStorage.getItem('access_token');

        const url = 'https://api.spotify.com/v1/artists/'+artistId+'/albums?include_groups=album&market=FR&limit=50';

        const rep = await fetch(url, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer '+token}
        });

        const data = await rep.json();  
        display(data);
    }

    static async getAlbum(albumId, display){
        const token = sessionStorage.getItem('access_token');

        const url = 'https://api.spotify.com/v1/albums/'+albumId+'?market=FR';

        const rep = await fetch(url, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer '+token}
        });

        const data = await rep.json();  
        display(data);
    }

    static async search(type, query, display){
        const token = sessionStorage.getItem('access_token');
    
        const url = 'https://api.spotify.com/v1/search?q='+query+'&type='+type;
    
        const rep = await fetch(url, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer '+token}
        });
    
        const data = await rep.json();  
        display(data);
    }
}


