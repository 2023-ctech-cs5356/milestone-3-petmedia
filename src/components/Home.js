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
    const random = newRef.sort(() => Math.random() - 0.5).slice(0, 4)

    return (

        <Fragment>
            <div className="container">
                <h3 className="heading-primary center-align">About us</h3>
                <div className="about-us grid no-gap grid--2-cols">
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

                        <span className="article-span">
                        With PetMedia, you can create a personalized profile for your pet, 
                        complete with their name, breed, and other details. You can 
                        upload pictures and videos of your pet and share them with your 
                        friends and followers. You can also browse through other pet profiles, 
                        like and comment on their posts, and follow them for more updates.
                        </span>
                            
                        </p>
                    </div>

                    <div className={styles['right-col']} />
                </div>
            </div>


            <div className={styles['adopt-flex']}>

                <div className="left">
                    <img src="../assets/img/p1.png" alt="" />
                </div>

                <div className="container">

                    <h3 className="heading-tertiary">Cuttest pets here!</h3>
                    <p className="heading-tertiary contrast-color">
                        Share life.
                    </p>

                    <p className="heading-tertiary contrast-color">           
                        Share love.
                    </p>

                </div>

                <div className={styles['img-holder']}>
                    <img src="../assets/img/puppy.png" className={styles['img-responsive']} alt="doggo-pet" />
                </div>
            </div>


            <div className="container">
    
                <h3 className={styles['breeds-wrapper-title']}>Pets Park</h3>
                
                <div className="grid grid--2-cols card-grid-wrapper">
                    {random.length > 0
                        ? random.map(pet => <PetItem key={pet.id} pet={pet} index={random.indexOf(pet)} />)
                        : <h2>No pets listed</h2>
                    }

                </div>
            </div>
        </Fragment>


    )
}


export default Home;
