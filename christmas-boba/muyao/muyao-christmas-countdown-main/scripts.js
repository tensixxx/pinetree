function radian_to_deg(radians){
    return radians * (180/Math.PI);
}

let time = new Date();
let year = time.getFullYear();
const christmas = new Date("Dec 25," + year +" 0:00:00");
let time_until = christmas-time;

let start_time = Math.random();
let pos = Math.random();

const snow_styles = document.getElementById("snow_styles");

const flakes = 50;
let snow = [];
let css_snow = [];

const shooting_star = document.getElementById("star-container");

let shooting_star_startx = Math.random() * 10;
let shooting_star_starty = Math.random() * 10;
let shooting_star_endx = Math.random() * 10;
let shooting_star_endy = Math.random() * 50;

const shooting_star_image = document.getElementById("shooting-star");

let shooting_star_angle = radian_to_deg(Math.atan((shooting_star_endx-shooting_star_startx)/(shooting_star_endy-shooting_star_starty)));

const bg_music_button = document.querySelector("#background-music-button");

for (let i=0; i<flakes; i++){
    let new_snowflake = document.querySelector('#snow0').cloneNode(true);
    new_snowflake.setAttribute('id', "snow" + i);
    new_snowflake.setAttribute('class', "snow");
    document.querySelector('#snowarea').appendChild(new_snowflake);

    start_time = Math.random()*3;
    snow.push(document.getElementById("snow" + i));
    css_snow.push(document.querySelector("#snow" + i));
    css_snow[i].style.setProperty("--delay", start_time + "s");
}

if ((christmas - time) < 0){
    year ++;
    const christmas = new Date("Dec 24," + year +" 23:59:59");
}
    

function update_time(){
    time = new Date();
    time_until = christmas-time;
    let months = Math.floor(time_until/259200000);
    time_until -= months * 259200000;
    let days = Math.floor(time_until/86400000);
    time_until -= days * 86400000;
    let hours = Math.floor(time_until/3600000);
    time_until -= hours * 3600000;
    let minutes = Math.floor(time_until/60000);
    time_until -= minutes * 60000;
    let seconds = Math.floor(time_until/1000);

    document.getElementById("mo").innerHTML = months;
    document.getElementById("d").innerHTML = days;
    document.getElementById("h").innerHTML = hours;
    document.getElementById("mi").innerHTML = minutes; 
    document.getElementById("s").innerHTML = seconds;
    document.getElementById("countdown-head").innerHTML = "Time until Christmas " + year + ":";
}

function update_snow_pos(i){
    pos = Math.random()*100;
    css_snow[i].style.setProperty('--pos', pos + 'vw');
}

function toggle_music_mode(){
    let music_player = document.getElementById("background-music");
    let music_button = document.getElementById("background-music-button");
    if (music_player.paused){
        music_player.play();
	music_button.innerHTML = "Music Playing";
    }
    else{
	music_player.pause();
	music_button.innerHTML = "Music Paused";
    }
}

function randomize_shooting_star(){
    let rand = Math.random() * 100;
    shooting_star_startx = 0;
    shooting_star_starty = rand;
 
    shooting_star_endx = rand;
    shooting_star_endy = 0;
    
    let dist = Math.sqrt((shooting_star_endx - shooting_star_startx)**2+(shooting_star_starty - shooting_star_endy) **2)

    while (dist < 141){
	shooting_star_startx -= 1;
        shooting_star_starty += 1;
        dist = Math.sqrt((shooting_star_endx - shooting_star_startx)**2+(shooting_star_starty - shooting_star_endy) **2)

    }

    console.log(dist*0.05);
    shooting_star.style.setProperty("--start-x", shooting_star_startx + "vmax");
    shooting_star.style.setProperty("--start-y", shooting_star_starty + "vmax");
    shooting_star.style.setProperty("--end-x", shooting_star_endx + "vmax");
    shooting_star.style.setProperty("--end-y", shooting_star_endy + "vmax");


}

window.setInterval(update_time, 10);
for (let i=0; i<flakes; i++){
    snow[i].addEventListener("animationiteration", function(){update_snow_pos(i)});
}
shooting_star.addEventListener("animationiteration", randomize_shooting_star);