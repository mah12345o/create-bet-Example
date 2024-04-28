import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const MatchDate = searchParams.get('MatchDate');
  const Team1 = searchParams.get('Team1');
  const Team2 = searchParams.get('Team2');
  const matchid = searchParams.get('MatchId')
  const [gamedetails, setGamedetails] = useState([]);
  const [totalodds, setTotalodds] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [selection, setSelections] = useState([]);
  const [selectedMarketId, setSelectedMarketId] = useState('8');
  const [selectedId, setSelectedId] = useState('4');
  const isMounted = useRef(false);
  const isMountedSecond = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      fetch(`https://cms.bettorlogic.com/api/BetBuilder/GetBetBuilderBets?sports=1&matchId=${matchid}&marketId=${selectedMarketId}&legs=${selectedId}&language=en`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          setGamedetails(data.BetBuilderSelections);
          setTotalodds(data.TotalOdds);
        })
        .catch(error => {
          alert('No leg exist:', error);
        });
      isMounted.current = true;
    }
  }, [selectedMarketId, selectedId]);

  useEffect(() => {
    if (!isMountedSecond.current) {
      isMountedSecond.current = true;
      fetch('http://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1')
        .then(response => response.json())
        .then(data => {
          setMarkets(data);
          return fetch('https://cms.bettorlogic.com/api/BetBuilder/GetSelections?sports=1'); 
        })
        .then(response => response.json())
        .then(data => setSelections(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, []);

  const handleMarketChange = (event) => {
    setSelectedMarketId(event.target.value);
    isMounted.current = false;
    isMountedSecond.current = false;
  };

  const handleSelctionChange = (event) => {
    setSelectedId(event.target.value);
    isMounted.current = false;
    isMountedSecond.current = false;
  };


  return (
    <div className='container'>
      <Link to="/">
        <IoArrowBackCircle style={{ color: '#ff0000cc', fontSize: '36px' }} />
      </Link>
      <div>
        <h3 className='py-3 px-5 my-3' style={{ backgroundColor: "#ff0000cc", color: 'white' }}>Make a Bet Builder ?</h3>
      </div>
      <div className='matchdetails d-flex justify-content-between align-items-center ps-3 position-relative' style={{ backgroundColor: '#ff0000cc', color: 'white ' }}>
        <div className='text-center ' style={{ width: "40%", height: '50px' }}>{MatchDate}<br />12:00 am</div>
        <div className='trapezoid '>
          <div className='innerdiv'>
            {Team1} VS {Team2}
          </div>
        </div>
      </div>
      <div className='p-3'>
        <div className='row'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: '800' }}>Selection :
              <select style={{width:'100px'}} value={selectedMarketId} onChange={handleMarketChange}>
                {markets.map(market => (
                  <option key={market.MarketId} value={market.MarketId}>
                    {market.MarketName}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ fontWeight: '800' }}>Legs :
              <select style={{ width: '40px' }} value={selectedId} onChange={handleSelctionChange}>
                {selection.map(selection => (
                  <option key={selection.selectionId} value={selection.selectionValue}>
                    {selection.selectionValue}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='col-12 col-md-12 col-lg-12 py-3' style={{ fontWeight: '800' }}>Bet Builder Odds :
            <span style={{ color: '#ff0000cc' }}>{totalodds}</span>
          </div>
        { gamedetails.length>1 ? <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#ff0000cc', padding: '8px', backgroundColor: ' #f2f2f2' }}>
                <th >Key Stats</th>
                <th >Market</th>
                <th >Outcome</th>
              </tr>
            </thead>
            <tbody>
              { gamedetails.map((getdata) => <tr key={getdata.MarketId}>
                <td style={{ color: "black" }}>
                  {getdata.RTB.split(/\b(\d+)\b/g).map((part, index) => {
                    const isNumber = /^\d+$/.test(part);
                    return isNumber ? (
                      <span key={index} style={{ color: "red", fontWeight: "700" }}>{part}</span>
                    ) : (
                      <span key={index}>{part}</span>
                    );
                  })}
                </td>
                <td >{getdata.Market}</td>
                <td >{getdata.Selection}</td>
              </tr>)}
            </tbody>
          </table>:<div style={{textAlign:'center'}}>No data found</div>}
        </div>
      </div>
    </div>
  )
}

export default DetailsPage;
