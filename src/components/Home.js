// import react
import { Fragment, useContext } from 'react';

// import style css
import styles from './Home.module.css';

// import pet context and item
import { PetContext } from './../context/PetContext';
import PetItem from './Pets/PetItem';

const Home = () => {

    const ctx = useContext(PetContext);

    // retrieve the pets data from the PetContext and assign it to the pets variable
    const pets = ctx.pets;

    // create a new array reference newRef to avoid modifying the original pets array
    const newRef = [...pets];

    // sort the newRef array randomly using the sort method and slice the first four elements
    const random = getRandomSlice(newRef, 4);

    function getRandomSlice(array, size) {
      const shuffled = shuffleArray(array);
      return shuffled.slice(0, size);
    }
    
    function shuffleArray(array) {
      const copiedArray = [...array];
      for (let i = copiedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
      }
      return copiedArray;
    }


    return (

        <Fragment>
            <div className="container">

                <h1 className="heading-primary">About us</h1>
                
                <p className="heading-tertiary contrast-color"> PetMedia is the perfect place to connect, share, and celebrate every beloved pets.</p>
                
                <div className="grid no-gap grid--2-cols">

                    <div className={styles['left-col']}>

                        <h2 className="heading-tertiary">Pet media</h2>
                        
                        <h5 className="subheading italic-font">
                            A social media for pets!
                        </h5>

                        <p className={styles['article-paragraph']}>
                        Welcome to PetMedia - the social media platform exclusively for pets! 
                        Here, you can create a profile for your furry friend, share their pictures, 
                        videos, and stories, and connect with other pet owners. PetMedia is a fun
                        and safe place for pets and their owners to socialize and interact with 
                        other like-minded individuals.
                        </p>


                        <p className={styles['article-paragraph']}>
                        <br></br>
                            With PetMedia, you can create a personalized profile for your pet, 
                            complete with their name, breed, and other details. You can 
                            upload pictures of your pet and share them with your 
                            friends and followers. You can also browse through other pet profiles, 
                            like and comment on their posts, and follow them for more updates.
                        </p>

                        <p className={styles['article-paragraph']}>
                        <br></br>                            
                            The Pets Park on PetMedia is not only a place to showcase your pet's star power, but it's 
                            also a platform to celebrate the incredible bond between humans and animals.

                        </p>
                    </div>

                    <div className="left">
                        <img src="../assets/img/dog.png" alt="" />
                    </div>
                </div>
            </div>


            <div className={styles['adopt-flex']}>

                <div className="container">

                    <h2 className="heading-tertiary">Cuttest pets here!</h2>
                    <p className="heading-tertiary">
                        PetMedia is the ultimate social media platform designed exclusively for pet lovers around the world. 
                    </p>

                    <p className="heading-tertiary">           
                        At PetMedia, we understand the deep bond between humans and animals. Our platform provides a vibrant online community 
                        where pet owners can come together to showcase their furry friends, exchange stories, and connect with like-minded 
                        individuals who share their passion for pets.
                    </p>

                    <p className="heading-tertiary">           
                        Come register right now and become part of the petmedia society in NYC!
                    </p>
                </div>

            </div>


            <div className="container">
    
                <h2 className={styles['breeds-wrapper-title']}>Pets Park</h2>

                <p className="heading-tertiary contrast-color">           
                    Pets Park is a delightful feature within our pet-centric social media platform, PetMedia, where 
                    pet owners and animal enthusiasts come together to share and celebrate the adorable pets in their 
                    lives.
                </p>

                <div className="grid--2-cols card-grid-wrapper">
                    {random.length > 0
                        ? random.map(pet => <PetItem key={pet.id} pet={pet} index={random.indexOf(pet)} />)
                        : <h2>No pets listed</h2>
                    }
                </div>
            </div>

            <p className="heading-tertiary contrast-color">           
                Didn't see your pet above? Join PetMedia today and become part of a vibrant and supportive community that celebrates the love and 
                companionship that pets bring to our lives.
            </p>
        </Fragment>
    )
}

export default Home;
