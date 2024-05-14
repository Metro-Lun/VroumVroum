// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

const footer = document.createElement('footer');

const a = document.createElement('a');
a.setAttribute('href', "https://creativecommons.org/licenses/by-nc-sa/4.0/");

const img = document.createElement('img');
img.setAttribute('src', "../../assets/by-nc-sa.png");
img.setAttribute('alt', "VroumVroum © 2024 by Melvyn BAUVENT, Mehdi BOURBON, Lucas DANIEL and Camille MORFIN is licensed under CC BY-NC-SA 4.0. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.");

const div = document.createElement('div');
const p = document.createElement('p');
p.innerHTML = "<strong>Melvyn BAUVENT, Mehdi BOURBON, Lucas DANIEL, Camille MORFIN</strong> - &copy 2024";

a.appendChild(img);
div.appendChild(p);

footer.appendChild(a);
footer.appendChild(div);

document.body.appendChild(footer);
