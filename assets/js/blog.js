var request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/Tresre/blog/issues', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(post => {
      if (post.user.login !== "Tresre") {
      	return;
      }
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = post.title;
      
      const h2 = document.createElement('h2');
      h2.textContent = post.user.login;
      
      const h3 = document.createElement('h3');
      date = post.created_at;
      date = date.replace("Z", "");
      const splitDate = date.split("T");
      
      const splitDay = splitDate[0].split("-");
      day = (splitDay[1] + "/" + splitDay[2] + "/" + splitDay[0]);
      
      time = splitDate[1].substring(0, splitDate[1].length - 3);
      const hour = time.split(":");
      hour[0] = (hour[0] - 4);
      if (hour[0] > 12) {
      	var ampm = "pm";
        hour[0] = (hour[0] - 12);
      } else {
      	var ampm = "am";
      }
      
      h3.textContent = (day + " " + hour[0] + ":" + hour[1] + "" + ampm);

      const p = document.createElement('p');
      p.textContent = linkify(post.body);
      
      const logo = document.createElement('img');
      avatar = post.user.avatar_url
	  logo.src = avatar;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(logo);
      card.appendChild(h2);
      card.appendChild(h3);
      card.appendChild(p);
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
  var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
  return input
    .replace(urlPattern, '<a href="$&">$&</a>')
    .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
    .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
}


var today = new Date();
let year = today.getFullYear();
document.getElementById("year").innerHTML = year;

function autoScroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

autoScroll();
