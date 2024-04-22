import React, { useState, useEffect ,useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosFootball } from "react-icons/io";

const Page1 = () => {
  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);
  const [filterDates, setFilterDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const isMounted = useRef(false); 
  useEffect(() => {  

    if (!isMounted.current) { 
      isMounted.current = true;
      console.log('Fetching data...1');
      const currentDate = new Date();
      const nextDates = [];
      const fullDates = [];
      for (let i = 0; i < 8; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() + i);
        fullDates.push(date.toString());
        nextDates.push(date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }));
      }
      setDates(nextDates);
      setFilterDates(fullDates);
  
      fetch('https://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1')
        .then(res => res.json())
        .then(data => {
          const todayMatches = data.filter(match => {
            const matchDate = new Date(match.MatchDate);
            return matchDate.toDateString() === currentDate.toDateString();
          });
          setData(todayMatches);
        });
    }

  }, []);

  function handleDateClicked(date) {console.log('Fetching data...2');
    setSelectedDate(date);
    const selectedDateMatches = data.filter(match => {
      const matchDate = new Date(match.MatchDate);
      return matchDate.toDateString() === new Date(date).toDateString();
    });
    setData(selectedDateMatches);
  }
  

  const groupedData = data.reduce((acc, curr) => {
    const country = curr.Country;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(curr);
    return acc;
  }, {});

  return (
    <div className='container'>
      <div>
        <div className='first-section'>
          {dates.map((date, index) => (
         <button key={index} onClick={() => handleDateClicked(filterDates[index])} className={`btn mx-2 ${selectedDate === filterDates[index] ? 'btn-primary' : 'btn-secondary'}`} dangerouslySetInnerHTML={{ __html: date.replace(/,/g, ",<br>") }}></button>

          ))}
        </div>

        <div className='games'>
          <div className='heading py-2'>
            <div><IoIosFootball className='me-2' style={{ fontSize: '23px', color: 'blue' }} /></div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Football</h3>
          </div>
          <div style={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#8080801f', border: "2px solid lightgray" }}>
            <div>
              {Object.keys(groupedData).map(country => (
                <div key={country}>
                  <div className='text-center gametitle'>{country}</div>
                  {groupedData[country].map(game => (
                    <Link
                      key={game.id}
                      to={`/details?MatchId=${encodeURIComponent(game.MatchId)}&Team1=${encodeURIComponent(game.Team1Name)}&Team2=${encodeURIComponent(game.Team2Name)}`}
                    >
                      <div className='row p-2 mx-4 text-center align-items-center' style={{ color: 'black', borderBottom: '2px solid #8080805e' }}>
                        <div className='col-5 col-md-5 col-lg-5 p-0'>{game.Team1Name}</div>
                        <div className='col-2 col-md-2 col-lg-2 p-0' style={{ color: 'gray' }}>{game.MatchDate}</div>
                        <div className='col-5 col-md-5 col-lg-5 p-0'>{game.Team2Name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
