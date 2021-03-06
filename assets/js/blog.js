var blogOwnerUsername = "Tresre";


var request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/' + blogOwnerUsername + '/blog/issues', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(post => {
      if (post.user.login !== blogOwnerUsername) {
      	return;
      }
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      container.appendChild(card);

      const h1 = document.createElement('h1');
      h1.textContent = post.title;
      card.appendChild(h1);
	    
      const logo = document.createElement('img');
      avatar = post.user.avatar_url;
      logo.src = avatar;
      logo.style.position = "relative";
      logo.style.display = "block";
      logo.style.width = "70px";
      logo.style.borderRadius = "100px";
      logo.style.marginLeft = "10px";
      logo.style.top = "-73px";
      card.appendChild(logo);
      
      const h2 = document.createElement('h2');
      h2.textContent = post.user.login;
      card.appendChild(h2);
      
      const h3 = document.createElement('h3');
      date = post.created_at;
      date = date.replace("Z", "");
      const splitDate = date.split("T");
      
      const splitDay = splitDate[0].split("-");
      day = (splitDay[1] + "/" + splitDay[2] + "/" + splitDay[0]);
      
      time = splitDate[1].substring(0, splitDate[1].length - 3);
      const hour = time.split(":");
      hour[0] = (hour[0] - 4);
      if (hour[0] >= 12) {
      	var ampm = "pm";
      	if (hour[0] > 12) {
          hour[0] = (hour[0] - 12);
      	}
      } else {
      	var ampm = "am";
      }
      
      h3.textContent = (day + " " + hour[0] + ":" + hour[1] + "" + ampm);
      card.appendChild(h3);

      const p = document.createElement('p');   
      body = post.body;
      var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
      const linkslist = body.match(urlPattern);
      if (linkslist !== null) {
        for (var i = 0; i < (linkslist.length); i++) {
          var loopValue = String(linkslist[i]);
          if (loopValue.includes(".png") || loopValue.includes(".jpg") == true) {
            body = body.replace(linkslist[i], '');
          }
        }
      } 
      p.textContent = body;
      card.appendChild(p);
      
      if (linkslist !== null) {
        for (var i = 0; i < (linkslist.length); i++) {
          var loopValue = String(linkslist[i]);
          piclink = "";
          if (loopValue.includes(".png") || loopValue.includes(".jpg") == true) {
            piclink = linkslist[i];
    	    const pic = document.createElement('img');
            pic.src = piclink;
            pic.style.position = "relative";
            pic.style.display = "block";
            pic.style.maxWidth = "70%";
            pic.style.minWidth = "30%";
            pic.style.margin = "auto";
            pic.style.marginTop = "-10px";
            pic.style.borderRadius = "5px";
            pic.style.marginBottom = "20px";
            if (piclink !== "") {card.appendChild(pic);}
          }
        }
      }
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `An Error Has Occured`;
    app.appendChild(errorMessage);
  }
}

request.send();


function linkify(input) {
  var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
  const linkslist = input.match(urlPattern);
  for (var i = 0; i < linkslist.length; i++) {
    if (linkslist[i].includes(".png") || linkslist[i].includes(".jpg") == false) {
      return input.replace(urlPattern, '<a href="$&">$&</a>');
    }
  }
}


var today = new Date();
let year = today.getFullYear();
document.getElementById("year").innerHTML = year;

document.title = (blogOwnerUsername + "'s Blog");

function autoScroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

autoScroll();
