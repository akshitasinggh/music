
let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let auto_play = document.querySelector('#auto');


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [{
		name: "AKHAR",
		path: "music/akhar lahoriye.mp3",
		
	},
	{
		name: "BAARI",
		path: "music/baari.mp3",
		
	},
    {
		name: "KHABBI SEAT",
		path: "music/khabbi seat.mp3",
		
	},
    {
        
		name: "SAJJAN-RAAZI",
		path: "music/sajjan-raazi.mp3",
		
	},
	{
		name: "SOHNE SOHNE",
		path: "music/sohne sohne.mp3",
		
	}
];



function load_track(index_no) {
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;

	track.load();

	timer = setInterval(range_slider, 1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);



function mute_sound() {
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}



function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}



function reset_slider() {
	slider.value = 0;
}


function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa-solid fa-2x fa-circle-pause" aria-hidden="true"></i>';
}


function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa-solid fa-2x fa-circle-play" aria-hidden="true"></i>';
}


function next_song() {
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}



function previous_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}




function volume_change() {
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}


function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}


function autoplay_switch() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		auto_play.style.background = " #f38299e3";
	}
}


function range_slider() {
	let position = 0;

	
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	
	if (track.ended) {
		play.innerHTML = '<i class="fa-solid fa-2x fa-circle-play" aria-hidden="true"></i>';
		if (autoplay == 1) {
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}
}
