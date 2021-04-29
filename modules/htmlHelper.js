function createDiv(id, className,innerHTML=''){
    let div = document.createElement('div');
    if(id != '') div.id = id;
    if(className != '') div.classList.add(className);
    div.innerHTML = innerHTML;
    return div;
}
function  createParagraph(id, className, innerHTML){
    let p = document.createElement('p');
    if(id != '') p.id = id;
    if(className != '') p.classList.add(className)  ;
    p.innerHTML = innerHTML;
    return p;
}
function createImg(src, id, className,alt=''){
    let img = document.createElement('img');
    img.src = src;
    if(id != '')img.id = id;
    if(alt != '')img.alt = alt;
    if(className != '')img.classList.add(className);
    return img;
}
function createTitle(type,className,text){
    let h;
    switch (type) {
        case 'h1':
        h = document.createElement(type);
        break;
        case 'h2':
            h = document.createElement(type);
            break;
        case 'h3':
            h = document.createElement(type);
        break;
        case 'h4':
            h = document.createElement(type);
            break;
        case 'h5':
            h = document.createElement(type);
            break;
        case 'h6':
            h = document.createElement(type);
        default:
        console.log(type+' is not a valid title balise');
        return false;
    }
    if(className != '')h.classList.add(className);
    h.innerText = text;
    return h;
}
function createHeader(id, className,innerHTML=''){
    let header = document.createElement('header');
    if(id != '') header.id = id;
    if(className != '') header.classList.add(className);
    header.innerHTML = innerHTML;
    return header;
}
