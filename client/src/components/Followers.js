import React from 'react';



const Followers = ({followers}) => {


  return (
    <>
      <div className='followers' style={{height: '400px', overflowY: 'scroll'}}>
        {followers.map((follower, index) => {
          const { avatar_url: img, html_url, login } = follower;
          return (
            <article key={index}>
              <img src={img} alt={login} style={{width: 100}}/>
              <div>
                <h4>{login}</h4>
                <a href={html_url}>{html_url}</a>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};


export default Followers;
