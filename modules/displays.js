function displayAlbum(data){

    console.log(data);
    let content = document.getElementById('content');
    content.innerHTML = "";
    content.scrollTop = 0;
    let header = createHeader('','header-album');

        let cover = createImg(data.images[1].url,'','cover');
        header.appendChild(cover);

        let infos = createDiv('','infos-album','');
            let title = createTitle('h1','',data.name)
            infos.appendChild(title);
            let artist = createParagraph('','',"Par : "+data.artists[0].name+"");
            infos.appendChild(artist);
            let stats = createParagraph('','',data.release_date.split("-")[0]+" • "+data.total_tracks+' titres');
            infos.appendChild(stats);
        header.appendChild(infos);
    content.appendChild(header);

    let tracksContainer = createDiv('','track-list');
        for(current of data.tracks.items){
            let item = createDiv(current.id,'track');
                let trackNumber = createDiv('','track-number','<p>'+current.track_number+'</p>');
                item.appendChild(trackNumber);
                let title = createDiv('','track-title','<p>'+current.name+'</p>');
                item.appendChild(title);
                let duration = createDiv('','track-duration');
                let durationHms = msTominSec(current.duration_ms);
                if(durationHms.h == 0) duration.innerHTML ='<p>'+durationHms.m+':'+durationHms.s+'</p>';
                else duration.innerText = '<p>'+durationHms.h+':'+durationHms.m+':'+durationHms.s+'</p>';
                item.appendChild(duration);
            tracksContainer.appendChild(item);  
        }
    content.appendChild(tracksContainer);
    }

function displayDiscography(data){

    const content = document.getElementById('content');
    content.innerHTML="";
    window.scrollTo(0, 0);
    console.log(data);
    let bandName = createTitle('h1','',data.items[0].artists[0].name);
    content.appendChild(bandName);

    let albumList = createDiv('albums-list','');
	content.appendChild(albumList);
	for(current of data.items){
		//Parent div containing cover and release info
		let item = createDiv(current["id"],'album-prez');
        item.addEventListener('click',function(event){
            let url = '/album/'+this.id;
            window.location.hash = url;
        });
		//Cover image
		let img = createImg(current.images[1].url,'','cover-mosaic');
		item.appendChild(img);
		//Title and date
		let title = createParagraph('','',current.name+"<span class='date'>("+current.release_date.split('-')[0]+")</span>");
		item.appendChild(title);

		albumList.appendChild(item);
	}
}
function displayIndex(){
    
    let content = document.getElementById('content');
    content.innerHTML = '';
    window.scrollTo(0, 0);

    let formulaire = document.createElement("form");
    formulaire.id="searching";

        let searchBar = document.createElement('input');
        searchBar.setAttribute('type','text');
        searchBar.setAttribute('name','query');
        searchBar.autocomplete="off";
        searchBar.id = 'searchBar';
        searchBar.placeholder = "Enter an artist here"
        searchBar.addEventListener('keydown',function(event){
            
            if(event.key === 'Enter'){
                event.preventDefault();
                let query = searchBar.value;
                let url = encodeURI('/search/artist/'+query);
                window.location.hash=url;
            }
        })

        formulaire.appendChild(searchBar);

        let button = document.createElement('button');
        button.setAttribute('name', 'search');
        button.setAttribute('type', 'button');
        button.id = "searchButton";
        let buttonText = document.createTextNode('Search');
        button.appendChild(buttonText);
        formulaire.appendChild(button);
        content.appendChild(formulaire);

        button.addEventListener('click',function(event){
            let query = searchBar.value;
            let url = encodeURI('/search/artist/'+query);
            window.location.hash=url;
        })
}

function displayResults(data){
    
    displayIndex(); 
    let content = document.getElementById('content');
    let results = document.createElement('div');
    results.id = "search-results";
    
    for (current of data.artists.items){
        let resultItem = document.createElement('div');
            resultItem.classList.add('search-results-item');
            resultItem.id = current.id;
                let image = document.createElement('img');
                image.classList.add('image-artist')
                if(current.images.length > 0){
                     image.src = current.images[2].url;
                }
                else image.src="./images/noPictureArtist.png";
            resultItem.appendChild(image);
                let name = document.createElement('div');
                name.innerText = current.name;
            resultItem.appendChild(name);
        results.appendChild(resultItem);
        resultItem.addEventListener('click',function(event){
            url = 'artist/'+this.id;
            window.location.hash = url;
        })
    }
    content.appendChild(results);
}