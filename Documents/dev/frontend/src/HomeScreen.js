import React from 'react';
import Button from './Button';
import Card from './Card';
import Jumbotron from './Jumbotron';


const cards = [
  {
    imgSrc: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500",
    imgAlt: "iPhone",
    title: "iPhone 11",
    text: "the best price for iPhone 11",
    buttonLabel: "read more",
    link: "#"
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1581993192008-63e896f4f744?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500",
    imgAlt: "Samsung Galaxy Z Flip",
    title: "Samsung Galaxy Z Flip",
    text: "this phone is not broken it looks by design",
    buttonLabel: "read more",
    link: "#"
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1544228865-7d73678c0f28?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGlwaG9uZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500",
    imgAlt: "iPhone",
    title: "Phone 11",
    text: "the best price for iPhone 11",
    buttonLabel: "read more",
    link: "#"
  },
]

// useEffect
  // fetch
    // setState
      // set cards to json

function HomeScreen() {
  return (
    <div className="App">

      <Jumbotron 
        title="Welcome to the App"
        lead="This is our new app!"
        description="In this app you are able to do this and that"
        buttonLabel="Learn More"
      />

      <div className="container pb-5 d-flex justify-content-between">
        {
            cards.map(
                (cardObj) => {
                    return (
                      <Card 
                          imgSrc={cardObj.imgSrc}
                          imgAlt={cardObj.imgAlt}
                          title={cardObj.title}
                          text={cardObj.text}
                          buttonLabel={cardObj.buttonLabel}
                          link={cardObj.link}
                      />
                    )
                }
            )
        }
      </div>
    </div>
  );
}

export default HomeScreen;