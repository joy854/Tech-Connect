import React from 'react';
import { FaCheck } from 'react-icons/fa';
export default function Service() {
  return (
    <div>
      <section id='explore-head-section'>
        <div class=''>
          {/* <div class='row'> */}
          <div class='col text-center py-5'>
            <h1 class='display-4'>Explore</h1>
            <p class='lead'>
              Have a doubt in a complex algorithmic problem? Looking for a job?
              Don't worry! We have got it all covered.
            </p>
            <a href='#' class='btn btn-outline-secondary'>
              Find Out More
            </a>
          </div>
          {/* </div> */}
        </div>
      </section>

      <section id='explore-section' class='bg-light text-muted py-5'>
        <div class='container'>
          <div class='row'>
            <div class='col-md-6'>
              <img
                src='img/explore-section1.jpg'
                alt=''
                class='img-fluid mb-3 rounded-circle'
              />
            </div>
            <div class='col-md-6'>
              <h3>Explore & Connect</h3>
              <p>Connect with tech enthusiasts all across the globe!</p>
              <div class='d-flex'>
                <div class='p-4 align-self-start'>
                  <i class='fas fa-check fa-2x'>
                    <FaCheck
                      style={{
                        fontSize: '50px',
                        backgroundColor: 'black',
                        color: 'white',
                      }}
                    />
                  </i>
                </div>
                <div class='p-4 align-self-end'>
                  Follow & message your friends along with other like minded
                  techies out there.
                </div>
              </div>

              <div class='d-flex'>
                <div class='p-4 align-self-start'>
                  <FaCheck
                    style={{
                      fontSize: '50px',
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                  />
                </div>
                <div class='p-4 align-self-end'>
                  Create posts and share tech updates with your followers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
