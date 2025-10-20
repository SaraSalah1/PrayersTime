import React, { useEffect, useState } from 'react'
import Prayers from './components/prayers';

const App = () => {
  
  const [prayerTimes , setPrayerTimes] =useState({})
  const [dateTimes , setDateTimes] =useState("{}")
  const [city , setCity] =useState("cairo")

  const cities = [
    { name: "New Valley", value: "New Valley" },
    { name: "Matruh", value: "Matruh" },
    { name: "Red Sea", value: "Red Sea" },
    { name: "Giza", value: "Giza" },
    { name: "South Sinai", value: "South Sinai" },
    { name: "North Sinai", value: "North Sinai" },
    { name: "Suez", value: "Suez" },
    { name: "Beheira", value: "Beheira" },
    { name: "Helwan", value: "Helwan" },
    { name: "Sharqia", value: "Sharqia" },
    { name: "Dakahlia", value: "Dakahlia" },
    { name: "Kafr el-Sheikh", value: "Kafr el-Sheikh" },
    { name: "Alexandria", value: "Alexandria" },
    { name: "Monufia", value: "Monufia" },
    { name: "Minya", value: "Minya" },
    { name: "Gharbia", value: "Gharbia" },
    { name: "Faiyum", value: "Faiyum" },
    { name: "Qena", value: "Qena" },
    { name: "Beni Suef", value: "Beni Suef" },
    { name: "Qena", value: "Qena" },
    { name: "Asyut", value: "Asyut" },
    { name: "Sohag", value: "Sohag" },
    { name: "Ismailia", value: "Ismailia" },
    { name: "Beni Suef", value: "Beni Suef" },
    { name: "Qalyubia", value: "Qalyubia" },
    { name: "Aswan", value: "Aswan" },
    { name: "Damietta", value: "Damietta" },
    { name: "Cairo", value: "Cairo" },
    { name: "Port Said", value: "Port Said" },
    { name: "Luxor", value: "Luxor" },
    { name: "6th of October", value: "6th of October" },
  ];

  useEffect (() => {
    const fetchPrayerTimes = async () => {
      try {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=${city}&country=Egypt`
        );

       
        const data_prayer = await response.json()

        setPrayerTimes(data_prayer.data.timings)
        setDateTimes(data_prayer.data.date.gregorian.date);

      } catch (error){}

    }
    fetchPrayerTimes()
  },[city])

  const formatTimes = (time) =>{

    if (!time){
      return '00:00';
    }


    let [hours , minutes] = time.split(":").map(Number)
    const perd = hours >= 12 ? 'PM' : 'AM';
    hours  = hours % 12 || 12 ;

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${perd}`
  }

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>City</h3>

            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city_obj) => (
                <option key={city_obj.value}>{city_obj.name}</option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>Date</h3>
            <h4>{dateTimes}</h4>
          </div>
        </div>

        <Prayers name="الفجر" time={formatTimes(prayerTimes.Fajr)} />
        <Prayers name="الظهر" time={formatTimes (prayerTimes.Dhuhr)} />
        <Prayers name="العصر" time={formatTimes (prayerTimes.Asr)} />
        <Prayers name="المغرب" time={formatTimes (prayerTimes.Maghrib)} />
        <Prayers name="العشاء" time={formatTimes (prayerTimes.Isha)} />
      </div>
    </section>
  );
}

export default App