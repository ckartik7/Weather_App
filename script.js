const app= document.querySelector('.main');
const form= document.form;
const temp= document.querySelector('.temp');
const date1= document.querySelector('.date');
const time1= document.querySelector('.time');
const name1= document.querySelector('.name');
const desc= document.querySelector('.desc');
const icon= document.querySelector('.icon');
const cloud= document.querySelector('.cloud');
const humidity= document.querySelector('.humidity');
const wind= document.querySelector('.wind');
const loc= document.querySelector('.location');
const search= document.querySelector('.search');
const button= document.querySelector('.submit');
const cities= document.querySelectorAll(".city");
const feelslike= document.querySelector(".feelslike");

let cityInput= "London";

cities.forEach(function(city){
    city.addEventListener('click', function(e){
        cityInput= e.target.innerHTML;
        fetchdata();
    });
})

form.addEventListener('submit',function(e){
    if(search.value.length == 0){
        alert("Please Enter a proper city name");
    }
    else{
        cityInput= search.value;
        fetchdata();
        search.value='';
    }
    e.preventDefault();
});

function day(day,month,year){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[new Date('${day}/${month}/${year}').getDay()];
};

function fetchdata(){
    fetch('https://api.weatherapi.com/v1/current.json?key=1e18bc81f5084826b4c112954232203&q='+ cityInput)
    .then(response=> response.json())
    .then(data=>{
        temp.innerHTML= data.current.temp_c+ "&#176;";
        desc.innerHTML= data.current.condition.text;
        const date= data.location.localtime;
        const y= date.substr(0,4);
        const m= date.substr(5,2);
        const d= date.substr(8,2);
        const time= date.substr(11);

        date1.innerHTML= d+'/'+m+'/'+y;
        time1.innerHTML=time;


        name1.innerHTML =data.location.name;

        const iconId= data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);

        icon.src= "icons/"+iconId;

        cloud.innerHTML= data.current.cloud+"%";
        humidity.innerHTML= data.current.humidity+"%";
        wind.innerHTML= data.current.wind_kph+"km/h";
        feelslike.innerHTML= data.current.feelslike_c+"&#176;";

        let timeofday;

        const code= data.current.condition.code;

        if(data.current.is_day == 0){
            timeofday= "night";
        }
        else{
            timeofday="day";
        }

        if(code == 1000){

            app.style.backgroundImage= 'url(images/'+timeofday+'/clear.jpg)';

            button.style.background= "#e5ba92";
            if(timeofday == "night"){
                button.style.background= "#181e27";
            }
        }

        else if(
            code == 1003||
            code == 1006||
            code == 1009||
            code == 1030||
            code == 1069||
            code == 1087||
            code == 1135||
            code == 1273||
            code == 1276||
            code == 1279||
            code == 1282
        ){
            app.style.backgroundImage= 'url(images/'+timeofday+'/cloudy.jpg)';
            button.style.background= "#fa6d1b";
            if(timeofday == "night"){
                button.style.background= "#181e27";
            }
        }
        else if(
            code == 1063||
            code == 1069||
            code == 1072||
            code == 1150||
            code == 1153||
            code == 1180||
            code == 1183||
            code == 1186||
            code == 1189||
            code == 1192||
            code == 1195||
            code == 1204||
            code == 1207||
            code == 1240||
            code == 1243||
            code == 1246||
            code == 1249||
            code == 1252
        ){
            app.style.backgroundImage= 'url(images/'+timeofday+'/rainy.jpg)';
            button.style.background= "#647d75";
            if(timeofday == "night"){
                button.style.background= "#325c80";
            }
        }
        else{
            app.style.backgroundImage= 'url(images/'+timeofday+'/snowy.jpg)';
            button.style.background= "#4d72aa";
            if(timeofday == "night"){
                button.style.background= "#1b1b1b";
            }
        }

        
    })
    .catch(()=>{
        alert("City not found");
    });
}

fetchdata();


