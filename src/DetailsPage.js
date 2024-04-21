import React from 'react'
import { Link } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const MatchDate = searchParams.get('MatchDate');
  const Team1 = searchParams.get('Team1');
  const Team2 = searchParams.get('Team2');
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
              <select>
                <option>Half time result -Draw</option>
                <option>Half time result</option>
              </select>
            </div>
            <div style={{ fontWeight: '800' }}>Legs :
              <select style={{ width: '40px' }}>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <div className='col-12 col-md-12 col-lg-12 py-3' style={{ fontWeight: '800' }}>Bet Builder Odds :
            <span style={{ color: '#ff0000cc' }}>236</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#ff0000cc', padding: '8px', backgroundColor: ' #f2f2f2' }}>
                <th >Key Stats</th>
                <th >Market</th>
                <th >Outcome</th>
              </tr>
            </thead>

            <tbody>
              <tr >
                <td >Brentfort have drawn the first half in 5 of their last 6 home games</td>
                <td >Half Time Result</td>
                <td >Draw</td>
              </tr>
              <tr >
                <td >There have been at least 5 cards in all of the last 5 Newcastle games.</td>
                <td >Half Time Result</td>
                <td >Draw</td>
              </tr>
              <tr >
                <td >Ivan Toney has scored in his last 3 appearances.</td>
                <td >Half Time Result</td>
                <td >Draw</td>
              </tr>
              <tr style={{ padding: '8px' }}>
                <td >Brentford have lost 7 of their last 8 games.</td>
                <td >Half Time Result</td>
                <td >Draw</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default DetailsPage